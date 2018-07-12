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
    public function view_product_category_text_wishlist_before(&$view, &$data, &$output)
    {
        // todo rewrite
//        if (VERSION < '2.1.0.0') {
//            if (isset($this->session->data['wishlist']) && in_array($product_id, $this->session->data['wishlist'])) {
//                return true;
//            } else {
//                return false;
//            }
//        } else {
//            if ($this->customer->isLogged()) {
//                $this->load->model('account/wishlist');
//                $results = $this->model_account_wishlist->getWishlist();
//                $products = array_filter($results, function ($product) use ($product_id) {
//                    return $product['product_id'] == $product_id;
//                });
//                if (!empty($products)) {
//                    return true;
//                } else {
//                    return false;
//                }
//            } else {
//                if (isset($this->session->data['wishlist']) && in_array($product_id, $this->session->data['wishlist'])) {
//                    return true;
//                } else {
//                    return false;
//                }
//            }
//        }

    }

    public function view_product_category_before(&$view, &$data, &$output)
    {
        // Wishlist
        $this->load->language('common/header');

        if ($this->customer->isLogged()) {
            $this->load->model('account/wishlist');
            $data['text_wishlist'] = sprintf($this->language->get('text_wishlist'), $this->model_account_wishlist->getTotalWishlist());
        } else {
            $data['text_wishlist'] = sprintf($this->language->get('text_wishlist'), (isset($this->session->data['wishlist']) ? count($this->session->data['wishlist']) : 0));
        }
        $data['wishlist'] = $this->url->link('account/wishlist', '', true);

    }
}