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
                        'index' => $module_json['index'],
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
                'template' => $this->codename . '/template/component/' . $dir . '/' . basename($file, '.twig') . '.twig',
                'preview' => 'img',
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
            $source = 'config';
            $setting = $this->loadTemplateSetting($config, $codename);
            $db_saved_template_setting = $this->getTemplateByCodename($setting['codename']);
            $response=array();
            if (!empty($db_saved_template_setting)) {
                $setting = (array)json_decode($db_saved_template_setting['setting'], true);
                $response['db_saved'] = true;
                $source = $db_saved_template_setting['source'];
                $response['description'] = $db_saved_template_setting['description'];
                $response['title'] = $db_saved_template_setting['title'];
                $response['date_modified'] = $db_saved_template_setting['date_modified'];
            }
            $response['source'] = $source;
            $response['setting'] = $setting;
            foreach ($this->getAvailableSkines($setting['codename']) as $skin) {
                $response['skines'][$skin] = $this->getSCSSVariables( $setting['codename'], $skin);
//                $response['skines'][$skin]['typography'] = $this->getSCSSVariables('_font.scss', $setting['codename'], $skin);
//                $response['skines'][$skin]['buttons'] = $this->getSCSSVariables('_buttons.scss', $setting['codename'], $skin);
//                $response['skines'][$skin]['grid'] = $this->getSCSSVariables('_grid.scss', $setting['codename'], $skin);
            }
            $response['img_desktop'] = $this->imgeResize((is_file(DIR_IMAGE . 'catalog/' . $this->codename . '/template/' . $codename . '_desktop.png') ? 'catalog/' . $this->codename . '/template/' . $codename . '_desktop.png' : "no_image.png"), 600, 300);
            $response['img_mobile'] = $this->imgeResize((is_file(DIR_IMAGE . 'catalog/' . $this->codename . '/template/' . $codename . '_mobile.png') ? 'catalog/' . $this->codename . '/template/' . $codename . '_mobile.png' : "no_image.png"), 600, 300);

            $result[$codename] = $response;
        }
        return $result;
    }


    private function getSCSSVariables($template_id, $skin)
    {
        $this->load->config('d_visualize/' . $template_id . '/' . $skin);
        return $this->config->get('d_visualize_template_' . $template_id . '_' . $skin . '_css');
//        $colors = DIR_CATALOG . 'view/theme/' . $this->codename . '/stylesheet/template/' . $template_id . '/skin/' . $skin . '/base/variables/' . $file_name;
//        if (@is_file($colors)) {
//            $re = '/\$([^:$})\s]+):[\s]+([^\s]+)[\s]+!default;/';
//            preg_match_all($re, @file_get_contents($colors), $matches, PREG_SET_ORDER, 0);
//            $variables_color = array();
//            foreach ($matches as $match) {
//                /*VAR name*/                 /*VAR value*/
//                $variables_color[$match[1]] = $match[2];
//            }
//            return $variables_color;
//        }
    }

    public function getAvailableSkines($active_template_codename)
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
        $this->components = $this->getAvailableComponents();
        // check on skin overloading the components
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
        return $active_template;
    }

    /*
     * this method set template and css which needed to component
     * if no files finded in this available components
     * then empty.twig replace it
     *
     * note Available components contain
     * all files available in view/theme/d_visualize/template/components
     * sorted by them codename
     * */
    public function assingChanges($key, $component, $active_template_codename, $active_skin)
    {
        $result = array();
        $skin = 'default';
        if (isset($this->components[$key][$active_template_codename])) {
            $skin = $active_template_codename;
        }
        if (isset($this->components[$key][$active_skin])) {
            $skin = $active_skin;

        }
        if (isset($component['skin']) && isset($this->components[$key][$component['skin']])) {
            $skin = $component['skin'];
        }
        if (!isset($component['skin'])) {
            $component['skin'] = $skin; //set default values template
        }
//        if (isset($component['template'])) {
//            $component['template'] = $component['template'] . $skin . '.twig'; //set default values template
//        }
//        if (isset($component['stylesheet'])) {
//            $component['stylesheet'] = $component['stylesheet'] . $skin . '.css';
//        }
        return $component;
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

    public function installTheme($active_template)
    {
        $this->load->model('extension/module/d_visualize');
        $this->load->model('extension/d_visualize/extension_helper');
        $this->model = 'model_extension_module_' . $this->codename;
        $this->model_helper = 'model_extension_' . $this->codename . '_extension_helper';
        $this->load->model('extension/d_opencart_patch/setting');
        $setting = $this->model_extension_d_opencart_patch_setting->getSetting('theme_default');
        $setting['theme_default_directory'] = $this->codename; // 302 work
        $this->model_extension_d_opencart_patch_setting->editSetting('theme_default', $setting);
        $this->{$this->model}->uninstallEvents($active_template);
        $this->{$this->model}->installEvents($active_template);
        $this->{$this->model_helper}->installVD($active_template);
        $this->{$this->model_helper}->installDependencyModules($active_template);
        $this->{$this->model_helper}->installConfigThemeDefaults();
        $this->{$this->model_helper}->installTemplateThemeDefaults($active_template);
    }

    public function uninstallTheme()
    {
        $this->model = 'model_extension_module_' . $this->codename;
        $setting = $this->model_extension_d_opencart_patch_setting->getSetting('theme_default');
        $setting['theme_default_directory'] = 'default';
        $this->model_extension_d_opencart_patch_setting->editSetting('theme_default', $setting);
        $this->{$this->model}->uninstallEvents();
    }
    public function imgeResize($filename, $width, $height, $original_size = false)
    {

        if ($this->request->server['HTTPS']) {
            return HTTPS_CATALOG . 'image/' . $filename;
        } else {
            return HTTP_CATALOG . 'image/' . $filename;
        }
    }
}
