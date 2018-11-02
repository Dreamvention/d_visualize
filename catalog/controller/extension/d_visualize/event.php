<?php

use Leafo\ScssPhp\Compiler;

class ControllerExtensionDVisualizeEvent extends Controller
{

    private $error = array();
    private $codename = 'd_visualize';
    private $route = 'extension/module/d_visualize';
    private $setting_active_template;
    private $pageScripts;
    private $pageStyles;

    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->load->model($this->route);
        $this->load->model('extension/' . $this->codename . '/template');
        $this->load->model('extension/' . $this->codename . '/extension_helper');
        $setting_visualize = $this->{'model_extension_module_' . $this->codename}->loadSetting();
        $this->setting_visualize = $setting_visualize['module_' . $this->codename . '_setting'];
        $this->status_visualize = isset($setting_visualize['module_' . $this->codename . '_status']) ? $setting_visualize['module_' . $this->codename . '_status'] : false;
        $this->model = $this->{'model_extension_module_' . $this->codename};
        $this->model_template = $this->{'model_extension_' . $this->codename . '_template'};
        $this->model_helper = $this->{'model_extension_' . $this->codename . '_extension_helper'};
        $this->setting_active_template = $this->model_template->loadTemplateSetting($this->setting_visualize['active_template']);
        $this->pageScripts = array();
        $this->pageStyles = array();
        if (VERSION >= '2.2.0.0') {
            $this->user = new Cart\User($this->registry);
        } else {
            $this->user = new User($this->registry);
        }
        //this code generate a cache
        //        if (!empty($this->cache->get('setting_active_template')) && !empty($this->cache->get('active_template')) && ($this->setting_visualize['active_template'] === $this->cache->get('active_template'))) {
//            $this->setting_active_template = $this->cache->get('setting_active_template');
//        } else {
//            $setting_active_template = $this->loadTemplateSetting($this->setting_visualize['active_template']);
//            $this->setting_active_template = $setting_active_template['setting'];
//            $this->cache->delete('setting_active_template');
//            $this->cache->delete('active_template');
//            $this->cache->set('setting_active_template', $this->setting_active_template);
//            $this->cache->set('active_template', $this->setting_visualize['active_template']);
//        }->

    }

    /**
     * Event for overwrite styles for custom page
     * like for product/product need custom scripts and styles
     * here we add this from config our active_tab template
     * @void
     */
    public function view_all_before_d_visualize(&$view, &$data)
    {
        $view_route = isset($this->request->get['route']) ? $this->request->get['route'] : 'common/home';
        if (!empty($this->setting_active_template) && $this->status_visualize) {
            //inject dat from setting on the view
            $data = array_merge_recursive($this->setting_active_template['page']['default']['layout'], $data);
            //if some one add to specific page scripts need to add this to header
            foreach (array_keys($this->setting_active_template['page']) as $key) {
                if (preg_match('/^' . str_replace(array('\*', '\?'), array('.*', '.'), preg_quote($key, '/')) . '/', $view)) {
                    if (isset($this->setting_active_template['page'][$key]['layout'])) {
                        //inject data from setting on the view
                        $data = array_replace_recursive($data, $this->setting_active_template['page'][$key]['layout']);
                        if (isset($this->setting_active_template['page'][$view_route]['scripts'])
                            && !empty($this->setting_active_template['page'][$view_route]['scripts'])) {
                            foreach ($this->setting_active_template['page'][$view_route]['scripts'] as $script) {
                                $this->pageScripts[] = $script;
                            }
                        }
                        if (isset($this->setting_active_template['page'][$view_route]['styles'])
                            && !empty($this->setting_active_template['page'][$view_route]['styles'])) {
                            foreach ($this->setting_active_template['page'][$view_route]['styles'] as $styles) {
                                $this->pageStyles[] = $styles;
                            }
                        }
                    }
                }
            }
            if (!empty($this->setting_active_template['debug']) && $this->setting_active_template['debug']) {

            }
            // if last view is loaded we add scripts and Style from our d_visualize
            if ($view == $view_route) {
                $data['page_route'] = $view_route;
                if (isset($data['header'])) {
                    $data['header'] = $this->model_helper->addDocumentPageData(
                        array('scripts' => $this->pageScripts,
                            'styles' => $this->pageStyles),
                        $data['header']);
                }
            }
            if ($this->user->isLogged()) {
                $data['admin'] = true;
                $data['site_url'] = HTTPS_SERVER;
            }
        }
    }

    /**
     * Event for adding scripts and styles preseted in skin
     * @void
     */
    public function header_view_before_d_visualize(&$view, &$data, &$out)
    {
        //  pre style for lib like bootstrap etc for overwriting them by modules and theme
        $data['pre_styles'] = $this->setting_active_template['pre_styles'];
        foreach ($this->setting_active_template['post_styles'] as $style) {
            $this->document->addStyle($style);
        }

        //add core css files for prevent opencart standart styles and whatever
        $this->document->addStyle('catalog/view/theme/' . $this->codename . '/stylesheet/dist/vz-core/core.css');

        //components stylesheet
        foreach ($this->model_template->getAllUsages($this->setting_active_template['page'], 'stylesheet') as $style) {
            if (file_exists(DIR_APPLICATION . 'view/theme/' . $style)) {
                $this->document->addStyle('catalog/view/theme/' . $style);
            }
        }
        //add current template stylesheet
        $template_style = 'catalog/view/theme/' . $this->codename . '/stylesheet/dist/' . $this->setting_visualize['active_template'] . '/' . $this->setting_visualize['active_template'] . '.css';
        if (isset($this->setting_active_template['active_skin'])) {
            $template_style = 'catalog/view/theme/' . $this->codename . '/stylesheet/dist/' . $this->setting_visualize['active_template'] . '/' . $this->setting_active_template['active_skin'] . '.css';
        }
        if (file_exists(DIR_APPLICATION . '../' . $template_style)) {
            $this->document->addStyle($template_style);
        }

        //add core js files for standard page behaviour, like  helpers
        $this->document->addScript('catalog/view/theme/' . $this->codename . '/javascript/dist/vz-core/core.js');

        //add current template scripts
        $template_script = 'catalog/view/theme/' . $this->codename . '/javascript/dist/' . $this->setting_visualize['active_template'] . '/' . $this->setting_visualize['active_template'] . '.js';
        if (file_exists(DIR_APPLICATION . '../' . $template_script)) {
            $this->document->addScript($template_script);
        }

        //take a screenshot if needed
        if (isset($this->request->get['screnshot'])) {
            $this->document->addScript('catalog/view/javascript/' . $this->codename . '/lib/html2canvas/html2canvas.js');
            $this->document->addScript('catalog/view/theme/' . $this->codename . '/javascript/vz-core/tools/screnshot.js');
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
        $data['custom_styles'] = ['custom_styles'];

    }

    public function saveScrenshot()
    {
        $json = array();
        $uploads_dir = DIR_IMAGE . 'catalog/' . $this->codename . '/template/' . $this->setting_active_template['codename'];
        $data = $_REQUEST['base64data'];
        $image = explode('base64', $data);
        if (isset($this->request->post['type'])) {
            file_put_contents($uploads_dir . '_' . $this->request->post['type'] . '.png', base64_decode($image[1]));
        }
        $json = $uploads_dir;
        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($json));
    }

    public function takeScrennshoot()
    {
        $ch = curl_init();
        // set url
        curl_setopt($ch, CURLOPT_URL, HTTPS_CATALOG . '?screnshot');
        // close curl resource to free up system resources
        curl_close($ch);
    }

    public function get_css()
    {
        $skin_path = DIR_APPLICATION . 'view/theme/' . $this->codename . '/stylesheet/template/' . $this->request->post['template_id'] . '/skin/' . $this->request->post['skin'] . '/';
        if (@is_file($skin_path . $this->request->post['skin'] . '.scss')) {
            include_once(DIR_SYSTEM . 'library/' . $this->codename . '/scssphp/scss.inc.php');
            $scss = new Compiler();
            $scss->setImportPaths($skin_path);
            $variables = array();
            foreach ($this->request->post['variables'] as $holder => $holder_vars) {
               if (strripos($holder,'settings')===0){
                   continue;
               }
                if (is_array($holder_vars)) {
                    //not so much var so don't worry it's fast
                    foreach ($holder_vars as $var => $value) {
                        if (is_array($value)){
                            $value='("'.implode($value,'","').'")';
                        }
                        $variables[$holder . '-' . $var] = $value;
                    }
                } else {
                    $variables[$holder] = $holder_vars;
                }
            }
            $scss->setVariables($variables);
            $compiled_css = $scss->compile(str_replace('@import "config";','',@file_get_contents($skin_path . $this->request->post['skin'] . '.scss')));
            $this->response->addHeader('Content-Type: text/css');
            $this->response->setOutput($compiled_css);
//            @file_put_contents($skin_path . $this->request->post['skin'] . '_custom.css', $compiled_css);
        } else {
            $this->response->setOutput('no files found');
        }
    }
}