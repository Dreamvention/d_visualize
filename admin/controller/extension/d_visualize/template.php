<?php

use Leafo\ScssPhp\Compiler;

class ControllerExtensionDVisualizeTemplate extends Controller
{
    private $codename = 'd_visualize';
    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->load->model('extension/' . $this->codename . '/template');
    }

    public function index()
    {
        return $this->all();
    }
    public function all()
    {
        $this->response->setOutput(json_encode($this->model_extension_d_visualize_template->getAvailableTemplates()));
    }
    public function components()
    {
        $this->response->setOutput(json_encode(array('components'=>$this->model_extension_d_visualize_template->getAvailableComponents())));
    }
    public function save()
    {
        $template = json_decode(html_entity_decode($this->request->post['template'], ENT_QUOTES, 'UTF-8'), true);
        $saved_template = $this->model_extension_d_visualize_template->saveTemplate(
            array(
                'template_codename' => json_decode(html_entity_decode($this->request->post['template_id'])),
                'template'          => $template,
                'store_id'          => $this->store_id)
        );
        $this->response->setOutput(json_encode(array('success' => $this->language->get('text_success_template'), 'template' => $saved_template)));
    }
    public function save_custom()
    {
        foreach ($this->request->post as $key => $value) {
            $this->request->post[$key] = json_decode(html_entity_decode($value), true);
        }
        $saved_template = $this->model_extension_d_visualize_template->saveCustomStyles($this->request->post);
        //create styles css for optimizations
        $css_path = $this->compileStaticCSS($this->request->post['template_id'], $this->request->post['skin'], $this->request->post['config']);
        $this->model_extension_d_visualize_template->updateStyleCSSPath(array('css_path' => $css_path,
                                                                              'template_id' => $saved_template['template_codename'],
                                                                              'skin' => $saved_template['skin']));
        $this->response->setOutput(json_encode(array('success' => $this->language->get('text_success_template'), 'saved_template' => $saved_template)));
    }

    public function compileStaticCSS($template_id, $skin, $cssConfig)
    {
        $skin_path = DIR_CATALOG . 'view/theme/' . $this->codename . '/stylesheet/template/' . $template_id . '/skin/' . $skin . '/';
        if (@is_file($skin_path . $skin . '.scss')) {
            include_once(DIR_SYSTEM . 'library/' . $this->codename . '/scssphp/scss.inc.php');
            $scss = new Compiler();
            $scss->setImportPaths($skin_path);
            $variables = array();
            foreach ($cssConfig as $holder => $holder_vars) {
                if (strripos($holder, 'settings') === 0) {
                    continue;
                }
                if (is_array($holder_vars)) {
                    //not so much var so don't worry it's fast
                    foreach ($holder_vars as $var => $value) {
                        if (is_array($value)) {
                            $value = '("' . implode($value, '","') . '")';
                        }
                        $variables[$holder . '-' . $var] = $value;
                    }
                } else {
                    $variables[$holder] = $holder_vars;
                }
            }
            $scss->setVariables($variables);
            $compiled_css = $scss->compile(str_replace('@import "config";', '', @file_get_contents($skin_path . $skin . '.scss')));
            @file_put_contents(DIR_CATALOG . 'view/theme/' . $this->codename . '/stylesheet/dist/' . $template_id . '/' . $skin . '_custom.css', $compiled_css);
            return 'catalog/view/theme/' . $this->codename . '/stylesheet/dist/' . $template_id . '/' . $skin . '_custom.css';
        } else {
            throw new Exception('Can not find scss for compilation');
        }
    }


}