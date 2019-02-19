<?php
//отображение блока в окне при выборе блока
$_['display']          = true;
//Порядковый номер
$_['sort_order']       = 9.2;
//Категория(content, social, structure)
$_['category']         = 'social';
//отображать название блока
$_['display_title']    = true;
//Может содержать дочерние блоки
$_['child_blocks']     = false;
//Уровень доступный для добавления блока
$_['level_min']       = 3;
$_['level_max']       = 7;
//Расположение кнопок управления
$_['control_position'] = 'popup';
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
$_['pre_render']       = true;
//Доступно сохранение в html
$_['save_html']        = true;
//Типы полей
$_['types']            = array(
    'library' => 'string',
    'icon_type' => 'string',
    'margin_beetwen' => 'string',
    'margin_beetwen_phone' => 'string',
    'margin_beetwen_tablet' => 'string',
    'align' => 'string',
    'align_phone' => 'string',
    'align_tablet' => 'string'
);
//Настройки по умолчанию
$_['setting']          = array(
    'library' => 'fontawesome',
    'icon_type' => 'text',
    'margin_beetwen' => '5px',
    'margin_beetwen_phone' => '5px',
    'margin_beetwen_tablet' => '5px',
    'align' => 'center',
    'align_phone' => 'center',
    'align_tablet' => 'center',
    'icons' => array(
        'facebook' => array(
            'icon' => 'fab fa-facebook-f',
            'link' => 'https://facebook.com',
            'background' => '',
            'color' => '',
            'size' => '25px',
            'sort_order' => 1
        ),
        'twitter' => array(
            'icon' => 'fab fa-twitter',
            'link' => 'https://twitter.com',
            'background' => '',
            'color' => '',
            'size' => '25px',
            'sort_order' => 2
        ),
        'google_plus' => array(
            'icon' => 'fab fa-google-plus-g',
            'link' => 'https://plus.google.com/discover',
            'background' => '',
            'color' => '',
            'size' => '25px',
            'sort_order' => 3
        ),
        'vk' => array(
            'icon' => 'fab fa-vk',
            'link' => 'https://vk.com/',
            'background' => '',
            'color' => '',
            'size' => '25px',
            'sort_order' => 4
        ),
        'instagram' => array(
            'icon' => 'fab fa-instagram',
            'link' => 'https://instagram.com',
            'background' => '',
            'color' => '',
            'size' => '25px',
            'sort_order' => 5
        )
    )
);