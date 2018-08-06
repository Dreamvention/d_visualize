<?php
/*
*   location: admin/model
*/

class ModelExtensionModuleDVisualize extends Model
{
    private $codename = 'd_visualize';

    public function __construct($registry)
    {
        $this->extension = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $this->codename . '.json'), true);

    }

    public function getSkinExtensions($skin_name)
    {
        //todo make this work
        //load json of active skin pack
        $modules_json = array();
        $this->extension = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $skin_name . '.json'), true);

        foreach ($this->extension['required'] as $key => $version) {
            $module_json = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $key . '.json'), true);
            //install from json only modules not library
            if ($module_json['module'] == 'module' && $module_json['module'] != $this->codename) {
                $modules_json[] = array(
                    'index'    => $module_json['index'],
                    'codename' => $module_json['codename'],
                );
            }
        }
        return $modules_json;

    }
}