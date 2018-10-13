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
    }
    public function all()
    {
        $this->response->setOutput(json_encode($this->model_extension_d_visualize_template->getAvailableTemplates()));
    }


}