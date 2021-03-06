<?php
$_['d_visualize_template_default_setting'] = array(
    'title' => 'Default',
    'codename' => 'default',
    'active_skin' => 'opencart',
    'description' => 'This default template pack with some pre defined style. This include some skin like opencart hydrys. It\'s contain some variants of components on your commmon pages like product, categories, account. Fell free to expirement with changing default settings to get best expirience from our theme module.',
    'debug' => 0,
    'page'          => array(
        //todo maybe bugs on admin check match
        // it have lowwer rule
        // follow priority hider have lower rule
        '.*'                => array(
            'layout' => array(
                'component' => array()
            )
        ),
        'account\/.*'     => array(
            'layout' => array(
                'component' => array(
                    'form_group' => array(
                        'editable'=>true,
                        'setting' => array(
                            'form' => array(
                                'value' => 'inline',
                            )
                        )
                    )
                )
            )
        ),
        //all pages in account
        'checkout\/.*'    => array(
            'layout' => array(
                'component' => array(
                    'form_group' => array(
                        'setting' => array(
                            'form' => array(
                                'value' => 'block',
                            ),
                            'js_error'=> true

                        )
                    )
                )
            )

        ),
        '.*\/coupon|voucher|account\/login' => array(
            'layout'  => array(
                'component' => array(
                    'form_group' => array(
                        'setting' => array(
                            'form' => array(
                                'value' => 'block',
                            )
                        )
                    )
                ),
            ),
        ),
        'checkout\/cart' => array(
            'layout'  => array(
                'component' => array(
                    'checkout_cart' => array(
                        'editable' => true,
                        'template' => 'd_visualize/template/component/checkout_cart/',
                    ),
                ),
            ),
            'scripts' => array()
        ),
        'checkout\/checkout' => array(
            'layout'  => array(
                'component' => array(
                    'checkout_engine' => array(
                        'editable' => true,
                        'template' => 'd_visualize/template/component/checkout_cart/',
                    ),
                ),
            ),
            'scripts' => array()
        ),
        'information\/contact' => array(
            'layout'  => array(
                'component' => array(
                    'information_contact' => array(
                        'editable' => true,
                        'template' => 'd_visualize/template/component/information_contact/',
                    ),
                ),
            ),
            'scripts' => array()
        ),
        /**/
        'default' => array(
            'layout' => array(
                'template' => 'd_visualize/template/layout/default.twig', // here can be custom settings for this template
                'component' => array(
                    'd_product_thumb' => array(
                        'skin'=>'opencart',
                        'template' => 'd_visualize/template/component/d_product_thumb/', //зафиксировано
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_product_thumb/',
                        'editable' => true,
                    ),
                    'breadcrumb' => array(
                        'template' => 'd_visualize/template/component/breadcrumb/',
                        'editable' => true,
                        'setting' => array(
                            'display' => array(
                                'value' => true,
                                'type' => 'checkbox'
                            )
                        )
                    ),
                    'button' => array(
                        'skin' => 'default',
                        'template' => 'd_visualize/template/component/button/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/button/',
                        'editable' => false

                    ),
                    'form_group' => array(
                        'skin' => 'default',
                        'template' => 'd_visualize/template/component/form_group/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/form_group/',
                        'setting' => array(
                            'form' => array(
                                'type' => 'select',
                                'value' => 'inline',
                                'values' => array('inline', 'block'),
                            )
                        ),
                        'editable' => false
                    ),
                    'input_group' => array(
                        'skin' => 'default',
                        'template' => 'd_visualize/template/component/input_group/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/input_group/',
                        'setting' => array(
                            'form' => array(
                                'type' => 'select',
                                'value' => 'inline',
                                'values' => array('inline', 'block'),
                            )
                        ),
                        'editable' => false
                    ),
                    'input' => array(
                        'skin' => 'default',
                        'template' => 'd_visualize/template/component/input/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/input/',
                        'editable' => false
                    ),
                    'd_product_sort' => array(
                        'template' => 'd_visualize/template/component/d_product_sort/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_product_sort/',
                        'editable' => false // on other page will be true
                    ),
                    'd_product_list' => array(
                        'template' => 'd_visualize/template/component/d_product_list/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_product_list/',
                        'editable' => false // on other page will be true
                    ),
                    'd_rating' => array(
                        'template' => 'd_visualize/template/component/d_rating/',
                        'editable' => false
                    ),
                    'd_review' => array(
                        'template' => 'd_visualize/template/component/d_review/',
                        'editable' => false
                    ),
                    'product_review' => array(
                        'template' => 'd_visualize/template/component/product_review/',
                        'editable' => false
                    ),

                    'd_account_field' => array(
                        'template' => 'd_visualize/template/component/d_account_field/',
                        'editable' => false
                    ),
                    'd_account_field_affiliate' => array(
                        'template' => 'd_visualize/template/component/d_account_field_affiliate/',
                        'editable' => false
                    ),
                    'd_address_field' => array(
                        'template' => 'd_visualize/template/component/d_address_field/',
                        'editable' => false
                    ),
                    'd_name_field' => array(
                        'template' => 'd_visualize/template/component/d_name_field/',
                        'editable' => false
                    ),
                    'd_custom_field' => array(
                        'template' => 'd_visualize/template/component/d_custom_field/',
                        'editable' => false
                    ),
                    'd_button_continue' => array(
                        // same as the button
                        'template' => 'd_visualize/template/component/d_button_continue/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_button_continue/',
                        'editable' => false
                    ),
                    'd_notification' => array(
                        'template' => 'd_visualize/template/component/d_notification/',
                        'editable' => true,
                    ),
                    'd_mini_cart' => array(
                        'template' => 'd_visualize/template/component/d_mini_cart/',
                        'editable' => true,
                    ),
                    'd_loader'               => array(
                        'template' => 'd_visualize/template/component/product/remove/',
                        'editable' => false,
                    ),
                    'default_quantity_items' => array(
                        'template' => 'd_visualize/template/component/default/quantity_items/',
                    ),
                    'default_remove_btn'     => array(
                        'template' => 'd_visualize/template/component/default/remove_btn/',
                    ),
                    'd_post_thumb'           => array(
                        'template' => 'd_visualize/template/component/d_post_thumb/'
                    )
                ),
                'columns' => array(
                    'left' => 'col-12 col-md-3 d-sm-block d-none',
                    'main' => array(
                        'one_col' => 'col-12',
                        'two_col' => 'col-12 col-md-9',
                        'three_col' => 'col-6',
                    ),
                    'right' => 'col-12 col-md-3 d-md-block d-none',
                )
            ),
            'block' => array('main_wrapper', 'before_content', 'content', 'after_content')
        ),
        'common\/home' => array(
            'layout' => array(
                'component' => array(
                    'breadcrumb' => array(
                        'setting' => array(
                            'display' => array(
                                'value' => false,
                            )
                        )
                    )
                ),
            ),
        ),
        'product\/product' => array(
            'layout' => array(
                'component' => array(
                    'form_group' => array(
                        'setting' => array(
                            'form' => array(
                                'value' => 'block',
                            )
                        )
                    ),
                    'product_product' => array(
                        'editable'=>true,
                        'template' => 'd_visualize/template/component/product_product/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/product_product/',
                    ),
                    'product_options' => array(
                        'template' => 'd_visualize/template/component/product/options/',
                    ),
                    'product_thumbnails' => array(
                        'skin' => 'default',
                        'template' => 'd_visualize/template/component/product/thumbnails/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/product_thumbnails/',
                    ),
                    'product_tabs' => array(
                        'skin' => 'default',
                        'template' => 'd_visualize/template/component/product/tabs/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/product_tabs/',
                    ),
                    'product_remove' => array(
                        'template' => 'd_visualize/template/component/product/remove/',
                    ),
                ),
            ),
            'scripts' => array(
                'catalog/view/javascript/jquery/magnific/jquery.magnific-popup.min.js',
            ),
            'styles' => array()
        ),
        'product\/category' => array(
            'layout' => array(
                'component' => array(
                    'product_category' => array(
                        'editable'=>true,
                        'template' => 'd_visualize/template/component/product_category/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/product_category/',
                        'description_after_content' => true,
                    ),
                    'product_category_description' => array(
                        'editable'=>false,
                        'template' => 'd_visualize/template/component/product/category_description/',
                    ),
                    'd_product_sort' => array(
                        'editable' => true
                    )
                ),
            ),
            'scripts' => array(),
            'styles' => array()
        ),

    ),
    'pre_scripts'   => array(
        'catalog/view/javascript/bootstrap/js/bootstrap.min.js',
        'catalog/view/javascript/jquery/jquery-2.1.1.min.js',
    ),
    'post_scripts'  => array(
        'catalog/view/javascript/d_bootstrap_rating/bootstrap-rating.min.js',
    ),
    'post_styles'   => array(
        'catalog/view/javascript/d_bootstrap_rating/bootstrap-rating.css',
    ),
    'pre_styles'    => array(
//        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css',
        'https://use.fontawesome.com/releases/v5.5.0/css/all.css',
        'https://use.fontawesome.com/releases/v5.5.0/css/v4-shims.css',
//        'catalog/view/theme/d_visualize/font/awesome/all.min.css',
//        'catalog/view/theme/d_visualize/font/awesome/v4-shims.min.css',
        'catalog/view/theme/d_visualize/stylesheet/dist/library/bootstrap.css',
        'catalog/view/theme/d_visualize/stylesheet/dist/library/bootstrap-grid.css',
//        'catalog/view/theme/default/stylesheet/stylesheet.css',
    ),
    'custom_styles' => array(
        ''
    ),
);
$_['d_visualize_template_default_demo_data'] = array(
    'text'        => 'Default Opencart',
    'description' => '<h4>Demo Data for Default Theme</h4><p>You will replace all the products, categories, reviews with the default settings. It is a great starting point to understend how the Default theme works. You can then edit the posts to fit your needs. Remeber that this option will delete anything that you already have in your Store so please be carefule. We adivise you to do a database backup first.</p>',
    'sql'         => 'default.sql'
);
$_['events'] = array(
//    'catalog/view/product/category/before' => 'extension/d_visualize/template/default/default/view_product_category_before',
);
$_['config_theme_default'] = array(
    'size' => array(
        'product_thumb' => array('width' => '330', 'height' => '330'),
    )
);
//todo add support modules overloading components and layout
//        'extension/d_blog_module/*' => array(
//            'layout' => array(
//                'columns' => array(
//                    'left' => 'col-12 col-sm-4',
//                    'main' => array(
//                        'two_col' => 'col-12 col-sm-8',
//                    ),
//                    'right' => 'col-12 col-sm-4'
//                )
//            )
//        ),