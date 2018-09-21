<?php

class ControllerExtensionDVisualizeEvent extends Controller
{

    private $error = array();
    private $codename = 'd_visualize';
    private $route = 'extension/module/d_visualize';
    private $layout = 'd_visualize/template/layout/*.twig';
    private $partials = 'd_visualize/template/layout/*.twig';
    private $config_visualize;
    private $setting_active_template;

    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->config->load($this->codename);
        $this->config_visualize = $this->config->get('module_' . $this->codename . '_setting');
        $setting_visualize = $this->loadSetting();
        $this->setting_visualize = $setting_visualize['module_' . $this->codename . '_setting'];
//        if (!empty($this->cache->get('setting_active_template')) && !empty($this->cache->get('active_template')) && ($this->setting_visualize['active_template'] === $this->cache->get('active_template'))) {
//            $this->setting_active_template = $this->cache->get('setting_active_template');
//        } else {
//            $setting_active_template = $this->loadTemplateSetting($this->setting_visualize['active_template']);
//            $this->setting_active_template = $setting_active_template['setting'];
//            $this->cache->delete('setting_active_template');
//            $this->cache->delete('active_template');
//            $this->cache->set('setting_active_template', $this->setting_active_template);
//            $this->cache->set('active_template', $this->setting_visualize['active_template']);
//        }
        $setting_active_template = $this->loadTemplateSetting($this->setting_visualize['active_template']);
        $this->setting_active_template = $setting_active_template['setting'];
    }

    //todo refactor to model
    public function loadTemplateSetting($active = 'default')
    {
        foreach ($this->getAvailableTemplates() as $templatek => $v) {
            if ($active === $templatek) {
                return $v;
            }
        }
    }

    //todo refactor to model
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
            );
        }
        //if there will be changes from DB it will replace
//        $dbTemplates = $this->getTemplates();
//        foreach ($dbTemplates as $template) {
//            $result[$template['codename']] = $template;
//        }

        return $result;
    }

    //todo refactor to model
    public function getTemplates($data_filter = array())
    {
        $sql = 'SELECT * from ' . DB_PREFIX . 'vz_templates';
        return $this->db->query($sql)->rows;
    }

    //todo refactor to model
    public function loadSetting($suffix = '')
    {
        //check if exist config in db
        if (VERSION >= '3.0.0.0') {
            $this->load->model('setting/setting');
            $loadSetting = $this->model_setting_setting->getSetting('module_' . $this->codename, $this->store_id);
            if ($loadSetting) {
                $dbSetting = ($loadSetting) ? $loadSetting : array();
            } else {
                $dbSetting = array();
            }
            //inherit users data
            $setting = array();
            $setting = array_replace_recursive(array('module_' . $this->codename . '_setting' => $this->config_visualize), $dbSetting);
            return $setting;
        } else {
            return $this->config_visualize;
        }
        //inherit users data
    }

    public function controller_all_before_d_visualize(&$view, &$data)
    {
        foreach ($this->setting_active_template['scripts'] as $script) {
//            array_unshift($data['scripts'], $script);
        }
    }

    // event for overwrite styles for custom page
    // like for product/product need custom scripts and styles
    // here we add this from config our active template
    public function view_all_before_d_visualize(&$view, &$data)
    {
        FB::log($this->request->get['route']==$view);
        $view_route = isset($this->request->get['route']) ? $this->request->get['route'] : 'common/home';
        if ($this->request->get['route']==$view){
            FB::log($this->setting_active_template['page']['default']['layout']);
        }
        if (!empty($this->setting_active_template)) {
            //inject settings onto view
//            FB::log($this->setting_active_template['page']['default']['layout']);
            $data = array_merge_recursive($this->setting_active_template['page']['default']['layout'],$data);
            //if some one add to specifi page scripts need to add this to header
            if (in_array($view_route, array_keys($this->setting_active_template['page']))) {
                if (isset($this->setting_active_template['page'][$view_route]['layout'])) {
                    $data = array_replace_recursive($data, $this->setting_active_template['page'][$view_route]['layout']);
                    if (isset($this->setting_active_template['page'][$view_route]['scripts']) && !empty($this->setting_active_template['page'][$view_route]['scripts'])) {
                        if ($view == $view_route) {
                            $html_dom = new d_simple_html_dom();
                            $html_dom->load($data['header'], $lowercase = true, $stripRN = false, $defaultBRText = DEFAULT_BR_TEXT);
                            foreach ($this->setting_active_template['page'][$view_route]['scripts'] as $script) {
                                if (!$html_dom->find('head', 0)->find('script[src="' . $script . '"]')) {
                                    $html_dom->find('head > script', -1)->outertext .= '<script src="' . $script . '" type="text/javascript"></script>';
                                }
                            }
                            foreach ($this->setting_active_template['page'][$view_route]['styles'] as $style) {
                                if (!$html_dom->find('head', 0)->find('link[href="' . $style . '"]')) {
                                    $html_dom->find('\head > link', -1)->outertext .= '<link href="' . $style . '" rel="stylesheet" type="text/css"/>';
                                }
                            }
                            $data['header'] = (string)$html_dom;
                        }
                    }
                }
            }

            if (!empty($this->setting_active_template['debug']) && $this->setting_active_template['debug']) {
                $data = $this->validate_templates($data);
            }
        }
    }

    //todo refactor to model
    public function validate_templates($data)
    {
        foreach ($data['partial'] as $partial_k => $partial_v) {
            if (!is_file(DIR_TEMPLATE . $partial_v['template'])) {
                $data['partial'][$partial_k]['template'] = 'd_visualize/template/partial/d_empty.twig';
            } else {
                foreach ($data['partial'][$partial_k]['component'] as $component_k => $component_v) {
                    if (!is_file(DIR_TEMPLATE . $component_v['template'])) {
                        $data['partial'][$partial_k]['component'][$component_k]['template'] = 'd_visualize/template/partial/d_empty.twig';
                    }
                }
            }
        }
        foreach ($data['component'] as $partial_k => $partial_v) {
            if (!is_file(DIR_TEMPLATE . $partial_v['template'])) {
                $data['component'][$partial_k]['template'] = 'd_visualize/template/partial/d_empty.twig';
            }
        }
        return $data;
    }

    //todo refactor to model
    public function getAllUsages($page_array, $search = 'component', $result = array())
    {
        foreach ($page_array as $page_key => $page_value) {
            if ($page_key === $search) {
                $result[] = $page_value;
            }
            if (is_array($page_value)) {
                $result = $this->getAllUsages($page_value, $search, $result);
            }
        }
        return $result;
    }

    public function header_view_before_d_visualize(&$view, &$data, &$out)
    {
        //  pre style for lib like bootstrap etc for overwriting them by modules and theme
        $data['pre_styles'] = $this->setting_active_template['pre_styles'];
        foreach ($this->setting_active_template['post_styles'] as $style) {
            $this->document->addStyle($style);
        }
        //check components overloading
        foreach ($this->getAllUsages($this->setting_active_template['page'], 'component') as $component) {
            $key_of_component= array_keys($component)[0];
            $component_value = $component[$key_of_component];
            $cssFile = '';
            $templateFile = '';
            if (isset($component_value['stylesheet'])) {
                $cssFile = 'catalog/view/theme/' . $component_value['stylesheet'];
            }
            //check on skin overloading the component
            if (isset($component_value['skin']) && $this->setting_active_template['current_skin'] == $component_value['skin']) {
                //replace current template of component if skin change it
                $templateFile = str_replace($this->setting_visualize['active_template'], $component_value['skin'], $component_value['template']);
                if (file_exists(DIR_TEMPLATE . $templateFile)) {
                    $this->setting_active_template['page']['default']['layout']['partial'][$key_of_component]['component'][$key_of_component]['template'] = $templateFile;
                }
                $cssFile = str_replace($this->setting_visualize['active_template'], $component_value['skin'], 'catalog/view/theme/' . $component_value['stylesheet']);
            }
            //add css of component
            if (file_exists(DIR_APPLICATION . '../' . $cssFile)) {
                $this->document->addStyle($cssFile);
            }

        }
        //add core css files for prevent opencart standart styles and whatever
//old        $this->document->addStyle('catalog/view/theme/' . $this->codename . '/stylesheet/dist/core.css');
        $this->document->addStyle('catalog/view/theme/' . $this->codename . '/stylesheet/dist/vz-core/core.css');
        //add core js files for standard page behaviour, like  helpers
        $this->document->addScript('catalog/view/theme/' . $this->codename . '/javascript/dist/vz-core/core.js');

        //add current template stylesheet
        $template_style = 'catalog/view/theme/' . $this->codename . '/stylesheet/dist/' . $this->setting_visualize['active_template'] . '/' . $this->setting_visualize['active_template'] . '.css';
        if (isset($this->setting_active_template['current_skin'])) {
            $template_style = 'catalog/view/theme/' . $this->codename . '/stylesheet/dist/' . $this->setting_visualize['active_template'] . '/' . $this->setting_active_template['current_skin'] . '.css';
        }
        if (file_exists(DIR_APPLICATION . '../' . $template_style)) {
            $this->document->addStyle($template_style);
        }
        //add current template scripts
        $template_script = 'catalog/view/theme/' . $this->codename . '/javascript/dist/' . $this->setting_visualize['active_template'] . '/' . $this->setting_visualize['active_template'] . '.js';
        if (file_exists(DIR_APPLICATION . '../' . $template_script)) {
            $this->document->addScript($template_script);
        }
        $data['post_styles'] = $this->document->getStyles();
        $data['scripts'] = $this->document->getScripts();
        $data['pre_scripts'] = array();
        foreach ($this->setting_active_template['pre_scripts'] as $script) {
            array_unshift($data['pre_scripts'], $script);//default place for scripts our will be latest
        }
        if (!empty($this->setting_active_template['post_scripts']))
            foreach ($this->setting_active_template['post_scripts'] as $script) {
                array_unshift($data['scripts'], $script);//default place for scripts our will be latest
            }
        $data['custom_styles'] = $this->setting_active_template['custom_styles'];

    }
    /*
        public function footer(&$view, &$data, &$output)
        {
        }

        public function view_product_category_before(&$view, &$data, &$output)
        {

        }

        public function view_product_product_before(&$view, &$data, &$output)
        {
            if (isset($this->request->get['product_id'])) {
                $product_id = (int)$this->request->get['product_id'];
            } else {
                $product_id = 0;
            }
            $this->load->model('catalog/product');
            $product_info = $this->model_catalog_product->getProduct($product_id);
            $this->load->model('tool/image');
            $results = $this->model_catalog_product->getProductImages($product_id);

            if ($this->customer->isLogged() || !$this->config->get('config_customer_price')) {
                if ($product_info['price'] > 0) {
                    $data['price'] = $this->currency->format($this->tax->calculate($product_info['price'], $product_info['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
                } else {
                    $data['price'] = 'Free';
                }
            } else {
                $data['price'] = false;
            }

            if (!empty($results)) {
                if (VERSION >= '3.0.0.0') {
                    $data['thumb'] = $this->model_tool_image->resize($results[0]['image'], $this->config->get('theme_' . $this->config->get('config_theme') . '_image_thumb_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_thumb_height'));
                    $data['popup'] = $this->model_tool_image->resize($results[0]['image'], $this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_height'));
                } else if (VERSION >= '2.2.0.0') {
                    $data['thumb'] = $this->model_tool_image->resize($results[0]['image'], $this->config->get($this->config->get('config_theme') . '_image_thumb_width'), $this->config->get($this->config->get('config_theme') . '_image_thumb_height'));
                    $data['popup'] = $this->model_tool_image->resize($results[0]['image'], $this->config->get($this->config->get('config_theme') . '_image_popup_width'), $this->config->get($this->config->get('config_theme') . '_image_popup_height'));
                } else {
                    $data['thumb'] = $this->model_tool_image->resize($results[0]['image'], $this->config->get('config_image_thumb_width'), $this->config->get('config_image_thumb_height'));
                    $data['popup'] = $this->model_tool_image->resize($results[0]['image'], $this->config->get('config_image_popup_width'), $this->config->get('config_image_popup_height'));
                }

                if (empty($data['thumb'])) {
                    $data['thumb'] = '';
                }
                if (empty($data['popup'])) {
                    $data['popup'] = '';
                }
                unset($results[0]);
                $data['images'] = array();
                foreach ($results as $result) {
                    if (VERSION >= '3.0.0.0') {
                        $data['images'][] = array(
                            'popup' => $this->model_tool_image->resize($result['image'], $this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_popup_height')),
                            'thumb' => $this->model_tool_image->resize($result['image'], $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_additional_height'))
                        );
                    } else if (VERSION >= '2.2.0.0') {
                        $data['images'][] = array(
                            'popup' => $this->model_tool_image->resize($result['image'], $this->config->get($this->config->get('config_theme') . '_image_popup_width'), $this->config->get($this->config->get('config_theme') . '_image_popup_height')),
                            'thumb' => $this->model_tool_image->resize($result['image'], $this->config->get($this->config->get('config_theme') . '_image_additional_width'), $this->config->get($this->config->get('config_theme') . '_image_additional_height'))
                        );
                    } else {
                        $data['images'][] = array(
                            'popup' => $this->model_tool_image->resize($result['image'], $this->config->get('config_image_popup_width'), $this->config->get('config__image_popup_height')),
                            'thumb' => $this->model_tool_image->resize($result['image'], $this->config->get('config_image_additional_width'), $this->config->get('config__image_additional_height'))
                        );
                    }
                }
            }
        }

        public function view_common_header_before(&$view, &$data, &$output)
        {
            $data['mobile'] = $this->load->controller('extension/d_visualize/mobile');
        }

        public function get_countries_list_before(&$view, &$data, &$output)
        {
            $this->load->model('localisation/country');
            $data['countries'] = $this->model_localisation_country->getCountries();
        }

        public function add_checkout_cart_heading_before(&$view, &$data)
        {
            if (isset($this->request->get['route']) && $this->request->get['route'] == 'checkout/cart') {
                $this->load->language('checkout/cart');
                $data['heading_title'] = $this->language->get('heading_title');
            }
        }

        public function add_checkout_checkout_heading_before(&$view, &$data)
        {
            if (isset($this->request->get['route']) && $this->request->get['route'] == 'checkout/checkout') {
                $this->load->language('checkout/checkout');
                $data['heading_title'] = $this->language->get('heading_title');
            }
        }
        */
}