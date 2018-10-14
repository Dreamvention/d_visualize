<?php

class ControllerExtensionDVisualizeOpencart extends Controller
{
    private $codename = 'd_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
    }

    public function index()
    {
        $this->load->language('extension/module/d_visualize');

        //font-awesome
        $this->document->addStyle('view/javascript/' . $this->codename . '/font/awesome/all.min.css');
        $this->document->addStyle('view/javascript/' . $this->codename . '/font/awesome/v4-shims.min.css');

        $data['title'] = $this->language->get('heading_title_main');
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');
        $data['base_url'] = HTTPS_CATALOG;

        // Breadcrumbs
        $data['breadcrumbs'] = array();
        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->model_extension_d_opencart_patch_url->ajax('common/home')
        );
        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_module'),
            'href' => $this->model_extension_d_opencart_patch_url->getExtensionAjax('module')
        );
        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title_main'),
            'href' => $this->model_extension_d_opencart_patch_url->ajax($this->route)
        );

        // Variable
        $data['d_shopunity'] = $this->d_shopunity;
        $data['entry_get_update'] = sprintf($this->language->get('entry_get_update'), $this->extension['version']);

        // Multistore
        if (isset($this->request->get['store_id'])) {
            $store_id = $this->request->get['store_id'];
        } else {
            $store_id = 0;
        }
        $data['store_id'] = $store_id;

        // Url
        $url = '';
        if (isset($this->request->get['store_id'])) {
            $url .= '&store_id=' . $store_id;
        }

        $data['action']['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionAjax('module');
        $data['action']['vdh'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_visual_designer/designer/frontend', 'config=d_visual_designer_header&id=0');
        $data['action']['vdf'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_visual_designer/designer/frontend', 'config=d_visual_designer_footer&id=0');
        $data['action']['action'] = $this->model_extension_d_opencart_patch_url->ajax($this->route, $url);
        $data['img']['no_image'] = $this->model_tool_image->resize("no_image.png", 300, 400);
        $data['img']['no_data_img'] = 'view/image/' . $this->codename . '/nodata.png';
        $data['img']['desktop_frame'] = 'view/image/' . $this->codename . '/desktop_frame.png';
        $data['img']['mobile_frame'] = 'view/image/' . $this->codename . '/mobile_frame.png';
        $this->response->setOutput(json_encode($data));
    }
}