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
        $this->config_visualize = $this->config->get('module_' . $this->codename . '_setting');
        $setting_visualize = $this->loadSetting();
        $this->setting_visualize = $setting_visualize['module_' . $this->codename . '_setting'];
        $this->status_visualize = $setting_visualize['module_' . $this->codename . '_status'];
        //default theme overwriting values
        $this->config_theme = $this->config->get('config_theme_visualize');
        $this->config_active_template_theme = $this->config->get('config_theme_' . $this->setting_visualize['active_template']);

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

        //Vue JS with Vuex and
        $this->document->addScript("view/javascript/d_vue/vue.min.js");
        $this->document->addScript("view/javascript/d_vuex/vuex.min.js");
        $this->document->addScript("view/javascript/d_vue_i18n/vue-i18n.min.js");
        $this->document->addScript("view/javascript/d_vue_router/vue-router.min.js");

        //Alertify
        $this->document->addScript('view/javascript/d_alertify/alertify.min.js');
        $this->document->addStyle('view/javascript/d_alertify/css/alertify.css');
        $this->document->addStyle('view/javascript/d_alertify/css/themes/bootstrap.css');

        //Other libraries
        $this->document->addScript('view/javascript/d_visualize/lib/VueOptions.js');
        $this->document->addScript('view/javascript/d_underscore/underscore-min.js');

        //visualize styles
        $this->document->addStyle('view/stylesheet/' . $this->codename . '/dist/' . $this->codename . '.css');

        //loader
        $this->document->addStyle('view/stylesheet/' . $this->codename . '/lib/load-awesome-1.1.0/css/timer.css');

        //font-awesome
        $this->document->addStyle('https://use.fontawesome.com/releases/v5.2.0/css/all.css');
        $this->document->addStyle('https://use.fontawesome.com/releases/v5.2.0/css/v4-shims.css');
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
        $state['config']['load_setting_url'] = $this->model_extension_d_opencart_patch_url->ajax($this->route . '/loadState');
        $data['state'] = $state;
        //out put view
        $data['setup'] = false;
        if (!$this->{'model_extension_module_' . $this->codename}->checkInstallModule()) {
            $data = $this->setup($data);
        }
        $this->uninstallTheme();
        if (!empty($this->status_visualize)&&$this->status_visualize) {
            $this->installTheme();
        }
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view($this->route, $data));
    }

    public function setup($data)
    {
        $data['setup'] = true;
        $data['text_setup_title'] = $this->language->get('text_setup_title');
        $data['text_setup_description'] = $this->language->get('text_setup_description');
        $data['setup_bottom_image'] = $this->model_tool_image->resize('catalog/' . $this->codename . '/Image_footer_Social_Login.svg', 100, 100);
        $data['setup_into_logo'] = $this->model_tool_image->resize('catalog/' . $this->codename . '/social_login_preview.svg', 100, 100);

        $data['features'][] = array(
            'text' => $this->language->get('text_setup_step_by_step'),
            'icon' => $this->model_tool_image->resize('catalog/' . $this->codename . '/step_by_step.svg', 100, 100)
        );
        $data['features'][] = array(
            'text' => $this->language->get('text_setup_soc_logins'),
            'icon' => $this->model_tool_image->resize('catalog/' . $this->codename . '/soc_logins.svg', 100, 100)
        );
        $data['features'][] = array(
            'text' => $this->language->get('text_setup_full_customize'),
            'icon' => $this->model_tool_image->resize('catalog/' . $this->codename . '/full_customize.svg', 100, 100)
        );
        $data['features'][] = array(
            'text' => $this->language->get('text_setup_gdpr_compilant'),
            'icon' => $this->model_tool_image->resize('catalog/' . $this->codename . '/gdpr_compilant.svg', 100, 100)
        );
        $data['text_button_setup'] = $this->language->get('button_setup');
        $data['button_setup'] = $this->model_extension_d_opencart_patch_url->ajax($this->route . '/setupUrl');
        return $data;
    }

    public function save()
    {
        try {
            $this->uninstallTheme();

            $new_post = array();
            foreach ($this->request->post as $k => $v) {
                $new_post['module_' . $this->codename . '_' . $k] = $v;
            }
            $this->model_extension_d_opencart_patch_setting->editSetting('module_' . $this->codename, $new_post, $this->store_id);
            $this->session->data['success'] = $this->language->get('text_success');
            if ($this->request->post['status']) {
                $this->installTheme();
            }
            $this->response->setOutput(json_encode(array('success' => $this->session->data['success'])));
        } catch (Exception $e) {
            $this->session->data['error'] = $e;
            $this->response->setOutput(json_encode(array('error' => $this->session->data['error'])));
        }
    }

    public function loadState()
    {
        $json = array();
        $setting = array();
        $templates = array();
        foreach ($this->getAvailableTemplates() as $template_k => $template) {
            $templates[$template_k] = $template;
        }
        $setting['active_template'] = $this->setting_visualize['active_template'];
        $setting['auto_save'] = $this->setting_visualize['auto_save'];
        $setting['status'] = (int)$this->status_visualize;
        $json['templates'] = $templates;
        $json['setting'] = $setting;
        $json['success'] = $this->language->get('text_success');
        $this->response->setOutput(json_encode($json));
    }

    public function loadSetting($suffix = '')
    {
        //check if exist config in db
        $loadSetting = $this->model_extension_d_opencart_patch_setting->getSetting('module_' . $this->codename, $this->store_id);

        if ($loadSetting) {
            $dbSetting = ($loadSetting) ? $loadSetting : array();
        } else {
            $dbSetting = array();
        }
        //inherit users data
        $setting = array();
        $setting = array_replace_recursive(array('module_' . $this->codename. '_setting' => $this->config_visualize),$dbSetting );

        return $setting;
    }

    //todo to model
    public function getAvailableTemplates()
    {
        $files = glob(DIR_CONFIG . $this->codename . '/template/*.php', GLOB_BRACE);
        $result = array();
        foreach ($files as $key => $file) {
            $codename = basename($file, '.php');
            $this->config->load($this->codename . '/template/' . $codename);
            $config = $this->config->get($this->codename . '_template_' . $codename . '_setting');
            $result[$codename] = array(
                'source'  => 'config',
                'setting' => $config,
                'img'     => $this->model_tool_image->resize((is_file(DIR_IMAGE . 'catalog/' . $this->codename . '/template/' . $codename . '.png') ? 'catalog/' . $this->codename . '/template/' . $codename . '.png' : "no_image.png"), 300, 400),

            );
        }
        //if there will be changes from DB it will replace
        $dbTemplates = $this->getTemplates();
        foreach ($dbTemplates as $template) {
            $result[$template['codename']] = $template;
        }

        return $result;
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
        $local['common']['entry_edit_theme'] = $this->language->get('entry_edit_theme');

        $local['setting']['entry_auto_save_help'] = $this->language->get('entry_auto_save_help');
        $local['dashboard']['entry_available_templates'] = $this->language->get('entry_available_templates');

        $local['error']['load_content'] = $this->language->get('error_load_content');
        $local['error']['save_content'] = $this->language->get('error_save_content');
        $local['blocks'] = array();
        return array($this->config->get('config_language_id') => $local);
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
        // Variable
        $option['common']['id'] = $this->codename;
        $option['common']['route'] = $this->route;
        $option['common']['store_id'] = $this->store_id;
        $option['common']['version'] = $this->extension['version'];
        $option['common']['token'] = $this->model_extension_d_opencart_patch_user->getUrlToken();
        $option['common']['d_shopunity'] = $this->d_shopunity;
        $option['common']['entry_get_update'] = sprintf($this->language->get('entry_get_update'), $this->extension['version']);
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
        $param = array();
        if ($this->request->server['HTTPS']) {
            $store_url = HTTPS_SERVER;
            $catalog_url = HTTPS_CATALOG;
        } else {
            $store_url = HTTP_SERVER;
            $catalog_url = HTTP_CATALOG;
        }
        $option['edit']['iframe_edit'] = $catalog_url;

        $option['action']['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionAjax('module');
        $option['action']['module_link'] = $this->model_extension_d_opencart_patch_url->link($this->route);
        $option['action']['vdh'] = $this->model_extension_d_opencart_patch_url->ajax('extension/module/d_visual_designer_header', $url);
        $option['action']['vdf'] = $this->model_extension_d_opencart_patch_url->ajax('extension/module/d_visual_designer_footer', $url);
        $option['action']['action'] = $this->model_extension_d_opencart_patch_url->ajax($this->route, $url);
        $option['action']['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionAjax('module');
        $option['img']['no_image'] = $this->model_tool_image->resize("no_image.png", 300, 400);

        return $option;
    }

    public function setupUrl()
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

    // todo to model theme
    private function installDependencyModules($active_template)
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

    // todo to model
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

    // todo to model
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
            . $this->codename . '_theme'}->getRoute('template/' . $route_info['module_' . $this->codename . '_setting']['active_template']);
            if (!empty($route_info_active_template['events'])) {
                foreach ($route_info_active_template['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->addEvent($this->codename . '_template_' . $route_info['module_' . $this->codename . '_setting']['active_template'], $trigger, $action, 1, 1);
                }
            }

        }
    }

    // todo to model
    public function uninstallEvents()
    {
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            $this->model_extension_module_d_event_manager->deleteEvent($this->codename);
            $route_info = $this->{'model_extension_' . $this->codename . '_theme'}->getRoute();
            $route_info_active_template = $this->{'model_extension_'
            . $this->codename . '_theme'}->getRoute('template/' . $route_info['module_' . $this->codename . '_setting']['active_template']);
            if (!empty($route_info_active_template['events'])) {
                foreach ($route_info_active_template['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->deleteEvent($this->codename . '_template_' . $route_info['module_' . $this->codename . '_setting']['active_template']);
                }
            }

        }
    }

    // todo to model template
    public function installTemplateThemeDefaults()
    {
//        $this->installConfigThemeDefaults('config_active_template_theme');
    }

    // todo to model template
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
        $this->installDataBase();
    }

    public function getTemplates($data_filter = array())
    {
        $sql = 'SELECT * from ' . DB_PREFIX . 'vz_templates';
        return $this->db->query($sql)->rows;
    }

    //todo to model
    public function installDataBase()
    {
        $sql = "CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "vz_templates (
            template_id INT(11) NOT NULL AUTO_INCREMENT,
            store_id INT(11) NOT NULL,
            codename VARCHAR(255) NOT NULL,
            source VARCHAR(55) DEFAULT NULL,
            description VARCHAR(255) DEFAULT NULL,
            setting TEXT NOT NULL,
            history_id INT(11) NOT NULL,
            img VARCHAR(255) DEFAULT NULL,
            date_created DATETIME NOT NULL,
            date_modified DATETIME NOT NULL,
            PRIMARY KEY (template_id)
        )
        COLLATE='utf8_general_ci'
        ENGINE=MyISAM;";

        $this->db->query($sql);
    }

    public function uninstall()
    {
        $this->uninstallTheme();
    }

}

?>
