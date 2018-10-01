<?php

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
     * here we add this from config our active template
     * @void
     */
    public function view_all_before_d_visualize(&$view, &$data)
    {
        $view_route = isset($this->request->get['route']) ? $this->request->get['route'] : 'common/home';
        if (!empty($this->setting_active_template) && $this->status_visualize) {
            //inject dat from setting on the view
            $data = array_merge_recursive($this->setting_active_template['page']['default']['layout'], $data);
            //if some one add to specific page scripts need to add this to header
            if (in_array($view_route, array_keys($this->setting_active_template['page']))) {
                if (isset($this->setting_active_template['page'][$view_route]['layout'])) {
                    //inject dat from setting on the view
                    $data = array_replace_recursive($data, $this->setting_active_template['page'][$view_route]['layout']);
                    //add styles and scripts on the header
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
            if (!empty($this->setting_active_template['debug']) && $this->setting_active_template['debug']) {
                $data = $this->model_template->validate_templates($data);
            }
            // if last view is loaded we add scripts and Style from our d_visualize
            if ($view == $view_route) {
                if (isset($data['header'])){

                    $data['header'] = $this->model_helper->addDocumentPageData(
                    array('scripts' => $this->pageScripts,
                          'styles'  => $this->pageStyles),
                    $data['header']);
                }
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

    public function controller_all_before_d_visualize(&$view, &$data)
    {
        //todo remove unnesesary event
    }
}