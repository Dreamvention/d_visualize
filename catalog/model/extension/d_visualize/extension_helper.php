<?php

class ModelExtensionDVisualizeExtensionHelper extends Model
{
    private $codename = 'd_visualize';

    public function __construct($registry)
    {
        parent::__construct($registry);
    }

    /**
     * Add scripts and style on the document
     * @array
     */
    public function addDocumentPageData($data, $page_data)
    {
        if (!empty($page_data['header'])) {
            $html_dom = new d_simple_html_dom();
            $html_dom->load($page_data['header'], $lowercase = true, $stripRN = false, $defaultBRText = DEFAULT_BR_TEXT);

            if (!empty($data['scripts'])) {
                foreach ($data['scripts'] as $script) {
                    if (!$html_dom->find('head', 0)->find('script[src="' . $script . '"]')) {
                        $html_dom->find('head', 0)->innertext = '<script src="' . $script . '" type="text/javascript"></script>';
                    }
                }
            }

            if (!empty($data['styles'])) {
                foreach ($data['styles'] as $style) {
                    if (!$html_dom->find('head', 0)->find('link[href="' . $style . '"]')) {
                        $html_dom->find('head', 0)->innertext = '<link href="' . $style . '" rel="stylesheet" type="text/css"></script>';
                    }
                }
            }
            $page_data['header'] = (string)$html_dom;
        } else {
            if (!empty($data['scripts'])) {
                foreach ($data['scripts'] as $script) {
                    $this->document->addScript($script);
                }
            }

            if (!empty($data['styles'])) {
                foreach ($data['styles'] as $style) {
                    $this->document->addStyle($style);
                }
            }
        }
        return $page_data['header'];
    }

}