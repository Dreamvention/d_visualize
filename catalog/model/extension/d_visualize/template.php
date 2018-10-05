<?php

class ModelExtensionDVisualizeTemplate extends Model
{
    private $codename = 'd_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
    }

    public function getAvailableComponents()
    {
        $componenDir = DIR_TEMPLATE . $this->codename . '/template/component';
        $scanned_directory = array_diff(scandir($componenDir), array('..', '.'));
        $result = array();
        foreach ($scanned_directory as $dir) {
            $files = glob($componenDir . '/' . $dir . '/*.twig', GLOB_BRACE);
            foreach ($files as $key => $file) {
                $result[$dir][basename($file, '.twig')] = array(
                    'template' => $this->codename . '/template/component/' . $dir . '/' . basename($file, '.twig') . '.twig',
                );
            }
        }
        return $result;
    }

    public function getAvailableTemplates()
    {
        $files = glob(DIR_CONFIG . $this->codename . '/template/*.php', GLOB_BRACE);
        $result = array();
        $this->load->model('tool/image');
        foreach ($files as $key => $file) {
            $codename = basename($file, '.php');
            $this->config->load($this->codename . '/template/' . $codename);
            $config = $this->config->get($this->codename . '_template_' . $codename . '_setting');
            $result[$codename] = array(
                'source'  => 'config',
                'setting' => $config,
            );
        }

        return $result;
    }

    public function loadTemplateSetting($active_template_codename = 'default')
    {
        $active_template = $this->getAvailableTemplates()[$active_template_codename]['setting'];
        //check on skin overloading the components
        // add some magic here
        foreach (array_keys($active_template['page']) as $path) {
            if (isset($active_template['page'][$path]['layout']['component'])) {
                foreach ($active_template['page'][$path]['layout']['component'] as $component_key => $component) {
                    $active_template['page'][$path]['layout']['component'][$component_key] = $this->assingChanges(
                        $component_key,
                        $component,
                        $active_template['codename'],
                        $active_template['active_skin']);

                }
            }
        }
        //if there will be changes from DB it will replace
        $db_saved_template_setting = $this->getTemplateByCodename($active_template_codename);
        return $db_saved_template_setting ? (array)json_decode($db_saved_template_setting['setting'], true) : $active_template;
    }

    public function assingChanges($key, $component, $active_template_codename, $active_skin)
    {
        $result = array();
        $skin = $active_template_codename;
        if ($this->availableTemplate($key, $active_skin)) { // cecheck if possible change view
            $skin = $active_skin;
        }
        if (isset($component['skin']) && $this->availableTemplate($key, $component['skin'])) { // cecheck if possible change view
            $skin = $component['skin'];
        }
        if (isset($component['setting']) && isset($component['setting']['display'])) {
            $skin = 'empty';
        }
        if (isset($component['template'])) {
            $component['template'] = $component['template'] . $skin . '.twig'; //set default values template
        }
        if (isset($component['stylesheet'])) {
            $component['stylesheet'] = $component['stylesheet'] . $skin . '.css';
        }
        return $component;
    }

    public function getTemplates($data_filter = array())
    {
        $sql = 'SELECT * from ' . DB_PREFIX . 'vz_templates';
        return $this->db->query($sql)->rows;
    }

    public function getTemplateByCodename($template_codename)
    {
        $sql = 'SELECT * from ' . DB_PREFIX . "vz_templates where codename='" . $template_codename . "'";
        return $this->db->query($sql)->row;
    }

    public function availableTemplate($key, $skin)
    {
        return isset($this->getAvailableComponents()[$key][$skin]);
    }

    public function validate_templates($data)
    {
//        foreach ($data['partial'] as $partial_k => $partial_v) {
//            if (!is_file(DIR_TEMPLATE . $partial_v['template'])) {
//                $data['partial'][$partial_k]['template'] = 'd_visualize/template/partial/d_empty.twig';
//            } else {
//                foreach ($data['partial'][$partial_k]['component'] as $component_k => $component_v) {
//                    if (!is_file(DIR_TEMPLATE . $component_v['template'])) {
//                        $data['partial'][$partial_k]['component'][$component_k]['template'] = 'd_visualize/template/partial/d_empty.twig';
//                    }
//                }
//            }
//        }
        foreach ($data['component'] as $partial_k => $partial_v) {
            if (!is_file(DIR_TEMPLATE . $partial_v['template'])) {
                $data['component'][$partial_k]['template'] = 'd_visualize/template/partial/d_empty.twig';
            }
        }
        return $data;
    }

    /**
     * @param $page_array
     * @param string $search
     * @param array $result
     * @return array
     */
    public function getAllUsages($page_array, $search = 'component', $result = array())
    {
        foreach ($page_array as $page_key => $page_value) {
            if ($page_key === $search) {
                $result[] = $page_value;
            }
            if (is_array($page_value)) {
                $result = $this->getAllUsages($page_value, $search, $result);
            }
        }
        return $result;
    }

}