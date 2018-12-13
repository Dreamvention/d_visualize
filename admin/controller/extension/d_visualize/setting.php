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
        $setting_visualize = $this->model_extension_module_d_visualize->loadSetting();
        $this->setting_visualize = $setting_visualize['module_' . $this->codename . '_setting'];
        $this->extension = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $this->codename . '.json'), true);
        $this->status_visualize = isset($setting_visualize['module_' . $this->codename . '_status']) ? $setting_visualize['module_' . $this->codename . '_status'] : false;
        $this->custom_style = $this->model_extension_module_d_visualize->loadCustomStyle();
    }

    public function index()
    {
        $data = array(
            'setting'      => $this->setting_visualize,
            'status'       => $this->status_visualize,
            'page'         => isset($this->session->data['d_visualize_page_admin']) ? $this->session->data['d_visualize_page_admin'] : 'home',
            'custom_style' => $this->custom_style);

        $this->response->setOutput(json_encode($data));
    }

    public function save()
    {
        try {
            $this->load->model('extension/d_visualize/template');
            $this->model_extension_d_visualize_template->uninstallTheme();
            $new_post = array();
            $old_post = array();
            foreach ($this->request->post as $k => $v) {
                $new_post['module_' . $this->codename . '_' . $k] = json_decode(html_entity_decode($v, ENT_QUOTES, 'UTF-8'), true);
                $old_post[$this->codename . '_' . $k] = json_decode(html_entity_decode($v, ENT_QUOTES, 'UTF-8'), true);
            }
            //version save onto db
            $old_post[$this->codename . '_' . 'version'] = $new_post['module_' . $this->codename . '_' . 'version'] = intval(implode('', explode('.', $this->extension['version'])));
            $this->model_extension_d_opencart_patch_setting->editSetting('module_' . $this->codename, $new_post, $this->store_id);
            $this->model_extension_d_opencart_patch_setting->editSetting($this->codename, $old_post, $this->store_id);
            $this->session->data['success'] = $this->language->get('text_success');
            $setting_visualize = $this->model_extension_module_d_visualize->loadSetting();
            $this->setting_visualize = $setting_visualize['module_' . $this->codename . '_setting'];
            if ($setting_visualize['module_' . $this->codename . '_status']) {
                $this->model_extension_d_visualize_template->installTheme($this->setting_visualize['active_template']);
            }
            $this->response->setOutput(json_encode(array('success' => $this->session->data['success'])));
        } catch (Exception $e) {
            $this->session->data['error'] = $e;
            $this->response->setOutput(json_encode(array('error' => $this->session->data['error'])));
        }
    }

    public function save_custom_style()
    {
        $post = array('custom_style_' . $this->codename => $this->request->post['custom_style']);
        $this->model_extension_d_opencart_patch_setting->editSetting('custom_style_' . $this->codename,array('custom_style_' . $this->codename => json_decode(html_entity_decode($this->request->post['custom_style'], ENT_QUOTES, 'UTF-8'), true)) , $this->store_id);
        $this->model_extension_d_opencart_patch_setting->editSetting('module_custom_style_' . $this->codename, array('module_custom_style_' . $this->codename => json_decode(html_entity_decode($this->request->post['custom_style'], ENT_QUOTES, 'UTF-8'), true)), $this->store_id);
        $this->response->setOutput(json_encode(array('success' => $this->session->data['success'])));

    }
}