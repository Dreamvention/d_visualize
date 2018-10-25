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
        $saved_template = $this->model_extension_d_visualize_template->saveTemplate(
            array(
                'template_codename' => json_decode(html_entity_decode($this->request->post['template_id'])),
                'template'          => json_decode(html_entity_decode($this->request->post['template'], ENT_QUOTES, 'UTF-8'), true),
                'store_id'          => $this->store_id)
        );
        $this->response->setOutput(json_encode(array('success' => $this->language->get('text_success_template'), 'template' => $saved_template)));
    }
//    public function save_component()
//    {
//        $saved_template = $this->{$this->model_template}->saveTemplate(
//            array(
//                'template_codename' => $this->request->post['template_id'],
//                'template'          => json_decode(html_entity_decode($this->request->post['template'], ENT_QUOTES, 'UTF-8'), true),
//                'store_id'          => $this->store_id)
//        );
//        $this->response->setOutput(json_encode(array('success' => $this->language->get('text_success_template'), 'template' => $saved_template)));
//    }

}