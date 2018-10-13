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
}