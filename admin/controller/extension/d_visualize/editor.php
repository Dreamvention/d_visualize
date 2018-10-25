<?php

use Leafo\ScssPhp\Compiler;

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
        $data['iframe']['src'] = $this->session->data['iframe_url'];
        $data['iframe']['page'] = 'common/home';
        $this->response->setOutput(json_encode($data));
    }

    public function save_iframe_url()
    {
        $this->session->data['iframe_url'] = json_decode(html_entity_decode($this->request->post['last_url']));
        $json['success'] = $this->session->data['iframe_url'];
        $this->response->setOutput(json_encode($json));
    }

    public function compile_scss()
    {
        $colors = DIR_CATALOG . 'view/theme/d_visualize/stylesheet/template/default/skin/opencart/base/_colors.scss';
        if (@is_file($colors)) {
            echo @file_get_contents($colors);
        }else{
            echo $colors;
        }
        exit;
        include_once(DIR_SYSTEM . 'library/' . $this->codename . '/scssphp/scss.inc.php');
        $scss = new Compiler();
        $scss->setVariables(array(
            'color' => 'blue',
        ));
        echo $scss->compile('
        div { color: lighten($color, 20%); }
');

    }
}