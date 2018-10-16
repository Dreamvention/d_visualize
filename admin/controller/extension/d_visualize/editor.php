<?php

class ControllerExtensionDVisualizeEditor extends Controller
{
    private $codename = 'd_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
    }

    public function index()
    {
        //init iframe_src
        if (!isset($this->session->data['iframe_url'])) {
            $param = array();
            if ($this->request->server['HTTPS']) {
                $store_url = HTTPS_SERVER;
                $catalog_url = HTTPS_CATALOG;
            } else {
                $store_url = HTTP_SERVER;
                $catalog_url = HTTP_CATALOG;
            }
            $this->session->data['iframe_url'] = $catalog_url;
        }
        $data['iframe']['save_iframe_url'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_visualize/editor' . '/saveIframeUrl');
        $data['iframe']['src'] = HTTPS_CATALOG;
        $this->response->setOutput(json_encode($data));
    }

    public function saveIframeUrl()
    {
        $this->session->data['iframe_url'] = html_entity_decode($this->request->post['last_url']);
        $json['success'] = $this->language->get('text_success');
        $this->response->setOutput(json_encode($json));
    }

}