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
        $this->load->model('extension/d_opencart_patch/url');

        //font-awesome

        $data['title'] = $this->language->get('heading_title_main');
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
        $data['shopunity'] = $this->d_shopunity;
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
        $this->load->model('tool/image');
        //todo check all who need this actions
        //it's links on other pages like cancel etc
        $data['action']['editor_page'] = $this->model_extension_d_opencart_patch_url->ajax('extension/module/d_visualize/editor','#/editor',true);
        $data['action']['home_page'] = $this->model_extension_d_opencart_patch_url->ajax('extension/module/d_visualize', '', true);
        $data['action']['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionAjax('module');
        $data['action']['vdh'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_visual_designer/designer/frontend', 'config=d_visual_designer_header&id=0');
        $data['action']['vdf'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_visual_designer/designer/frontend', 'config=d_visual_designer_footer&id=0');
        $data['action']['action'] = $this->model_extension_d_opencart_patch_url->ajax($this->route, $url);
        $data['action']['shopunity_module'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_shopunity/market','category_id=2&');
        $data['action']['download_shopunity'] = 'https://shopunity.net/';
        $data['img']['no_image'] = $this->model_tool_image->resize("no_image.png", 300, 400);
        $data['img']['no_data_img'] = 'view/image/' . $this->codename . '/nodata.png';
        $data['img']['desktop_frame'] = 'view/image/' . $this->codename . '/desktop_frame.png';
        $data['img']['mobile_frame'] = 'view/image/' . $this->codename . '/mobile_frame.png';
        $data['d_shopunity'] = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_shopunity.json'));
        $data['d_admin_style'] = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_admin_style.json'));
        $data['d_opencart_patch'] = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_opencart_patch.json'));
        $data['extension'] = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $this->codename . '.json'), true);
        $data['d_twig_manager'] = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_twig_manager.json'));
        $data['d_event_manager'] = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_event_manager.json'));

        $this->response->setOutput(json_encode($data));
    }

    /**
     * @return string
     */
    public function refresh_db()
    {
        $this->load->model('extension/module/d_visualize');
        $this->model_extension_module_d_visualize->dropDataBase();
        $this->model_extension_module_d_visualize->installDataBase();
        $this->response->setOutput(json_encode(array('sussess' => true)));
    }

    /**
     * @return string
     */
    public function trunce_db()
    {
        $this->load->model('extension/module/d_visualize');
        $this->model_extension_module_d_visualize->tranceDataBase();
        $this->response->setOutput(json_encode(array('sussess' => true)));

    }
    public function refresh_menu()
    {
        $this->load->model('extension/d_visualize/extension_helper');
        $this->model_extension_d_visualize_extension_helper->addLinksToMenu();
        $this->response->setOutput(json_encode(array('sussess' => true)));
    }
    public function reinstall_current_theme()
    {
        $this->load->model('extension/d_visualize/template');
        $this->load->model('extension/module/d_visualize');
        $current_setting = $this->model_extension_module_d_visualize->loadSetting();
        $this->model_extension_d_visualize_template->uninstallTheme();
        $this->model_extension_d_visualize_template->installTheme($current_setting['module_d_visualize_setting']['active_template']);
        $this->response->setOutput(json_encode(array('sussess' => true)));
    }

    public function trunce_active_styles(){
        $this->load->model('extension/d_visualize/template');
        $this->model_extension_d_visualize_template->truncStaticCSS(json_decode(html_entity_decode($this->request->post['template'])),(json_decode(html_entity_decode($this->request->post['skin']))));
        $this->response->setOutput(json_encode(array('sussess' => true)));

    }

}