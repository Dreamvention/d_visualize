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
//        $this->load->model($this->route);
        $this->load->model('extension/d_opencart_patch/module');
        $this->load->model('extension/d_opencart_patch/url');
        $this->load->model('extension/d_opencart_patch/load');
        $this->load->model('extension/d_opencart_patch/user');
        $this->load->model('extension/d_opencart_patch/setting');
        $this->d_admin_style = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_admin_style.json'));
        if ($this->d_admin_style) {
            $this->load->model('extension/d_admin_style/style');
        }
        $this->d_shopunity = (file_exists(  DIR_SYSTEM . 'library/d_shopunity/extension/d_shopunity.json'));
        $this->d_opencart_patch = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_opencart_patch.json'));
        $this->extension = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $this->codename . '.json'), true);
        $this->d_twig_manager = (file_exists(DIR_SYSTEM.'library/d_shopunity/extension/d_twig_manager.json'));
        $this->d_event_manager = (file_exists(DIR_SYSTEM.'library/d_shopunity/extension/d_event_manager.json')); $this->store_id = (isset($this->request->get['store_id'])) ? $this->request->get['store_id'] : 0;

        $this->config->load($this->codename . '/' . $this->codename);
        $this->config_visualize = $this->config->get($this->codename);
    }

    public function index()
    {
        $this->load->language($this->route);

        $this->document->setTitle($this->language->get('heading_title_main'));

//        if ($this->d_shopunity) {
//            $this->load->model('extension/d_sho   punity/mbooth');
//            $this->model_extension_d_shopunity_mbooth->validateDependencies($this->codename);
//        }
        if($this->d_twig_manager){
            $this->load->model('extension/module/d_twig_manager');
            $this->model_extension_module_d_twig_manager->installCompatibility();
        }
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            $this->model_extension_module_d_event_manager->installCompatibility();
        }


        // Multistore
        if (isset($this->request->get['store_id'])) {
            $store_id = $this->request->get['store_id'];
        } else {
            $store_id = 0;
        }
        // Saving
        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $this->save();
        }

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        $data['action'] = $this->url->link($this->route, 'user_token=' . $this->session->data['user_token'], true);

        $data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true);

        if (isset($this->request->post[$this->codename . '_status'])) {
            $data[$this->codename . '_status'] = $this->request->post[$this->codename . '_status'];
        } else {
            $data[$this->codename . '_status'] = $this->config->get($this->codename . '_status');
        }

        // Url
        $url = '';
        if (isset($this->request->get['store_id'])) {
            $url .= '&store_id=' . $store_id;
        }
        // Variable
        $data['id'] = $this->codename;
        $data['route'] = $this->route;
        $data['store_id'] = $store_id;
        $data['version'] = $this->extension['version'];
        $data['token'] = $this->model_extension_d_opencart_patch_user->getUrlToken();
        $data['d_shopunity'] = $this->d_shopunity;
        $data['entry_get_update'] = sprintf($this->language->get('entry_get_update'), $data['version']);

        $data['module_link'] = $this->model_extension_d_opencart_patch_url->link($this->route);
        $data['action'] = $this->model_extension_d_opencart_patch_url->link($this->route, $url);
        $data['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionLink('module');


        //check if exist config in db
        if ($this->model_extension_d_opencart_patch_setting->getSetting($this->codename)) {
            $setting = $this->model_extension_d_opencart_patch_setting->getSetting($this->codename);
            $data['setting'] = ($setting) ? $setting : array();
        } else {
            $data['setting'] = array();
        }

        //inherit users data
        $data['setting'] = array_replace_recursive($this->config_visualize, $data['setting']);

        $status = $this->codename . '_status';
        if ($data[$status]) {
            $this->installTheme();
        } else {
            $this->uninstallTheme();
        }
        $this->config->load($this->codename . '/skin/' . $this->config_visualize['active_skin']);
        $config_active_skit = $this->config->get($this->codename . '_skin_' . $this->config_visualize['active_skin']);
        // Breadcrumbs
        $data['breadcrumbs'] = array();
        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->model_extension_d_opencart_patch_url->link('common/dashboard')
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_module'),
            'href' => $this->model_extension_d_opencart_patch_url->getExtensionLink('modules')
        );
        $data['breadcrumbs'][] = array(
            'text' => ($this->extension) ? $this->language->get('heading_title') : $this->language->get('heading_title'),
            'href' => $this->model_extension_d_opencart_patch_url->link($this->route)
        );

        $this->model_extension_d_admin_style_style->getAdminStyle('light');
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view($this->route, $data));
    }

    public function uninstallTheme()
    {
        $setting = $this->model_extension_d_opencart_patch_setting->getSetting('theme_default');
//        $setting['theme_default_directory'] = $this->session->data['previous_theme']; // 32 work
        $setting['theme_default_directory'] = 'default'; // 32 work
        $this->model_extension_d_opencart_patch_setting->editSetting('theme_default', $setting);
        $this->uninstallEvents();
    }

    public function installTheme()
    {
//        $setting = $this->model_extension_d_opencart_patch_setting->getSetting('config');
//        $setting['config_theme'] = $this->codename;//21 and lower
//        $this->model_extension_d_opencart_patch_setting->editSetting('config',$setting);
        $setting = $this->model_extension_d_opencart_patch_setting->getSetting('theme_default');
        $this->session->data['previous_theme'] = $setting['theme_default_directory'];
        $setting['theme_default_directory'] = $this->codename; // 32 work
        $this->model_extension_d_opencart_patch_setting->editSetting('theme_default', $setting);
        $this->installEvents();

    }

    public function installEvents()
    {
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            $this->load->model('extension/' . $this->codename . '/theme');
            $route_info = $this->{'model_extension_' . $this->codename . '_theme'}->getRoute();
            if (!empty($route_info['events'])) {
                foreach ($route_info['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->addEvent($this->codename, $trigger, $action);
                }
            }
            //foreach components events or partials events
        }
    }



    public function uninstallEvents()
    {
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            $this->model_extension_module_d_event_manager->deleteEvent($this->codename);
        }
    }

    public function save()
    {
        $this->uninstallTheme();
        if ($this->request->post[$this->codename . '_status']) {
            $this->installTheme();
        }
        // 3.x fix
        if (VERSION >= '3.0.0.0') {
            $sl_post_array = array();
            if ($this->request->post[$this->codename . '_status'] == 0) {
                $sl_post_array['module_' . $this->codename . '_status'] = 0;
            } elseif ($this->request->post[$this->codename . '_status'] == 1) {
                $sl_post_array['module_' . $this->codename . '_status'] = 1;
            }
            $this->model_extension_d_opencart_patch_setting->editSetting('module_' . $this->codename, $sl_post_array, $this->store_id);
        }
        $this->model_extension_d_opencart_patch_setting->editSetting($this->codename, $this->request->post, $this->store_id);

        $this->session->data['success'] = $this->language->get('text_success');

        $this->response->redirect($this->model_extension_d_opencart_patch_url->getExtensionLink('module'));

    }
}

?>
