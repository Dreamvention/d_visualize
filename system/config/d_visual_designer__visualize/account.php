<?php
//отображение блока в окне при выборе блока
$_['display']          = true;
//Порядковый номер
$_['sort_order']       = 2;
//Категория(content, social, structure)
$_['category']         = 'header';
//отображать название блока
$_['display_title']    = true;
//Может содержать дочерние блоки
$_['child_blocks']     = false;
//Уровень доступный для добавления блока
$_['level_min']        = 3;
$_['level_max']        = 7;
//Расположение кнопок управления
$_['control_position'] = 'popup';
//Отображение кнопок управления
$_['display_control']  = true;
//Кнопка перетаскивания
$_['button_drag']      = true;
//Кнопка layout
$_['button_layout']    = false;
//Кнопка редатирования
$_['button_edit']      = true;
//Кнопка копирования
$_['button_copy']      = true ;
//Кнопка сворачивания
$_['button_collapse']  = true;
//Кнопка удаления
$_['button_remove']    = true;
//Доступен пре-рендер
$_['pre_render']       = true;
//Доступно сохранение в html
$_['save_html']        = false;
//Типы полей
$_['types']            = array();
//Настройки по умолчанию
$_['setting']          = array(
    'title'                  => array(),
    'display_icon'  => array('show_desktop', 'show_mobile', 'show_tablet'),
    'display_title' => array('show_desktop'),
    'display_arrow'          => true,
    'arrow_icon_library'     => 'fontawesome',
    'arrow_icon'             => 'fa fa-caret-down',
    'mode'                   => 'click',
    'library'                => 'fontawesome',
    'icon'                   => 'fas fa-user'
);