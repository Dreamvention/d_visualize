<?php
$_['d_visualize_template_default_setting'] = array(
    'title'         => 'default template',
    'codename'      => 'default',
    'active_skin'   => 'opencart',
    'description'   => 'template from default opencart',
    'debug'         => 0,
    'page'          => array(
        'default'                   => array(
            'layout' => array(
                'template'        => 'd_visualize/template/layout/default.twig', // here can be custom settings for this template
                'container_width' => '1440',
                'component'       => array(
                    'd_product_thumb'           => array(
                        'skin'       => 'default',
                        'template'   => 'd_visualize/template/component/d_product_thumb/', //зафиксировано
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_product_thumb/',
                        'editable'   => true,
                    ),
                    'breadcrumb'                => array(
                        'skin'     => 'opencart',
                        'template' => 'd_visualize/template/component/breadcrumb/',
                        'editable' => true,
                        'setting'  => array(
                            'display' => true
                        )
                    ),
                    'button'                    => array(
                        'skin'       => 'default',
                        'template'   => 'd_visualize/template/component/button/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/button/',
                        'editable'   => false

                    ),
                    'form_group'                => array(
                        'template'   => 'd_visualize/template/component/form_group/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/form_group/',
                        'setting'    => array(
                            'form' => 'block'
                        ),
                        'editable'   => false
                    ),
                    'input'                     => array(
                        'template'   => 'd_visualize/template/component/input/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/input/',
                        'editable'   => false

                    ),
                    'd_product_sort'            => array(
                        'skin'       => 'opencart',
                        'template'   => 'd_visualize/template/component/d_product_sort/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_product_sort/',
                        'editable'   => false // on other page will be true
                    ),
                    'd_product_list'            => array(
                        'template' => 'd_visualize/template/component/d_product_list/',
                        'editable' => false // on other page will be true
                    ),
                    'd_rating'                  => array(
                        'skin'     => 'opencart',
                        'template' => 'd_visualize/template/component/d_rating/',
                        'editable' => false

                    ),
                    'd_layout_open'             => array(
                        //deprecated
                        'template'   => 'd_visualize/template/component/d_layout_open/',
                        'deprecated' => true,
                    ),
                    'd_layout_close'            => array(
                        'template'   => 'd_visualize/template/component/d_layout_close/',
                        'deprecated' => true,

                    ),
                    'd_account_field'           => array(
                        'template' => 'd_visualize/template/component/d_account_field/',
                        'editable' => false

                    ),
                    'd_account_field_affiliate' => array(
                        'template' => 'd_visualize/template/component/d_account_field_affiliate/',
                        'editable' => false

                    ),
                    'd_address_field'           => array(
                        'template' => 'd_visualize/template/component/d_address_field/',
                        'editable' => false
                    ),
                    'd_name_field'              => array(
                        'template' => 'd_visualize/template/component/d_name_field/',
                        'editable' => false
                    ),
                    'd_custom_field'            => array(
                        'template' => 'd_visualize/template/component/d_custom_field/',
                        'editable' => false

                    ),
                    'd_button_continue'         => array(
                        // same as the button
                        'template'   => 'd_visualize/template/component/d_button_continue/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_button_continue/',
                        'editable'   => false
                    ),
                    'd_notification'            => array(
                        'skin'     => 'opencart',
                        'template' => 'd_visualize/template/component/d_notification/',
                        'editable' => true,
                    ),

                    'd_mini_cart' => array(
                        'template' => 'd_visualize/template/component/d_mini_cart/',
                        'editable' => true,
                    ),
                    'd_loader'    => array(
                        'template' => 'd_visualize/template/component/product/remove/',
                        'editable' => true,
                    ),
                ),
                'extension'       => array(
                    'd_blog_module' => array(
                        'component' => array(
                            'd_post_thumb' => array(
                                'template' => 'd_visualize/template/component/d_post_thumb/'
                            )
                        ),
                    )
                ),
                'columns'         => array(
                    'left'  => 'col-12 col-md-3 d-sm-block d-none',
                    'main'  => array(
                        'one_col'   => 'col-12',
                        'two_col'   => 'col-12 col-md-9',
                        'three_col' => 'col-6',
                    ),
                    'right' => 'col-12 col-md-3 d-md-block d-none',
                )
            ),
            'block'  => array('main_wrapper', 'before_content', 'content', 'after_content')
        ),
        'common/home'               => array(
            'layout' => array(
                'component' => array(
                    'breadcrumb' => array(
                        'setting' => array(
                            'display' => false
                        )
                    )
                ),
            ),
        ),
        'product/product'           => array(
            'layout'  => array(
                'component' => array(
                    'd_review'           => array(
                        'template' => 'd_visualize/template/component/d_review/'
                    ),
                    'product_product'    => array(
                        'skin'       => 'default',
                        'template'   => 'd_visualize/template/component/product_product/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/product_product/',
                    ),
                    'product_options'    => array(
                        'template' => 'd_visualize/template/component/product/options/',
                    ),
                    'product_thumbnails' => array(
                        'skin'       => 'default',
                        'template'   => 'd_visualize/template/component/product/thumbnails/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/product_thumbnails/',
                    ),
                    'product_tabs'       => array(
                        'skin'       => 'default',
                        'template'   => 'd_visualize/template/component/product/tabs/',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/product_tabs/',
                    ),
                    'product_review'     => array(
                        // move to product/product
                        'template' => 'd_visualize/template/component/product/review/',
                    ),
                    'product_quantity'   => array(
                        'template' => 'd_visualize/template/component/product/quantity/',
                    ),
                    'product_remove'     => array(
                        'template' => 'd_visualize/template/component/product/remove/',
                    ),
                ),
            ),
            'scripts' => array(
                'catalog/view/javascript/jquery/magnific/jquery.magnific-popup.min.js',
            ),
            'styles'  => array()
        ),
        'product/category'          => array(
            'layout'  => array(
                'component' => array(
                    'product_category' => array(
                        'skin'              => 'opencart',
                        'template'          => 'd_visualize/template/component/product_category/',
                        'stylesheet'        => 'd_visualize/stylesheet/dist/vz-component/product_category/',
                        'description_after' => false,
                        'description'       => array(
                            'template' => 'd_visualize/template/component/product/category_description/')
                    ),
                    'd_product_sort'   => array(
                        'editable' => true
                    )
                ),
            ),
            'scripts' => array(),
            'styles'  => array()
        ),
        'checkout/cart'             => array(
            'layout'  => array(
                'component' => array(
                    'checkout_cart' => array(
                        'template' => 'd_visualize/template/component/checkout_cart/',
                    )
                ),
            ),
            'scripts' => array()
        ),
        'extension/d_blog_module/*' => array(
            'layout' => array(
                'columns' => array(
                    'left'  => 'col-12 col-sm-4',
                    'main'  => array(
                        'two_col' => 'col-12 col-sm-8',
                    ),
                    'right' => 'col-12 col-sm-4'
                )
            )
        ),
        'account/*'                 => array(
            'layout' => array(
                'component' => array(
                    'form_group' => array(
                        'setting' => array(
                            'form' => 'inline'
                        )
                    )
                )
            )
        ),
        'account/login'             => array(
            'layout' => array(
                'component' => array(
                    'form_group' => array(
                        'setting' => array(
                            'form' => 'block'
                        )
                    )
                )
            )
        )
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
//        'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
//        'https://use.fontawesome.com/releases/v5.2.0/css/v4-shims.css',
        'catalog/view/theme/d_visualize/font/awesome/all.min.css',
        'catalog/view/theme/d_visualize/font/awesome/v4-shims.min.css',
        'catalog/view/theme/d_visualize/stylesheet/dist/bootstrap.css',
        'catalog/view/theme/d_visualize/stylesheet/dist/bootstrap-grid.css',
    ),
    'custom_styles' => array(
        ''
    ),
);
$_['events'] = array(
    'catalog/view/product/category/before' => 'extension/d_visualize/template/default/default/view_product_category_before',
);
$_['config_theme_default'] = array(
    'size' => array(
        'product_thumb' => array('width' => '707', 'height' => '707'),
    )
);