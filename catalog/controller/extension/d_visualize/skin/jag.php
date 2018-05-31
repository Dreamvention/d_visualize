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

    public function view_product_category_before(&$view, &$data, &$output)
    {
        /*$this->load->model( 'catalog/product' );
        $this->load->model( 'tool/image' );
        foreach ( $data['products'] as $key => $product ) {
            $attributes = $this->model_catalog_product->getProductAttributes( $product['product_id'] );

            if ( ! empty( $attributes ) ) {
                $attribute                                     = array_filter( $attributes, function ( $v, $k ) {
                    return $k == 'name' || $v == 'Short Description';
                }, ARRAY_FILTER_USE_BOTH );
                $data['products'][ $key ]['short_description'] = html_entity_decode( $attribute[0]['attribute'][0]['text'], ENT_QUOTES, 'UTF-8' );
            }
            if ( isset( $this->request->get['route'] ) && $this->request->get['route'] == 'common/home' ) {
                $image                             = str_replace( '-' . $this->config->get( $this->config->get( 'config_theme' ) . '_image_thumb_width' ) . 'x' . $this->config->get( $this->config->get( 'config_theme' ) . '_image_thumb_height' ), '', str_replace( HTTPS_SERVER . 'image/cache/', '', $product['thumb'] ) );
                $data['products'][ $key ]['thumb'] = $this->model_tool_image->resize( $image, $this->config->get( $this->config->get( 'config_theme' ) . '_image_product_width' ), $this->config->get( $this->config->get( 'config_theme' ) . '_image_product_height' ) );
            }
        }*/
    }


}