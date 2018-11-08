/<?php

class ModelExtensionDVisualizeExtensionHelper extends Model
{
    private $codename = 'd_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
        //default theme overwriting values
        $this->config_theme = $this->config->get('config_theme_visualize');
        $this->config_active_template_theme = $this->config->get('config_theme_' . $this->setting_visualize['active_template']);

        $this->d_visual_designer = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer.json'));
        $this->d_visual_designer_header = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer_header.json'));
        $this->d_visual_designer_footer = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer_footer.json'));

    }

    public function installVD($active_template)
    {
        if ($this->d_visual_designer) {
            $this->load->model('extension/d_visual_designer/designer');
            $this->load->model('extension/module/d_visual_designer_header');
            $this->load->model('extension/module/d_visual_designer_footer');
            $this->load->model('extension/d_opencart_patch/extension');
            if (!$this->model_extension_d_visual_designer_designer->checkConfig('d_visual_designer_header')) {
                $this->model_extension_d_visual_designer_designer->installConfig('d_visual_designer_header');
            };
            if (!$this->model_extension_d_visual_designer_designer->checkConfig('d_visual_designer_footer')) {
                $this->model_extension_d_visual_designer_designer->installConfig('d_visual_designer_footer');
            };

            if (!$this->model_extension_d_opencart_patch_extension->isInstalled('d_visual_designer_header')) {
                $this->model_extension_d_opencart_patch_extension->install('module', 'd_visual_designer_header');
                $this->model_extension_module_d_visual_designer_header->setup();
            }
            if (!$this->model_extension_d_opencart_patch_extension->isInstalled('d_visual_designer_footer')) {
                $this->model_extension_d_opencart_patch_extension->install('module', 'd_visual_designer_footer');
                $this->model_extension_module_d_visual_designer_footer->setup();
            }
            //todo disable bootsrap

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
}