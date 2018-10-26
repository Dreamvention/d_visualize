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

    public function test_compile_scss()
    {
        $colors = DIR_CATALOG . 'view/theme/d_visualize/stylesheet/template/default/skin/opencart/base/variables/_colors.scss';
        $skin = DIR_CATALOG . 'view/theme/d_visualize/stylesheet/template/default/skin/opencart/opencart.scss';
        if (@is_file($colors) && @is_file($skin)) {
            $re = '/\$([^:$})\s]+):([^\s]+);/';
            preg_match_all($re, @file_get_contents($colors), $matches, PREG_SET_ORDER, 0);
            $variables_color = array();
            foreach ($matches as $match) {
                /*VAR name*/                 /*VAR value*/
                $variables_color[$match[1]] = $match[2];
            }
            include_once(DIR_SYSTEM . 'library/' . $this->codename . '/scssphp/scss.inc.php');
            $scss = new Compiler();
            $scss->setImportPaths(DIR_CATALOG . 'view/theme/d_visualize/stylesheet/template/default/skin/opencart/');
            $variables_color['color-body'] = 'blue';
            $scss->setVariables($variables_color);
            $compiled_css = $scss->compile(@file_get_contents($skin));
            if (false) {
                //todo make a call to 3-rd party server to compile this css.
//                require_once DIR_SYSTEM . 'library/' . $this->codename . '/autoprefixer/autoload.php';
//                $autoprefixer = new Autoprefixer(['ff > 2', '> 2%', 'ie 8']);
//                $compiled_css = $autoprefixer->compile($compiled_css);
            }
            echo "<pre>";
            print_r($compiled_css);
            echo "</pre>";
            @file_put_contents(DIR_CATALOG . 'view/theme/d_visualize/stylesheet/dist/default/opencart_custom.css', $compiled_css);

        } else {
            echo 'no files found';
        }
    }

}