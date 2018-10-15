<?php

class ControllerExtensionDVisualizeEditor extends Controller
{
    private $codename = 'd_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
    }

    public function index()
    {
        $data['iframe']['src'] = HTTPS_CATALOG;
        $this->response->setOutput(json_encode($data));
    }
}