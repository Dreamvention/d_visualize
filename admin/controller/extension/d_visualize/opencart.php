<?php

class ControllerExtensionDVisualizeOpencart extends Controller
{
    public function __construct($registry)
    {
        parent::__construct($registry);
    }

    public function index()
    {
        $this->load->language('extension/module/d_visualize');
        $data['title'] = $this->language->get('heading_title_main');
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');
        $data['base_url'] = HTTPS_CATALOG;
        $this->response->setOutput(json_encode($data));
    }
}