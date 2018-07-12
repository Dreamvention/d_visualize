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
                if (isset($this->config_skin['page'][$view]['scripts']) && !empty($this->config_skin['page'][$view]['scripts'])) {
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

}