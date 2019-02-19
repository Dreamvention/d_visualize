<?php
//отображение блока в окне при выборе блока
$_['display']          = true;
//Порядковый номер
$_['sort_order']       = 1;
//Категория(content, social, structure)
$_['category']         = 'content';
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
    'title_font_size' => 'string',
    'title_font_family' => 'string',
    'title_underline' => 'boolean',
    'title_bold' => 'boolean',
    'title_italic' => 'boolean',
    'title_line_height' => 'string',
    'title_color' => 'string',
    'mode' => 'string',
    'limit' => 'number',
    'unstyle' => 'boolean',
    'color_item' => 'string',
    'custom_id' => 'string',
    'display_icon' => 'boolean',
    'library' => 'string'
);
//Настройки по умолчанию
$_['setting'] = array(
    'title' => array(
        1 => 'Information'
    ),
    'title_font_size' => '',
    'title_font_family' => '',
    'title_underline' => false,
    'title_bold' => true,
    'title_italic' => false,
    'title_line_height' => '',
    'title_color' => '',
    'mode' => 'information',
    'limit' => 4,
    'unstyle' => true,
    'color_item' => '',
    'item_font_size' => '',
    'item_font_family' => '',
    'item_underline' => false,
    'item_bold' => false,
    'item_italic' => false,
    'item_line_height' => '',
    'custom_id' => '',
    'display_icon' => 0,
    'library' => 'fontawesome',
);