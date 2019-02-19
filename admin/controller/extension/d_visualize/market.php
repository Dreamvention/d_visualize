<?php
class ControllerExtensionDVisualizeMarket extends Controller
{
    private $codename = 'd_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->load->model('extension/d_shopunity/mbooth');
        $this->load->model('extension/d_shopunity/account');
        $this->load->model('extension/d_opencart_patch/url');
    }

    public function index()
    {
        $data = array();
        $this->load->model('extension/d_shopunity/extension');
        if (!$this->model_extension_d_shopunity_account->isLogged()) {
            $data['redirect'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_shopunity/account/login', '', true);
        }
        $filter_data['limit'] = 12;
        $filter_data['status'] = 1;
        $filter_data['published'] = 1;
        $filter_data['store_version'] = VERSION;

        $data['extensions'] = $this->model_extension_d_shopunity_extension->getExtensions($filter_data);
        $this->response->setOutput(json_encode($data));

    }
}