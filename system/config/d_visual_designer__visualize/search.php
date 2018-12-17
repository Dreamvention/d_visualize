<?php
//отображение блока в окне при выборе блока
$_['display']         = true;
//Порядковый номер
$_['sort_order']      = 2;
//Категория(content, social, structure)
$_['category'] = 'header';
//отображать название блока
$_['display_title']   = true;
//Может содержать дочерние блоки
$_['child_blocks']    = false;
//Уровень доступный для добавления блока
$_['level_min']        = 3;
$_['level_max']        = 7;
//Расположение кнопок управления
$_['control_position'] ='popup';
//Отображение кнопок управления
$_['display_control'] = true;
//Кнопка перетаскивания
$_['button_drag']     = true;
//Кнопка layout
$_['button_layout']     = false;
//Кнопка редатирования
$_['button_edit']     = true;
//Кнопка копирования
$_['button_copy']     = true ;
//Кнопка сворачивания
$_['button_collapse'] = true;
//Кнопка удаления
$_['button_remove']   = true;
//Доступен пре-рендер
$_['pre_render'] = true;
//Доступно сохранение в html
$_['save_html'] = false;
//Типы полей
$_['types']            = array(
    'design_margin_bottom' => 'string',
    'icon_align' => 'string',
    'display_icon' => 'boolean',
    'icon' => 'string',
    'library' => 'string',
    'size' => 'string',
    'variation' => 'v1'
);
//Настройки по умолчанию
$_['setting'] = array(
    'title' => array(),// it's mean place holder 
    'display_icon' => true,
    'library' => 'fontawesome',
    'icon' => 'fa fa-search',
    'icon_align' => 'right',
    'size' => 'sm',
    'variation' => 'v2',
);