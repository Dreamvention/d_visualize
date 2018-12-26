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
            $this->load->language($this->route);
            $sub_items=array();
            $sub_items [] = array(
                "name"         => $this->language->get('entry_setting'),
                "custom_route" => false ,
                'icon'     => 'fa-paint-brush',
                "href"         => 'index.php?route=extension/module/d_visualize&',
                "href_type"=> 'route',
                "children"     => array(),
                "sort_order"   => 1
            );
            $sub_items [] = array(
                "name"         => $this->language->get('entry_visual_header'),
                "custom_route" => false,
                'icon'     => 'fa-paint-brush',
                "href"         => 'index.php?route=extension/module/d_visual_designer_header&',
                "children"     => array(),
                "sort_order"   => 2
            );
            $sub_items [] = array(
                "name"         => $this->language->get('entry_visual_footer'),
                "custom_route" => false,
                'icon'     => 'fa-paint-brush',
                "href"         => 'index.php?route=extension/module/d_visual_designer_footer&',
                "children"     => array(),
                "sort_order"   => 3
            );
            $admin_menu_item = array(
//                'icon'=>'fa-magic',
                'icon'     => 'fa-paint-brush',
                'name'     => $this->language->get('heading_title_main_menu'),
                'link'     => 'index.php?route=extension/module/d_visualize&',
                'children' => $sub_items,
            );
            $this->model_extension_module_d_admin_menu->addMenuItem($this->codename, $admin_menu_item);
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