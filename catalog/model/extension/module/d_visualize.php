<?php

class ModelExtensionModuleDVisualize extends Model
{
    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->codename = 'd_visualize';
        $this->store_id = 0;
        $this->load->model('setting/setting');
    }

    public function loadSetting($suffix = '')
    {
        //check if exist config in db
        $loadSetting = $this->model_setting_setting->getSetting('module_' . $this->codename, $this->store_id);
        if ($loadSetting) {
            $dbSetting = ($loadSetting) ? $loadSetting : array();
        } else {
            $dbSetting = array();
        }
        //inherit users data
        $setting = array();
        $setting = array_replace_recursive(array('module_' . $this->codename . '_setting' => $this->config_visualize), $dbSetting);

        return $setting;
    }

}
