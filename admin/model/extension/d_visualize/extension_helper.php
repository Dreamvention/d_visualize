<?php

class ModelExtensionDVisualizeExtensionHelper extends Model
{
    private $codename = 'd_visualize';
    private $route = 'extension/module/d_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
        //default theme overwriting values
        $this->config_theme = $this->config->get('config_theme_visualize');
        $this->config_active_template_theme = $this->config->get('config_theme_' . $this->setting_visualize['active_template']);

        $this->d_visual_designer = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer.json'));
        $this->d_visual_designer_header = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer_header.json'));
        $this->d_visual_designer_footer = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer_footer.json'));
        $this->d_admin_menu = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_admin_menu.json'));

    }
    /*
     * change vdh it mean that all settings are ok and vdh is ready to use
    */
    public function changeVDH($active_template='default'){
        $this->load->model('extension/module/d_visual_designer_header');
        $this->model_extension_module_d_visual_designer_header->installConfig('header_'.$active_template.'_visualize',$active_template);
    }
    public function changeVDF($active_template='default'){
        $this->load->model('extension/module/d_visual_designer_footer');
        $this->model_extension_module_d_visual_designer_footer->installConfig('footer_'.$active_template.'_visualize',$active_template);
    }
    public function installDemoData($active_template='default'){
        $this->config->load('d_visualize/template/'.$active_template);
        $data = $this->config->get('d_visualize_template_'.$active_template.'_demo_data');
        $file = DIR_CONFIG.'d_visualize/template/'.$data['sql'];
        if (!file_exists($file)) {
            return;

        }
        $lines = file($file);
        if ($lines) {
            $sql = '';

            foreach ($lines as $line) {
                if ($line && (substr($line, 0, 2) != '--') && (substr($line, 0, 1) != '#')) {
                    $sql .= $line;

                    if (preg_match('/;\s*$/', $line)) {

                        if (VERSION == '2.0.0.0') {
                            if (preg_match('/' . DB_PREFIX . 'setting/', $sql)) {
                                $sql = str_replace("code", "group", $sql);
                            }
                        }

                        $sql = str_replace("DROP TABLE IF EXISTS `oc_", "DROP TABLE IF EXISTS `" . DB_PREFIX, $sql);
                        $sql = str_replace("CREATE TABLE `oc_", "CREATE TABLE `" . DB_PREFIX, $sql);
                        $sql = str_replace("INSERT INTO `oc_", "INSERT INTO `" . DB_PREFIX, $sql);
                        $sql = str_replace("TRUNCATE TABLE `oc_", "TRUNCATE TABLE `" . DB_PREFIX, $sql);
                        $this->db->query($sql);

                        if (VERSION <= '2.0.3.1') {
                            if (preg_match('/' . DB_PREFIX . 'module/', $sql)) {
                                $module_id = $this->db->getLastId();
                                $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "module` WHERE `module_id`= " . $module_id);
                                if ($query->row) {
                                    $value = serialize(json_decode($query->row['setting'], true));
                                    $this->db->query("UPDATE " . DB_PREFIX . "module
                                        SET setting = '" . $this->db->escape($value)
                                        . "' WHERE module_id = '" . (int)$module_id . "'");
                                }
                            }
                            if (preg_match('/' . DB_PREFIX . 'setting/', $sql)) {

                                $setting_id = $this->db->getLastId();
                                $query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "setting` WHERE `setting_id`= " . $setting_id . " AND `serialized` = 1");
                                if ($query->row) {
                                    $value = serialize(json_decode($query->row['value'], true));
                                    $this->db->query("UPDATE " . DB_PREFIX . "setting
                                        SET value = '" . $this->db->escape($value)
                                        . "' WHERE setting_id = '" . (int)$setting_id . "'");
                                }

                            }
                        }

                        $sql = '';
                    }
                }
            }
            /*
            $this->load->model('localisation/language');
            $languages = $this->model_localisation_language->getLanguages();
            foreach ($languages as $language) {
                if ($language['language_id'] != 1) {
                    $sql = "INSERT INTO " . DB_PREFIX . "bm_post_description
                        (`post_id`, `language_id`, `title`, `short_description`, `description`, `meta_title`, `meta_description`, `meta_keyword`, `tag`)
                        SELECT `post_id`, '" . $language['language_id'] . "', `title`, `short_description`, `description`, `meta_title`, `meta_description`, `meta_keyword`, `tag`
                        FROM " . DB_PREFIX . "bm_post_description";
                    $this->db->query($sql);

                    $sql = "INSERT INTO " . DB_PREFIX . "bm_category_description
                        (`category_id`, `language_id`, `title`, `short_description`, `description`, `meta_title`, `meta_keyword`, `meta_description`)
                        SELECT `category_id`, '" . $language['language_id'] . "', `title`, `short_description`, `description`, `meta_title`, `meta_keyword`, `meta_description`
                        FROM " . DB_PREFIX . "bm_category_description";
                    $this->db->query($sql);
                }
            }
            */
        } else {
            return false;
        }


    }

    /*
     * just set up vd config of vdh and vdf to be on in VD
     * then setup vdh and vdf
    */
    public function installVD($active_template)
    {
        if ($this->d_visual_designer) {
            $this->load->model('extension/module/d_visual_designer_header');
            if (!$this->model_extension_module_d_visual_designer_header->checkConfig()){
                $this->model_extension_module_d_visual_designer_header->installConfig('header_default_visualize','default');
            }
            $this->load->model('extension/module/d_visual_designer_footer');
            if (!$this->model_extension_module_d_visual_designer_footer->checkConfig()){
                $this->model_extension_module_d_visual_designer_footer->installConfig('footer_default_visualize','default');
            }
            $this->load->model('extension/d_visual_designer/designer');
            $this->model_extension_d_visual_designer_designer->disableBootstrap();
            $this->load->model('extension/module/d_visual_designer');
            $this->model_extension_module_d_visual_designer->compressRiotTag();

        }
    }

    public function installDependencyModules($active_template)
    {
        //no need to validate if it's loaded in DB
//        if (!in_array($active_template, $this->setting_visualize['available_templates']))
//            $installed_template_extensions = $this->{'model_extension_' . $this->codename . '_theme'}->getTemplateExtensions($active_template);
//        if (!empty($installed_template_extensions)) {
//            foreach ($installed_template_extensions as $template_extensions) {
//                $this->load->model($template_extensions['index']);
//                $this->load->controller($template_extensions['index'] . '/setup');
//                if (!$this->{}->checkConfig($template_extensions['codename'])) {
//                    $this->{$template_extensions['index']}->installConfig($template_extensions['codename']);
//                };
//            }
//        }
    }

    public function installConfigThemeDefaults($config_theme = 'config_theme')
    {
        $this->load->model('setting/setting');

        if (VERSION > '3.0.0.0') {
            foreach ($this->{$config_theme}['size'] as $key => $size) {
                $this->model_setting_setting->editSettingValue(
                    'theme_default', 'theme_default_' . $key . '_width', $size['width'], $this->store_id);
                $this->model_setting_setting->editSettingValue(
                    'theme_default', 'theme_default_' . $key . '_height', $size['height'], $this->store_id);
            }
        }
    }

    public function installTemplateThemeDefaults()
    {
//        $this->installConfigThemeDefaults('config_active_template_theme');
    }

    public function addLinksToMenu()
    {
        if ($this->d_admin_menu) {
            $this->load->model('extension/d_opencart_patch/url');
            $this->load->model('extension/module/d_admin_menu');
            $this->model_extension_module_d_admin_menu->installCompatibility();
            if (!$this->model_extension_module_d_admin_menu->checkMenuItem($this->codename)){
                $this->load->language($this->route);
                $sub_items = array();
                $sub_items [] = array(
                    "name" => $this->language->get('entry_setting'),
                    "link" => 'extension/module/d_visualize',
                );
                $sub_items [] = array(
                    "name" => $this->language->get('entry_visual_header'),
                    "link" => 'extension/module/d_visual_designer_header',
                );
                $sub_items [] = array(
                    "name" => $this->language->get('entry_visual_footer'),
                    "link" => 'extension/module/d_visual_designer_footer',
                );
                $admin_menu_item = array(
//                'icon'=>'fa-magic',
                    'icon'     => 'fa-paint-brush',
                    'name'     => $this->language->get('heading_title_main_menu'),
                    'children' => $sub_items,
                );
                $this->model_extension_module_d_admin_menu->addMenuItem($this->codename, $admin_menu_item);
            }
        }
    }
    public function removeLinksFromMenu()
    {
        if ($this->d_admin_menu) {
            $this->load->model('extension/module/d_admin_menu');
            $this->model_extension_module_d_admin_menu->installCompatibility();
            $this->model_extension_module_d_admin_menu->deleteMenuItem($this->codename);
        }
    }
}