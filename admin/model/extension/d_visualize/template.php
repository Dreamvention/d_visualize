<?php

class ModelExtensionDVisualizeTemplate extends Model
{
    private $codename = 'd_visualize';

    public function installEvents()
    {

    }

    public function getRoute($name = 'd_visualize')
    {
        $results = array();
        if ($name == $this->codename)
            $file = DIR_CONFIG .  $name . '.php';
        else
            $file = DIR_CONFIG . $this->codename . '/' . $name . '.php';

        if (file_exists($file)) {
            $_ = array();
            require($file);
            $results = array_merge($results, $_);
        }
        if (!empty($results) && !isset($results['name'])) {
            $results['name'] = ucfirst(strtolower($name));
        }
        return $results;
    }

    public function getTemplateExtensions($skin_name)
    {
        //todo make this work
        //load json of active skin pack
        $modules_json = array();
        if (is_file(DIR_SYSTEM . 'library/d_shopunity/extension/' . $skin_name . '.json')) {
            $skin = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $skin_name . '.json'), true);
            if ($this->d_shopunity) {
                $this->load->model('extension/d_shopunity/mbooth');
                $this->model_extension_d_shopunity_mbooth->validateDependencies($skin['codename']);
            }
            foreach ($skin['required'] as $key => $version) {
                $module_json = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $key . '.json'), true);
                //install from json only modules not library
                if ($module_json['module'] == 'module' && $module_json['module'] != $this->codename) {
                    $modules_json[] = array(
                        'index'    => $module_json['index'],
                        'codename' => $module_json['codename'],
                    );
                }
            }
        }
        return $modules_json;

    }
    public function getAvailableTemplates()
    {
        $files = glob(DIR_CONFIG . $this->codename . '/template/*.php', GLOB_BRACE);
        $result = array();
        $this->load->model('tool/image');
        foreach ($files as $key => $file) {
            $codename = basename($file, '.php');
            $this->config->load($this->codename . '/template/' . $codename);
            $config = $this->config->get($this->codename . '_template_' . $codename . '_setting');
            $result[$codename] = array(
                'source'  => 'config',
                'setting' => $config,
                'img'     => $this->model_tool_image->resize((is_file(DIR_IMAGE . 'catalog/' . $this->codename . '/template/' . $codename . '.png') ? 'catalog/' . $this->codename . '/template/' . $codename . '.png' : "no_image.png"), 300, 400),

            );
        }
        //if there will be changes from DB it will replace
        $dbTemplates = $this->getTemplates();
        foreach ($dbTemplates as $template) {
            $result[$template['codename']] = $template;
        }

        return $result;
    }
    public function getTemplates($data_filter = array())
    {
        $sql = 'SELECT * from ' . DB_PREFIX . 'vz_templates';
        return $this->db->query($sql)->rows;
    }

}
