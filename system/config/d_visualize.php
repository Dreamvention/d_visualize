<?php
$_['d_visualize_setting'] = array(
    'active_template' => 'default',
    'available_templates' => array('default', 'jag'),
    'status' => 1,
    'auto_save' => 1,
);

$_['events'] = array(
    'catalog/view/*/*/before' => 'extension/d_visualize/event/view_all_before_d_visualize',
    'catalog/view/common/header/before' => 'extension/d_visualize/event/header_view_before_d_visualize  ',
);

$_['config_theme_visualize'] = array(
    'size' => array(
        'image_thumb' => array('width' => '707', 'height' => '707'),
        'image_additional' => array('width' => '115', 'height' => '115'),
        'image_related' => array('width' => '218', 'height' => '218'),
        'image_category' => array('width' => '218', 'height' => '218'),
        'image_popup' => array('width' => '900', 'height' => '900'),
        'image_cart_width' => array('width' => '150', 'height' => '150'),
    )
);