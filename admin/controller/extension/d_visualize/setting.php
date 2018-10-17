<?php

class ControllerExtensionDVisualizeSetting extends Controller
{
    private $codename = 'd_visualize';
    private $store_id = 0;
    private $route = 'extension/module/d_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->load->model($this->route);
        $this->store_id = (isset($this->request->post['store_id'])) ? $this->request->post['store_id'] : 0;
        $setting_visualize = $this->{'model_extension_module_' . $this->codename}->loadSetting();
        $this->setting_visualize = $setting_visualize['module_' . $this->codename . '_setting'];
        $this->status_visualize = isset($setting_visualize['module_' . $this->codename . '_status']) ? $setting_visualize['module_' . $this->codename . '_status'] : false;
    }

    public function index()
    {
        $this->response->setOutput(json_encode(array('setting' => $this->setting_visualize, 'status' => $this->status_visualize)));
    }
    public function save()
    {
        try {
            $this->load->model('extension/d_visualize/template');
            $this->model_extension_d_visualize_template->uninstallTheme();
            $new_post = array();
            foreach ($this->request->post as $k => $v) {
                $new_post['module_' . $this->codename . '_' . $k] = json_decode(html_entity_decode($v, ENT_QUOTES, 'UTF-8'), true);
            }
            $this->model_extension_d_opencart_patch_setting->editSetting('module_' . $this->codename, $new_post, $this->store_id);
            $this->session->data['success'] = $this->language->get('text_success');
            $setting_visualize = $this->{'model_extension_module_' . $this->codename}->loadSetting();
            $this->setting_visualize = $setting_visualize['module_' . $this->codename . '_setting'];
            if ($setting_visualize['module_' . $this->codename . '_status']) {
                $this->model_extension_d_visualize_template->installTheme($this->setting_visualize['active_template']);
            }
            $this->response->setOutput(json_encode(array('success' => $this->session->data['success'])));
        } catch (Exception $e) {
            echo "<pre>"; print_r($e);echo "</pre>";
            $this->session->data['error'] = $e;
            $this->response->setOutput(json_encode(array('error' => $this->session->data['error'])));
        }

    }
}