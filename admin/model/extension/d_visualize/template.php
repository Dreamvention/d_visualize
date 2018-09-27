<?php

class ModelExtensionDVisualizeTemplate extends Model
{
    private $codename = 'd_visualize';

    public function getRoute($name = 'd_visualize')
    {
        $results = array();
        if ($name == $this->codename)
            $file = DIR_CONFIG . $name . '.php';
        else
            $file = DIR_CONFIG . $this->codename . '/' . $name . '.php';

        if (file_exists($file)) {
            $_ = array();
            require($file);
            $results = array_merge($results, $_);
        }
        if (!empty($results) && !isset($results['name'])) {
            $results['name'] = ucfirst(strtolower($name));
        }
        return $results;
    }

    public function getTemplateExtensions($skin_name)
    {
        //todo make this work
        //load json of active skin pack
        $modules_json = array();
        if (is_file(DIR_SYSTEM . 'library/d_shopunity/extension/' . $skin_name . '.json')) {
            $skin = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $skin_name . '.json'), true);
            if ($this->d_shopunity) {
                $this->load->model('extension/d_shopunity/mbooth');
                $this->model_extension_d_shopunity_mbooth->validateDependencies($skin['codename']);
            }
            foreach ($skin['required'] as $key => $version) {
                $module_json = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $key . '.json'), true);
                //install from json only modules not library
                if ($module_json['module'] == 'module' && $module_json['module'] != $this->codename) {
                    $modules_json[] = array(
                        'index'    => $module_json['index'],
                        'codename' => $module_json['codename'],
                    );
                }
            }
        }
        return $modules_json;

    }

    public function searchComponent($dir, $result)
    {
        $componenDir = DIR_CATALOG . 'view/theme/' . $this->codename . '/template/component';
        $files = glob($componenDir . '/' . $dir . '/*.twig', GLOB_BRACE);
        $component = array();
        foreach ($files as $key => $file) {
            $component[basename($file, '.twig')] = array(
                'template'   => $this->codename . '/template/component/' . $dir . '/' . basename($file, '.twig') . '.twig',
                'preview'    => 'img',
                'stylesheet' => $this->codename . '/stylesheet/dist/vz-component/' . $dir . '/' . basename($file, '.twig') . '.css',
            );
        }
        return $component;
    }

    public function getAvailableComponents()
    {
        $componenDir = DIR_CATALOG . 'view/theme/' . $this->codename . '/template/component';
        $scanned_directory = array_diff(scandir($componenDir), array('..', '.'));
        $result = array();
        foreach ($scanned_directory as $dir) {
            $result[$dir] = $this->searchComponent($dir, $result);
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
            $setting = $this->loadTemplateSetting($config, $codename);
            $result[$codename] = array(
                'source'  => 'config',
                'setting' => $setting,
                'skines'  => $this->loadAvailableSkines($setting['codename']),
                'img'     => $this->model_tool_image->resize((is_file(DIR_IMAGE . 'catalog/' . $this->codename . '/template/' . $codename . '.png') ? 'catalog/' . $this->codename . '/template/' . $codename . '.png' : "no_image.png"), 300, 400),

            );
        }
        return $result;
    }

    public function loadAvailableSkines($active_template_codename)
    {
        $result = array();
        $componenDir = DIR_CATALOG . 'view/theme/' . $this->codename . '/stylesheet/template/' . $active_template_codename . '/skin';
        if (is_dir($componenDir)) {
            $scanned_directory = array_diff(scandir($componenDir), array('..', '.'));
            foreach ($scanned_directory as $dir) {
                $result[] = $dir;
            }
        }
        return $result;
    }

    public function loadTemplateSetting($active_template, $active_template_codename = 'default')
    {
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
        $db_saved_template_setting = $this->getTemplateByCodename($active_template_codename);
        return $db_saved_template_setting ? (array)json_decode($db_saved_template_setting['setting'], true) : $active_template;
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

    public function assingChanges($part_of_array, $component, $active_template_codename, $active_skin, $partials = false)
    {
        for ($i = 0; $i < count($component); $i++) {
            $key_of_component = array_keys($component)[$i];
            $component_value = $component[$key_of_component];
            if (isset($component_value['skin']) && $active_skin == $component_value['skin']) {
                //replace current template of component if skin change it
                $templateFile = str_replace($active_template_codename, $component_value['skin'], $component_value['template']);
                if (file_exists(DIR_CATALOG . 'view/theme/' . $templateFile)) {
                    if ($partials) {
                        $part_of_array[$key_of_component]['component'][$key_of_component]['template'] = $templateFile;
                    } else {
                        $part_of_array['component'][$key_of_component]['template'] = $templateFile;
                    }
                }
                if (isset($component_value['stylesheet'])) {
                    $cssFile = str_replace($active_template_codename, $component_value['skin'], $component_value['stylesheet']);
                    if (file_exists(DIR_CATALOG . 'view/theme/' . $cssFile)) {
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

    /**
     * @param $data_array
     * extected next one data attrs
     * template
     * store_id
     *
     */

    public function saveTemplate($data)
    {
        $template = $this->getTemplateByCodename($data['template_codename']);
        if (!$template) {
            FB::log($data['template']);
            $this->db->query("INSERT INTO " . DB_PREFIX . "vz_templates
                SET store_id = '" . (int)$data['store_id'] . "',
                codename = '" . $this->db->escape($data['template_codename']) . "',
                source = '" . $this->db->escape($data['template']['source']) . "',
                description = '" . $this->db->escape($data['template']['setting']['description']) . "',
                setting = '" . $this->db->escape(json_encode($data['template']['setting'], true)) . "',
                history_id = '" . 0 . "',
                date_created = '" . 'NOW()' . "',
				date_modified = '" . 'NOW()' . "'"
            );
        } else {
            $sql = "UPDATE " . DB_PREFIX . "vz_templates
            SET
            store_id = '" . $data['store_id'] . "',
            source = '" . $this->db->escape($data['template']['source']) . "',
            description ='" . $this->db->escape($data['template']['setting']['description']) . "',
            setting ='" . $this->db->escape(json_encode($data['template']['setting'], true)) . "', 
            date_modified = NOW() WHERE codename = '" . $template['codename'] . "'";
            $this->db->query($sql);
//            FB::log($sql);
//            $te = $this->getTemplateByCodename($data['template_codename']);
//            FB::log((array)json_decode($te['setting'],true)['page']['default']['layout']['partial']);
        }
        return $template;
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


}
