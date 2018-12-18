<?php


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
        $css_path = $this->model_extension_d_visualize_template->compileStaticCSS($this->request->post['template_id'], $this->request->post['skin'], $this->request->post['config']);
        $this->model_extension_d_visualize_template->updateStyleCSSPath(array('css_path' => $css_path,
                                                                              'template_id' => $saved_template['template_codename'],
                                                                              'skin' => $saved_template['skin']));
        $this->response->setOutput(json_encode(array('success' => $this->language->get('text_success_template'), 'saved_template' => $saved_template)));
    }



}