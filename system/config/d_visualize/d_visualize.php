<?php
$_['d_visualize'] = array(
    'active_skin' => 'jag',
    'status'      => 1
);
$_['events'] = array(
    'catalog/view/*/*/before'                => 'extension/d_visualize/event/view_all_before_d_visualize',
    'catalog/view/common/header/before' => 'extension/d_visualize/event/header_view_before_d_visualize  ',
);