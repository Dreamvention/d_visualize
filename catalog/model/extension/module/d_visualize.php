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
        $loadSetting = $this->model_setting_setting->getSetting($this->codename, $this->store_id);
        if ($loadSetting) {
            $dbSetting = ($loadSetting) ? $loadSetting : array();
        } else {
            $dbSetting = array();
        }
        $setting = array_replace_recursive(array($this->codename . '_setting' => $this->config_visualize), $dbSetting);

        return $setting;
    }

    public function loadCustomStyle()
    {
        $settting= $this->model_setting_setting->getSetting('custom_style_'.$this->codename, $this->store_id);
        if (!empty($settting)){
            return $settting['custom_style_'.$this->codename];
        }
        return array();
    }

}
