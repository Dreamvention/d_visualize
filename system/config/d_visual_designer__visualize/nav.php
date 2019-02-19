<?php
//отображение блока в окне при выборе блока
$_['display']         = true;
//Порядковый номер
$_['sort_order']      = 0;
//Категория(content, social, structure)
$_['category'] = 'header';
//отображать название блока
$_['display_title']   = false;
//Может содержать дочерние блоки
$_['child_blocks']    = true;
//Обязательынй дочерний блок
$_['child'] = 'row';
//Уровень доступный для добавления блока
$_['level_min']       = 0;
$_['level_max']       = 0;
//Расположение кнопок управления
$_['control_position'] ='advanced';
//Отображение кнопок управления
$_['display_control'] = true;
//Кнопка перетаскивания
$_['button_drag']     = true;
//Кнопка layout
$_['button_layout']   = false;
//Кнопка редатирования
$_['button_edit']     = true;
//Кнопка копирования
$_['button_copy']     = true ;
//Кнопка сворачивания
$_['button_collapse'] = true;
//Кнопка удаления
$_['button_remove']   = true;

$_['custom_layout'] = 'nav';
$_['custom_layout_tag'] = 'nav';
//Доступен пре-рендер
$_['pre_render'] = true;
//Доступно сохранение в html
$_['save_html'] = false;
//Типы полей
$_['types']            = array(
    'id' => 'string',
    'nav_stretch' => 'string',
    'background_video' => 'boolean',
    'link' => 'string',
    'align' => 'string',
    'align_items' => 'string',
    'container' => 'string'
);
//Настройки по умолчанию
$_['setting'] = array(
    'id' => 'top',
    'container' => 'fluid',
    'nav_stretch' => '',
    'background_video' => 0,
    'link' => '',
    'align' => 'left',
    'align_items' => 'stretch',
);