<?php
use Leafo\ScssPhp\Compiler;

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
        //load json of active_tab skin pack
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
                $response['preview']['processed_images'][] = $this->imageResize('catalog/' . $this->codename . '/template/' . $codename . '/preview/skin/' .$skin .'.png');
            }
            $response['preview']['desktop'] = $this->imageResize('catalog/' . $this->codename . '/template/' . $codename . '/preview/desktop.png');
            $response['preview']['mobile'] = $this->imageResize('catalog/' . $this->codename . '/template/' . $codename . '/preview/mobile.png');

            $result[$codename] = $response;
        }
        return $result;
    }
    public function updateStyleCSSPath($data){
        $sql = "UPDATE " . DB_PREFIX . "vz_style
            SET
            css_path = '" . $this->db->escape($data['css_path']) . "',
            date_modified = NOW() WHERE template_codename = '" . $data['template_id'] . "'" . " AND skin='" . $data['skin'] . "'";
        $this->db->query($sql);
    }
    public function saveCustomStyles($data)
    {
        $custom = $this->getCustomStyles($data['template_id'], $data['skin']);
        if (!$custom) {
            $this->db->query("INSERT INTO " . DB_PREFIX . "vz_style
                SET template_codename = '" . $this->db->escape($data['template_id']) . "',
                skin = '" . $this->db->escape($data['skin']) . "',
                custom_style = '" . $this->db->escape($data['custom_style']) . "',
                config = '" . $this->db->escape(json_encode($data['config'], true)) . "',
                date_created = '" . 'NOW()' . "',
				date_modified = '" . 'NOW()' . "'"
            );
        } else {
            $sql = "UPDATE " . DB_PREFIX . "vz_style
            SET
            skin = '" . $this->db->escape($data['skin']) . "',
            custom_style = '" . $this->db->escape($data['custom_style']) . "',
            config ='" . $this->db->escape(json_encode($data['config'], true)) . "',
            date_modified = NOW() WHERE template_codename = '" . $data['template_id'] . "'" . " AND skin='" . $data['skin'] . "'";
            $this->db->query($sql);
        }
        return $this->getCustomStyles($data['template_id'], $data['skin']);
    }
    public function getCustomStyles($template_id, $skin)
    {
        $sql = 'SELECT * from ' . DB_PREFIX . "vz_style where template_codename='" . $this->db->escape($template_id) . "' AND skin='" . $this->db->escape($skin) . "'";
        return $this->db->query($sql)->row;
    }
    public function deleteCustomStyles($template_id, $skin)
    {
        $sql = 'DELETE from ' . DB_PREFIX . "vz_style where template_codename='" . $this->db->escape($template_id) . "' AND skin='" . $this->db->escape($skin) . "'";
        return $this->db->query($sql)->row;
    }
    private function getSCSSVariables($template_id, $skin)
    {
        //check in db config
        $custom = $this->getCustomStyles($template_id, $skin);
        if (!$custom) {
            return json_decode(@file_get_contents(DIR_CATALOG . '/view/theme/'.$this->codename.'/stylesheet/template/'.$template_id.'/skin/'.$skin.'/config.json'), true);
        } else {
            return json_decode($custom['config'], true);
        }
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
        return $component;
    }

    /*
     * data_array
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
                title = '" . $this->db->escape(isset($data['template']['title']) ? $data['template']['title'] : $data['template']['setting']['title']) . "',
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
            title ='" . $this->db->escape(isset($data['template']['title']) ? $data['template']['title'] : $data['template']['setting']['title']) . "',
            setting ='" . $this->db->escape(json_encode($data['template']['setting'], true)) . "', 
            date_modified = NOW() WHERE codename = '" . $template['codename'] . "'";
            $this->db->query($sql);
        }
        return $this->getTemplateByCodename($data['template_codename']);
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
    /*
     * Calls every time when user enable module
     * by default install default theme and set default skin
     * enable theme setting
     * switch theme_directory to the d_visualize
     * install events for active theme
     * */
    public function installTheme($active_template)
    {
        $this->load->model('extension/d_opencart_patch/setting');
        if (VERSION < '2.2.0.0') {
            $setting = $this->model_extension_d_opencart_patch_setting->getSetting('config');
            $setting['config_template'] = $this->codename; // 201 work
            $this->model_extension_d_opencart_patch_setting->editSetting('config', $setting);
        } else {
            $setting = $this->model_extension_d_opencart_patch_setting->getSetting('theme_default');
            $setting['theme_default_directory'] = $this->codename; // 302 work
            $setting['theme_default_status'] = true; // fix issue for some reasons this config set to false
            $this->model_extension_d_opencart_patch_setting->editSetting('theme_default', $setting);
        }
        $this->load->model('extension/module/d_visualize');
        $this->load->model('extension/d_visualize/extension_helper');
        $this->model_extension_module_d_visualize->uninstallEvents($active_template);
        $this->model_extension_module_d_visualize->installEvents($active_template);
        $this->model_extension_d_visualize_extension_helper->installVD($active_template);
        $this->model_extension_d_visualize_extension_helper->installDependencyModules($active_template);
        $this->model_extension_d_visualize_extension_helper->installConfigThemeDefaults();
        $this->model_extension_d_visualize_extension_helper->installTemplateThemeDefaults($active_template);
        //danger zone
        $this->model_extension_d_visualize_extension_helper->addLinksToMenu();
    }
    public function uninstallTheme()
    {
        $this->load->model('extension/d_opencart_patch/setting');
        if (VERSION < '2.2.0.0') {
            $setting = $this->model_extension_d_opencart_patch_setting->getSetting('config');
            $setting['config_template'] = 'default'; // 201 work
            $this->model_extension_d_opencart_patch_setting->editSetting('config', $setting);
        } else {
            $setting = $this->model_extension_d_opencart_patch_setting->getSetting('theme_default');
            $setting['theme_default_directory'] = 'default';
            $this->model_extension_d_opencart_patch_setting->editSetting('theme_default', $setting);
        }
        $this->load->model('extension/module/d_visualize');
        $this->load->model('extension/d_visualize/extension_helper');

        $this->model_extension_d_visualize_extension_helper->removeLinksFromMenu();

        $this->model_extension_module_d_visualize->uninstallEvents();

    }
    public function compileStaticCSS($template_id, $skin_id, $cssConfig)
    {
        $static_css_path='';
        $skin_path = DIR_CATALOG . 'view/theme/' . $this->codename . '/stylesheet/template/' . $template_id . '/skin/' . $skin_id . '/';
        if (@is_file($skin_path . $skin_id . '.scss')) {
            include_once(DIR_SYSTEM . 'library/' . $this->codename . '/scssphp/scss.inc.php');
            $scss = new Compiler();
            $scss->setImportPaths($skin_path);
            $variables = array();
            foreach ($cssConfig as $holder => $holder_vars) {
                if (strripos($holder, 'settings') === 0) {
                    continue;
                }
                if (is_array($holder_vars)) {
                    //not so much var so don't worry it's fast
                    foreach ($holder_vars as $var => $value) {
                        if (is_array($value)) {
                            $value = '("' . implode($value, '","') . '")';
                        }
                        $variables[$holder . '-' . $var] = $value;
                    }
                } else {
                    $variables[$holder] = $holder_vars;
                }
            }
            $scss->setVariables($variables);
            $compiled_css = $scss->compile(str_replace('@import "config";', '', @file_get_contents($skin_path . $skin_id . '.scss')));
            @file_put_contents(DIR_CATALOG . 'view/theme/' . $this->codename . '/stylesheet/dist/' . $template_id . '/' . $skin_id . '_custom.css', $compiled_css);
            $static_css_path =  'catalog/view/theme/' . $this->codename . '/stylesheet/dist/' . $template_id . '/' . $skin_id . '_custom.css';
        } else {
            throw new Exception('Can not find scss for compilation');
        }
        return $static_css_path;
    }
    public function truncStaticCSS($template_id,$skin_id)
    {
        $cutoms_style = $this->getCustomStyles($template_id,$skin_id);
        if (@is_file(DIR_CATALOG. '../' .$cutoms_style['css_path'])) {
            unlink(DIR_CATALOG. '../' .$cutoms_style['css_path']) ;
        }
        $this->deleteCustomStyles($template_id,$skin_id);
    }
    public function imageResize($filename, $width = 300, $height = 300, $original_size = true)
    {
        if ($original_size) {
            $filename = is_file(DIR_IMAGE . $filename) ? $filename : "no_image.png";
            if ($this->request->server['HTTPS']) {
                return HTTPS_CATALOG . 'image/' . $filename;
            } else {
                return HTTP_CATALOG . 'image/' . $filename;
            }
        } else {
            echo "<pre>";
            print_r('sorrhy not implemented');
            echo "</pre>";
        }
    }
}
