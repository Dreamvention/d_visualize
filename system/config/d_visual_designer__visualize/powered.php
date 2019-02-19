<?php
//отображение блока в окне при выборе блока
$_['display']          = true;
//Порядковый номер
$_['sort_order']       = 1;
//Категория(content, social, structure)
$_['category']         = 'footer';
//отображать название блока
$_['display_title']    = false;
//Может содержать дочерние блоки
$_['child_blocks']     = false;
//Уровень доступный для добавления блока
$_['level_min']        = 3;
$_['level_max']        = 7;
//Расположение кнопок управления
$_['control_position'] ='popup';
//Отображение кнопок управления
$_['display_control']  = true;
//Кнопка перетаскивания
$_['button_drag']      = true;
//Кнопка редатирования
$_['button_edit']      = true;
//Кнопка копирования
$_['button_copy']      = true ;
//Кнопка сворачивания
$_['button_collapse']  = true;
//Кнопка удаления
$_['button_remove']    = true;
//Доступен пре-рендер
$_['pre_render'] = true;
//Доступно сохранение в html
$_['save_html'] = false;
//Типы полей
$_['types'] = array(
    'title' => 'array',
    'font_size' => 'string',
    'font_family' => 'string',
    'underline' => 'boolean',
    'bold' => 'boolean',
    'italic' => 'boolean',
    'line_height' => 'string',
    'color' => 'string',
    'align' => 'string'
);
//Настройки по умолчанию
$_['setting'] = array(
    'title' => array(1 => ''),
    'font_size' => '',
    'font_family' => '',
    'underline' => false,
    'bold' => false,
    'italic' => false,
    'line_height' => '',
    'color' => '',
    'align' => 'left',
);