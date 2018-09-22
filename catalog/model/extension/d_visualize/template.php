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
        $componenDir = DIR_CATALOG . 'view/theme/' . $this->codename . '/template/component';
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
                'source' => 'config',
                'setting' => $config,
            );
        }

        return $result;
    }

    public function loadTemplateSetting($active_template_codename = 'default')
    {
        $active_template = $this->getAvailableTemplates()[$active_template_codename]['setting'];
        //check if skin overload template
        //check components overloading
        foreach ($this->getAllUsages($active_template['page']['default']['layout']['partial'], 'component') as $component) {
            //check on skin overloading the partials
            $active_template['page']['default']['layout']['partial']
                = $this->assingChanges($active_template['page']['default']['layout']['partial'],
                $component,
                $active_template['codename'],
                $active_template['active_skin'],
                true
            );
        }
        //check on skin overloading the components
        foreach (array_keys($active_template['page']) as $path) {
            if ($path !== 'default') {
                foreach ($this->getAllUsages($active_template['page'][$path]['layout'], 'component') as $component) {
                    $active_template['page'][$path]['layout']
                        = $this->assingChanges($active_template['page'][$path]['layout'],
                        $component,
                        $active_template['codename'],
                        $active_template['active_skin']);
                }
            }
        }
        //if there will be changes from DB it will replace
        $db_saved_template_setting = $this->getTemplates(
            array('template_codename' => $active_template_codename,
                'skin' => $active_template['active_skin']));
        return $db_saved_template_setting ? $db_saved_template_setting : $active_template;
    }

    public function assingChanges($part_of_array, $component, $active_template_codename, $active_skin, $partials = false)
    {
        for ($i = 0; $i < count($component); $i++) {
            $key_of_component = array_keys($component)[$i];
            $component_value = $component[$key_of_component];
            if (isset($component_value['skin']) && $active_skin == $component_value['skin']) {
                //replace current template of component if skin change it
                $templateFile = str_replace($active_template_codename, $component_value['skin'], $component_value['template']);
                if (file_exists(DIR_TEMPLATE . $templateFile)) {
                    if ($partials) {
                        $part_of_array[$key_of_component]['component'][$key_of_component]['template'] = $templateFile;
                    } else {
                        $part_of_array['component'][$key_of_component]['template'] = $templateFile;
                    }
                }
                if (isset($component_value['stylesheet'])) {
                    $cssFile = str_replace($active_template_codename, $component_value['skin'], $component_value['stylesheet']);
                    if (file_exists(DIR_TEMPLATE . $cssFile)) {
                        if ($partials) {
                            $part_of_array[$key_of_component]['component'][$key_of_component]['stylesheet'] = $cssFile;
                        } else {
                            $part_of_array['component'][$key_of_component]['stylesheet'] = $cssFile;
                        }
                    }
                }
            }
        }
        return $part_of_array;
    }

    public function getTemplates($data_filter = array())
    {
        $sql = 'SELECT * from ' . DB_PREFIX . 'vz_templates';
        return $this->db->query($sql)->rows;
    }

    public function validate_templates($data)
    {
        foreach ($data['partial'] as $partial_k => $partial_v) {
            if (!is_file(DIR_TEMPLATE . $partial_v['template'])) {
                $data['partial'][$partial_k]['template'] = 'd_visualize/template/partial/d_empty.twig';
            } else {
                foreach ($data['partial'][$partial_k]['component'] as $component_k => $component_v) {
                    if (!is_file(DIR_TEMPLATE . $component_v['template'])) {
                        $data['partial'][$partial_k]['component'][$component_k]['template'] = 'd_visualize/template/partial/d_empty.twig';
                    }
                }
            }
        }
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