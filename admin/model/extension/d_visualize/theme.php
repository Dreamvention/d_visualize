<?php

class ModelExtensionDVisualizeTheme extends Model
{
    public function installEvents()
    {

    }
    public function getRoute($name='d_visualize')
    {
        $results = array();
        $file = DIR_CONFIG . 'd_visualize/' . $name . '.php';
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
}
