<?php

class ControllerExtensionDVisualizeEvent extends Controller
{

    private $error = array();
    private $codename = 'd_visualize';
    private $route = 'extension/module/d_visualize';
    private $layout = 'd_visualize/template/layout/*.twig';
    private $partials = 'd_visualize/template/layout/*.twig';
    private $config_visualize;
    private $config_skin;

    public function __construct($registry)
    {
        parent::__construct($registry);

        $this->config->load($this->codename . '/' . $this->codename);
        $this->config_visualize = $this->config->get($this->codename);

        $this->config->load($this->codename . '/skin/' . $this->config_visualize['active_skin']);
        $this->config_skin = $this->config->get($this->codename . '_skin_' . $this->config_visualize['active_skin']);

    }

    public function controller_all_before_d_visualize(&$view, &$data)
    {
        foreach ($this->config_skin['scripts'] as $script) {
//            array_unshift($data['scripts'], $script);
        }
    }


    // event for overwrite styles for custom page
    // like for product/product need custom scripts and styles
    // here we add this from config our active skin
    public function view_all_before_d_visualize(&$view, &$data)
    {
        $data += $this->config_skin['page']['default']['layout'];
        if (in_array($view, array_keys($this->config_skin['page']))) {
            if (isset($this->config_skin['page'][$view]['layout'])) {
                $data = array_replace_recursive($data, $this->config_skin['page'][$view]['layout']);
                if (isset($this->config_skin['page'][$view]['cripts']) && !empty($this->config_skin['page'][$view]['scripts'])) {
                    $html_dom = new d_simple_html_dom();
                    $html_dom->load($data['header'], $lowercase = true, $stripRN = false, $defaultBRText = DEFAULT_BR_TEXT);
                    foreach ($this->config_skin['page'][$view]['scripts'] as $script) {
                        if (!$html_dom->find('head', 0)->find('script[src="' . $script . '"]')) {
                            $html_dom->find('head > script', -1)->outertext .= '<script src="' . $script . '" type="text/javascript"></script>';
                        }
                    }
                    foreach ($this->config_skin['page'][$view]['styles'] as $style) {
                        if (!$html_dom->find('head', 0)->find('link[href="' . $style . '"]')) {
                            $html_dom->find('head > link', -1)->outertext .= '<link href="' . $style . '" rel="stylesheet" type="text/css"></script>';
                        }
                    }
                    $data['header'] = (string)$html_dom;
                }
            }
        }
    }

    public function header_view_before_d_visualize(&$view, &$data, &$out)
    {
        //pre style for lib like bootstrap etc for overwriting them by modules and theme
        $data['pre_styles'] = $this->config_skin['pre_styles'];
        // post style for overwriting styles

        foreach ($this->config_skin['post_styles'] as $style) {
            $this->document->addStyle($style);
        }
        $this->document->addStyle('catalog/view/theme/' . $this->codename . '/stylesheet/skin/' . $this->config_visualize['active_skin'] . '/stylesheet.css');
        $data['post_styles'] = $this->document->getStyles();


        $data['pre_scripts'] = array();
        foreach ($this->config_skin['pre_scripts'] as $script) {
            array_unshift($data['pre_scripts'], $script);//default place for scripts our will be latest
        }
        foreach ($this->config_skin['post_scripts'] as $script) {
            array_unshift($data['scripts'], $script);//default place for scripts our will be latest
        }
        $data['custom_styles'] = $this->config_skin['custom_styles'];

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