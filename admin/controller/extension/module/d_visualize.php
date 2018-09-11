<?php
/*
*  location: admin/controller
*/

class ControllerExtensionModuleDVisualize extends Controller
{
    private $error = array();
    private $codename = 'd_visualize';
    private $route = 'extension/module/d_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->load->language($this->route);
        $this->load->model($this->route);
        $this->load->model('extension/' . $this->codename . '/theme');

        $this->load->model('extension/d_opencart_patch/module');
        $this->load->model('extension/d_opencart_patch/url');
        $this->load->model('extension/d_opencart_patch/load');
        $this->load->model('extension/d_opencart_patch/user');
        $this->load->model('extension/d_opencart_patch/setting');
        $this->load->model('tool/image');
        $this->d_shopunity = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_shopunity.json'));
        $this->d_admin_style = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_admin_style.json'));
        $this->d_opencart_patch = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_opencart_patch.json'));
        $this->extension = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $this->codename . '.json'), true);
        $this->d_twig_manager = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_twig_manager.json'));
        $this->d_event_manager = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_event_manager.json'));
        $this->d_visual_designer = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer.json'));
        $this->d_visual_designer_header = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer_header.json'));
        $this->d_visual_designer_footer = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_visual_designer_footer.json'));

        $this->store_id = (isset($this->request->get['store_id'])) ? $this->request->get['store_id'] : 0;

        $this->config->load($this->codename);
        $this->config_visualize = $this->config->get($this->codename . '_setting');
        $this->setting_visualize = $this->loadSetting();

        $this->config->load($this->codename . '/template/' . $this->config_visualize['active_template']);
        $this->config_active_template = $this->config->get($this->codename . '_template_' . $this->config_visualize['active_template']);
        $this->setting_active_template = array();

        //default theme overwriting values
        $this->config_theme = $this->config->get('config_theme_visualize');
        $this->config_active_template_theme = $this->config->get('config_theme_' . $this->config_visualize['active_template']);

    }

    public function index()
    {
        $this->load->language($this->route);

        $this->document->setTitle($this->language->get('heading_title_main'));

        if ($this->d_shopunity) {
            $this->load->model('extension/d_shopunity/mbooth');
            $this->model_extension_d_shopunity_mbooth->validateDependencies($this->codename);
        }

        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            if (!$this->model_extension_module_d_event_manager->isCompatible()) {
                $this->model_extension_module_d_event_manager->installCompatibility();
            }
        }

        if ($this->d_twig_manager) {
            $this->load->model('extension/module/d_twig_manager');
            $this->model_extension_module_d_twig_manager->installCompatibility();
        }

        if ($this->d_admin_style) {
            $this->load->model('extension/d_admin_style/style');
            $themes = $this->model_extension_d_admin_style_style->getAvailableThemes();
            foreach ($themes as $theme) {
                if ($theme == 'light') {
                    $this->model_extension_d_admin_style_style->getAdminStyle($theme);
                }
            }
        }

//        if ($this->setting_visualize[$status]) {
//            check template settings
//            if ($this->model_extension_d_opencart_patch_setting->getSetting($this->codename . '_template_' . $this->setting_visualize['active_template'])) {
//                $setting = $this->model_extension_d_opencart_patch_setting->getSetting($this->codename);
//                $data['template_setting'] = ($setting) ? $setting : array();
//            } else {
//                $data['template_setting'] = array();
//            }
//            $data['template_setting'] = array_replace_recursive($this->config_active_template_theme, $data['template_setting']);
//            $this->setting_active_template_theme = $data['template_setting'];
//            $this->installTheme();
//        }
        //Vue JS with Vuex and
        $this->document->addScript("view/javascript/d_vue/vue.min.js");
        $this->document->addScript("view/javascript/d_vuex/vuex.min.js");
        $this->document->addScript("view/javascript/d_vue_i18n/vue-i18n.min.js");
//        $this->document->addScript('view/javascript/.$this->codename./library/VueOptions.js');
//        $this->document->addScript('view/javascript/' . $this->codename . '/main.js');

        //Alertify
        $this->document->addScript('view/javascript/d_alertify/alertify.min.js');
        $this->document->addStyle('view/javascript/d_alertify/css/alertify.css');
        $this->document->addStyle('view/javascript/d_alertify/css/themes/bootstrap.css');

        //Other libraries
        $this->document->addScript('view/javascript/d_visualize/lib/VueOptions.js');
        $this->document->addScript('view/javascript/d_underscore/underscore-min.js');

        //visualize styles
        $this->document->addStyle('view/stylesheet/' . $this->codename . '/' . $this->codename . '.css');
        //loader
        $this->document->addStyle('view/stylesheet/' . $this->codename . '/lib/load-awesome-1.1.0/css/timer.css');

        // Module data

        $data['vueTemplates'] = $this->{'model_extension_module_' . $this->codename}->getVueTemplates();
        $view_scripts = $this->{'model_extension_module_' . $this->codename}->getVueScripts();

        foreach ($view_scripts as $script) {
            $this->document->addScript($script);
        }

        $data['language_id'] = $this->config->get('config_language_id');
        $data['local'] = $this->prepareLocal();
        $data['options'] = $this->prepareOptions();
        $state = array();
        $state['config']['save_url'] = $this->model_extension_d_opencart_patch_url->ajax($this->route . '/save');
        $state['config']['update_setting_url'] = $this->model_extension_d_opencart_patch_url->ajax($this->route . '/updateSetting');
        $state['config']['load_setting_url'] = $this->model_extension_d_opencart_patch_url->ajax($this->route . '/loadStateAjax');
        $data['state'] = $state;
        //out put view
        if (!$this->{'model_extension_module_' . $this->codename}->checkInstallModule()) {
            $data['text_welcome_title'] = $this->language->get('text_welcome_title');
            $data['text_welcome_description'] = $this->language->get('text_welcome_description');
            $data['features'][] = array(
                'text' => $this->language->get('text_welcome_visualize'),
                'icon' => 'image/' . $this->codename . 'text_welcome_visualize'
            );
            $data['features'][] = array(
                'text' => $this->language->get('text_welcome_building_blocks'),
                'icon' => 'image/' . $this->codename . 'text_welcome_visualize'
            );
            $data['features'][] = array(
                'text' => $this->language->get('text_welcome_mobile_ready'),
                'icon' => 'image/' . $this->codename . 'text_welcome_visualize'
            );
            $data['features'][] = array(
                'text' => $this->language->get('text_welcome_increase_sales'),
                'icon' => 'image/' . $this->codename . 'text_welcome_visualize'
            );
            $data['text_button_setup'] = $this->language->get('button_setup');
            $data['button_setup'] = $this->model_extension_d_opencart_patch_url->ajax($this->route . '/setup');
            $data['header'] = $this->load->controller('common/header');
            $data['column_left'] = $this->load->controller('common/column_left');
            $data['footer'] = $this->load->controller('common/footer');
            $this->response->setOutput($this->model_extension_d_admin_style_style->getWelcomeView($this->route, $data));
            return;
        }

        $status = $this->codename . '_status';
        $this->uninstallTheme();
        if ($this->setting_visualize['status']) {
            $this->installTheme();
        }
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $template = $this->load->view($this->route, $data);
        $this->response->setOutput($template);
    }

    public function save()
    {
        try {
            $this->uninstallTheme();
            if ($this->request->post['status']) {
                $this->installTheme();
            }
            // 3.x fix
            if (VERSION >= '3.0.0.0') {
                $sl_post_array = array();
                $sl_post_array['module_' . $this->codename . '_status'] = $this->request->post['status'];
                $this->model_extension_d_opencart_patch_setting->editSetting('module_' . $this->codename, $sl_post_array, $this->store_id);
            }
            $new_post = array();
            foreach ($this->request->post as $k => $v) {
                $new_post[$this->codename . '_' . $k] = $v;
            }
            $this->model_extension_d_opencart_patch_setting->editSetting($this->codename.'', $new_post, $this->store_id);
            $this->session->data['success'] = $this->language->get('text_success');
            $this->response->setOutput(json_encode(array('success' => $this->session->data['success'])));
        } catch (Exception $e) {
            $this->session->data['error'] = $e;
            $this->response->setOutput(json_encode(array('error' => $this->session->data['error'])));
        }
    }

    public function loadStateAjax()
    {
        $json = array();

        $json['setting'] = $setting = array();
        foreach ($this->setting_visualize['available_templates'] as $template) {
            $image = $this->model_tool_image->resize((is_file(DIR_IMAGE . 'catalog/' . $this->codename . '/template/' . $template . '.png') ? 'catalog/' . $this->codename . '/template/' . $template . '.png' : "no_image.png"), 300, 400);
            // maybe it will fluence on perfomance
            $this->config->load($this->codename . '/template/' . $template);
            $config_template = $this->config->get($this->codename . '_template_' . $template);

            $setting['available_templates'][] = array(
                'img' => $image,
                'title' => $config_template['name'],
                'description' => $config_template['description'],
                'codename' => $config_template['codename'],
            );
        }
        $setting['active_template'] = $this->setting_visualize['active_template'];
        $setting['auto_save'] = $this->setting_visualize['auto_save'];
        $setting['status'] = (int)$this->setting_visualize['status'];
        $json['setting'] = $setting;
        $json['success'] = $this->language->get('text_success');
        $this->response->setOutput(json_encode($json));
    }

    public function loadSetting()
    {
        //check if exist config in db
        if ($this->model_extension_d_opencart_patch_setting->getSetting($this->codename)) {
            $setting = $this->model_extension_d_opencart_patch_setting->getSetting($this->codename);
            $data['setting'] = ($setting) ? $setting : array();
        } else {
            $data['setting'] = array();
        }
        $new_setting = array();
        foreach ($this->config_visualize as $k => $v) {
            $new_setting[$this->codename . '_' . $k] = $v;
        }
        $data['setting'] = array_replace_recursive($new_setting, $data['setting']);
        $new_setting = array();
        //inherit users data
        foreach ($data['setting'] as $k => $v) {
            $new_setting[str_replace($this->codename . '_', '', $k)] = $v;
        }
        return $new_setting;

    }

    public function prepareLocal()
    {
        $local = array();

        $local['common']['heading_title'] = $this->language->get('heading_title_main');
        $local['common']['button_add'] = $this->language->get('button_add');
        $local['common']['button_save_and_stay'] = $this->language->get('button_save_and_stay');
        $local['common']['button_save'] = $this->language->get('button_save');
        $local['common']['button_cancel'] = $this->language->get('button_cancel');
        $local['common']['text_edit'] = $this->language->get('text_edit');
        $local['common']['text_yes'] = $this->language->get('text_yes');
        $local['common']['text_no'] = $this->language->get('text_no');
        $local['common']['text_enabled'] = $this->language->get('text_enabled');
        $local['common']['entry_status'] = $this->language->get('entry_status');

        $local['setting']['entry_auto_save_help'] = $this->language->get('entry_auto_save_help');

        $local['error']['load_content'] = $this->language->get('error_load_content');
        $local['error']['save_content'] = $this->language->get('error_save_content');
        $local['blocks'] = array();
        return array($this->config->get('config_language_id') => $local);

//        foreach ($results as $block) {
//            $local['blocks'][$block] = $this->load->controller('extension/'.$this->codename.'_module/'.$block.'/local');
//        }
    }

    public function prepareOptions()
    {
        $option = array();
        // Breadcrumbs
        $option['common']['breadcrumbs'] = array();
        $option['common']['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->model_extension_d_opencart_patch_url->ajax('common/home')
        );

        $option['common']['breadcrumbs'][] = array(
            'text' => $this->language->get('text_module'),
            'href' => $this->model_extension_d_opencart_patch_url->getExtensionAjax('module')
        );

        $option['common']['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title_main'),
            'href' => $this->model_extension_d_opencart_patch_url->ajax($this->route)
        );
        $option['action']['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionAjax('module');
        // Variable
        $option['common']['id'] = $this->codename;
        $option['common']['route'] = $this->route;
        $option['common']['store_id'] = $this->store_id;
        $option['common']['version'] = $this->extension['version'];
        $option['common']['token'] = $this->model_extension_d_opencart_patch_user->getUrlToken();
        $option['common']['d_shopunity'] = $this->d_shopunity;
        $option['common']['entry_get_update'] = sprintf($this->language->get('entry_get_update'), $this->extension['version']);

        $option['action']['module_link'] = $this->model_extension_d_opencart_patch_url->link($this->route);
        // Multistore
        if (isset($this->request->get['store_id'])) {
            $store_id = $this->request->get['store_id'];
        } else {
            $store_id = 0;
        }
        // Url
        $url = '';
        if (isset($this->request->get['store_id'])) {
            $url .= '&store_id=' . $store_id;
        }

        $option['action']['action'] = $this->model_extension_d_opencart_patch_url->link($this->route, $url);
        $option['action']['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionAjax('module');

        return $option;
    }

    public function setup()
    {
        $this->load->model('extension/d_opencart_patch/url');
        $this->{'model_extension_module_' . $this->codename}->installConfig();
        $this->response->redirect($this->model_extension_d_opencart_patch_url->ajax($this->route));
    }

    public function uninstallTheme()
    {
        $setting = $this->model_extension_d_opencart_patch_setting->getSetting('theme_default');
        $setting['theme_default_directory'] = 'default';
        $this->model_extension_d_opencart_patch_setting->editSetting('theme_default', $setting);
        $this->uninstallEvents();
    }

    public function installTheme()
    {
        //change opencart directory
        $setting = $this->model_extension_d_opencart_patch_setting->getSetting('theme_default');
        $setting['theme_default_directory'] = $this->codename; // 32 work
        $this->model_extension_d_opencart_patch_setting->editSetting('theme_default', $setting);

        $this->uninstallEvents();
        $this->installEvents();
        $this->installVD();

        $this->installDependencyModules($this->setting_visualize['active_template']);

        $this->installConfigThemeDefaults();

        $this->installTemplateThemeDefaults($this->setting_visualize['active_template']);

    }

    private function installDependencyModules($active_template)
    {
        //no need to validate if it's loaded in DB
        if (!in_array($active_template, $this->setting_visualize['available_templates']))
            $installed_template_extensions = $this->{'model_extension_' . $this->codename . '_theme'}->getTemplateExtensions($active_template);
        if (!empty($installed_template_extensions)) {
            foreach ($installed_template_extensions as $template_extensions) {
                $this->load->model($template_extensions['index']);
                $this->load->controller($template_extensions['index'] . '/setup');
//                if (!$this->{}->checkConfig($template_extensions['codename'])) {
//                    $this->{$template_extensions['index']}->installConfig($template_extensions['codename']);
//                };
            }
        }
    }

    public function installVD()
    {
        if ($this->d_visual_designer) {
            $this->load->model('extension/d_visual_designer/designer');
            if (!$this->model_extension_d_visual_designer_designer->checkConfig('d_visual_designer_header')) {
                $this->model_extension_d_visual_designer_designer->installConfig('d_visual_designer_header');
            };
            if (!$this->model_extension_d_visual_designer_designer->checkConfig('d_visual_designer_footer')) {
                $this->model_extension_d_visual_designer_designer->installConfig('d_visual_designer_footer');
            };
            //todo switch on vd-header get default template
            //todo switch template to template if need
            //todo disable bootsrap

        }
    }

    public function installEvents()
    {
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            $route_info = $this->{'model_extension_' . $this->codename . '_theme'}->getRoute();
            if (!empty($route_info['events'])) {
                foreach ($route_info['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->addEvent($this->codename, $trigger, $action, 1, 999);
                }
            }
            $route_info_active_template = $this->{'model_extension_'
            . $this->codename . '_theme'}->getRoute('template/' . $route_info[$this->codename . '_setting']['active_template']);
            if (!empty($route_info_active_template['events'])) {
                foreach ($route_info_active_template['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->addEvent($this->codename . '_template_' . $route_info[$this->codename . '_setting']['active_template'], $trigger, $action, 1, 1);
                }
            }

        }
    }

    public function uninstallEvents()
    {
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            $this->model_extension_module_d_event_manager->deleteEvent($this->codename);
            $route_info = $this->{'model_extension_' . $this->codename . '_theme'}->getRoute();
            $route_info_active_template = $this->{'model_extension_'
            . $this->codename . '_theme'}->getRoute('template/' . $route_info[$this->codename . '_setting']['active_template']);
            if (!empty($route_info_active_template['events'])) {
                foreach ($route_info_active_template['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->addEvent($this->codename . '_template_' . $route_info[$this->codename . '_setting']['active_template'], $trigger, $action, 1, 1);
                }
            }

        }
    }

    public function installTemplateThemeDefaults()
    {
        $this->installConfigThemeDefaults('config_active_template_theme');
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

    public function install()
    {
        if ($this->d_shopunity) {
            $this->load->model('extension/d_shopunity/mbooth');
            $this->model_extension_d_shopunity_mbooth->installDependencies($this->codename);
        }
    }

    public function uninstall()
    {
        $this->uninstallTheme();
    }

}

?>
