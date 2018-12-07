<?php
/*
*   location: admin/model
*/

class ModelExtensionModuleDVisualize extends Model
{
    private $codename = 'd_visualize';
    private $route = 'extension/module/d_visualize';
    private $store_id = 0;

    public function __construct($registry)
    {
        parent::__construct($registry);
        $this->store_id = (isset($this->request->get['store_id'])) ? $this->request->get['store_id'] : 0;
        $this->load->model('extension/d_opencart_patch/setting');
        $this->config->load($this->codename);
        $this->config_visualize = $this->config->get('module_' . $this->codename . '_setting');
        $this->extension = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $this->codename . '.json'), true);
        $this->d_event_manager = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_event_manager.json'));
    }

    public function checkInstallModule()
    {
        $this->load->model('extension/d_opencart_patch/extension');
        if (!$this->model_extension_d_opencart_patch_extension->isInstalled($this->codename)) {
            return false;
        }
        $this->load->model('setting/setting');
        $setting_module = $this->model_setting_setting->getSetting($this->codename);
        if (!$setting_module) {
            return false;
        }
        return true;
    }

    /**
     * Install config Visualize
     * @param $config_name
     * @throws Exception
     */
    public function installConfig($config_name = false)
    {
        $this->load->model('extension/d_opencart_patch/extension');
        $this->load->model('extension/d_opencart_patch/setting');
        $this->load->model('extension/d_opencart_patch/user');
        if (!$this->model_extension_d_opencart_patch_extension->isInstalled($this->codename)) {
            $this->model_extension_d_opencart_patch_extension->install('module', $this->codename);
            $this->load->controller('extension/module/' . $this->codename . '/install');
        }
        $this->load->model('setting/setting');
        $setting_module = $this->model_extension_d_opencart_patch_setting->getSetting($this->codename);
        if (!empty($setting_module[$this->codename . '_setting'])) {
            $this->load->controller('extension/' . $this->codename . '/uninstallEvents');
            $this->load->controller('extension/' . $this->codename . '/installEvents');
            $setting_module[$this->codename . '_status'] = 1;
            $this->model_extension_d_opencart_patch_setting->editSetting($this->codename, $setting_module);
        } else {
            $this->load->config($this->codename);
            $setting = $this->config->get($this->codename . '_setting');
            $this->load->controller('extension/' . $this->codename . '/installTheme');
            $this->model_extension_d_opencart_patch_setting->editSetting($this->codename, array(
                $this->codename . '_setting' => $setting,
                $this->codename . '_status'  => 1
            ));
        }
    }

    public function getVueTemplates()
    {

        $result = array();
        $files = glob(DIR_TEMPLATE . 'extension/' . $this->codename . '/**/*.vue', GLOB_BRACE);
        foreach ($files as $key => $file) {
            $result[] = str_replace(array(DIR_TEMPLATE, '.vue'), '', $file);
        }
        $files = glob(DIR_TEMPLATE . 'extension/' . $this->codename . '/**/**/*.vue', GLOB_BRACE);
        foreach ($files as $key => $file) {
            $result[] = str_replace(array(DIR_TEMPLATE, '.vue'), '', $file);
        }
        $files = glob(DIR_TEMPLATE . 'extension/' . $this->codename . '/**/**/**/*.vue', GLOB_BRACE);
        foreach ($files as $key => $file) {
            $result[] = str_replace(array(DIR_TEMPLATE, '.vue'), '', $file);
        }
        $files = glob(DIR_TEMPLATE . 'extension/' . $this->codename . '/*.vue');
        foreach ($files as $key => $file) {
            $result[] = str_replace(array(DIR_TEMPLATE, '.vue'), '', $file);
        }
        return $result;
    }

    public function getVueScripts()
    {
        $results = array();
        $results[] = 'view/javascript/' . $this->codename . '/dist/' . $this->codename . '.js';
        return $results;
    }

    public function loadSetting($suffix = '')
    {
        //check if exist config in db
        $loadSetting = $this->model_extension_d_opencart_patch_setting->getSetting('module_' . $this->codename, $this->store_id);

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
    public function loadCustomStyle()
    {
        $settting= $this->model_setting_setting->getSetting('custom_style_'.$this->codename, $this->store_id);
        if (!empty($settting)){
            return $settting['custom_style_'.$this->codename];
        }
        return array();
    }

    public function installDataBase()
    {
        $sql = "CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "vz_templates (
            template_id INT(11) NOT NULL AUTO_INCREMENT,
            store_id INT(11) NOT NULL,
            codename VARCHAR(255) NOT NULL,
            source VARCHAR(55) DEFAULT NULL,
            title VARCHAR(255) DEFAULT NULL,
            description VARCHAR(255) DEFAULT NULL,
            setting TEXT NOT NULL,
            history_id INT(11) NOT NULL,
            img VARCHAR(255) DEFAULT NULL,
            date_created DATETIME NOT NULL,
            date_modified DATETIME NOT NULL,
            PRIMARY KEY (template_id)
        )
        COLLATE='utf8_general_ci'
        ENGINE=MyISAM;";
        $this->db->query($sql);
        $sql = "CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "vz_style (
            template_codename  VARCHAR(128) NOT NULL ,
            skin VARCHAR(128) NOT NULL ,
            config TEXT NOT NULL,
            custom_style TEXT NOT NULL,
            css_path VARCHAR(255) NOT NULL,
            date_created DATETIME NOT NULL,
            date_modified DATETIME NOT NULL,
            PRIMARY KEY (template_codename,skin)
        )
        COLLATE='utf8_general_ci'
        ENGINE=MyISAM;";
        $this->db->query($sql);
    }

    public function inc($old_version, $new_version)
    {

        if ($old_version < $new_version) {
            try {
                switch (true) {
                    case $old_version < '2.0.1':
                        {
                            $sql = "CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "vz_style (
            style_id INT(11) NOT NULL AUTO_INCREMENT,
            template_id INT(11) NOT NULL ,
            skin VARCHAR(255) NOT NULL ,
            config TEXT NOT NULL,
            custom_style TEXT NOT NULL,
            css_path VARCHAR(255) NOT NULL,
            date_created DATETIME NOT NULL,
            date_modified DATETIME NOT NULL,
            PRIMARY KEY (style_id)
        )
        COLLATE='utf8_general_ci'
        ENGINE=MyISAM;";
//                            $this->db->query($sql);
                        }
                    case $old_version < '2.1.0':
                        {
                        }
                }
            } catch (Exception $e) {
                return $e;
            }
            //update DB version if all ok
        }
    }
    /**
     * @return string
     */
    public function dropDataBase()
    {
        $this->db->query('DROP TABLE IF EXISTS ' . DB_PREFIX . 'vz_templates');
        $this->db->query('DROP TABLE IF EXISTS ' . DB_PREFIX . 'vz_style');
    }

    /**
     * @return string
     */
    public function tranceDataBase()
    {
        $this->db->query('TRUNCATE TABLE ' . DB_PREFIX . 'vz_templates');
        $this->db->query('TRUNCATE TABLE ' . DB_PREFIX . 'vz_style');
    }

    public function installEvents($active_skin)
    {
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            $route_info = $this->{'model_extension_' . $this->codename . '_template'}->getRoute();
            if (!empty($route_info['events'])) {
                foreach ($route_info['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->addEvent($this->codename, $trigger, $action, 1, 999);
                }
            }
            $route_info_active_template = $this->{'model_extension_'
            . $this->codename . '_template'}->getRoute('template/' . $route_info['module_' . $this->codename . '_setting']['active_template']);
            if (!empty($route_info_active_template['events'])) {
                foreach ($route_info_active_template['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->addEvent($this->codename . '_template_' . $route_info['module_' . $this->codename . '_setting']['active_template'], $trigger, $action, 1, 1);
                }
            }

        }
    }

    public function uninstallEvents()
    {
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            $this->model_extension_module_d_event_manager->deleteEvent($this->codename);
            $route_info = $this->{'model_extension_' . $this->codename . '_template'}->getRoute();
            $route_info_active_template = $this->{'model_extension_'
            . $this->codename . '_template'}->getRoute('template/' . $route_info['module_' . $this->codename . '_setting']['active_template']);
            if (!empty($route_info_active_template['events'])) {
                foreach ($route_info_active_template['events'] as $trigger => $action) {
                    $this->model_extension_module_d_event_manager->deleteEvent($this->codename . '_template_' . $route_info['module_' . $this->codename . '_setting']['active_template']);
                }
            }

        }
    }
}