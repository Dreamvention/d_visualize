<?php
$_['d_visualize_template_default_setting'] = array(
    'title' => 'default template',
    'codename' => 'default',
    'active_skin' => 'hydrus',
    'description' => 'template from default opencart',
    'debug' => 1,
    'page' => array(
        'default' => array(
            'layout' => array(
                'template' => 'd_visualize/template/layout/default.twig', // here can be custom settings for this template
                'container_width' => '1440',
                'partial' => array(
                    'button' => array(
                        'template' => 'd_visualize/template/partial/button.twig', // here can be custom settings for this template
                        'component' => array(
                            'button' => array(
                                'template' => 'd_visualize/template/component/button/default.twig',
                                'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/button/default.css'
                            )
                        )
                    ),
                    'd_product_thumb' => array(
                        'template' => 'd_visualize/template/partial/d_product_thumb.twig', // here can be custom settings for this template
                        'component' => array(
                            'd_product_thumb' => array(
                                'skin' => 'hydrus',
                                'template' => 'd_visualize/template/component/d_product_thumb/default.twig',
                                'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_product_thumb/default.css',
                            )
                        )
                    ),
                    'form_group' => array(
                        'template' => 'd_visualize/template/partial/form_group.twig', // here can be custom settings for this template
                        'component' => array(
                            'form_group' => array(
                                'template' => 'd_visualize/template/component/form_group/default.twig'
                            )
                        )
                    ),
                    'input' => array(
                        'template' => 'd_visualize/template/partial/input.twig', // here can be custom settings for this template
                        'component' => array(
                            'input' => array(
                                'template' => 'd_visualize/template/component/input/default.twig'
                            )
                        )
                    ),
                    'breadcrumb' => array(
                        'template' => 'd_visualize/template/partial/d_breadcrumb.twig', // here can be custom settings for this template
                        'component' => array(
                            'breadcrumb' => array(
                                'template' => 'd_visualize/template/component/d_breadcrumb/default.twig'
                            )
                        )
                    ),
                    'd_product_sort' => array(
                        'template' => 'd_visualize/template/partial/d_product_sort.twig', // here can be custom settings for this template
                        'component' => array(
                            'd_product_sort' => array(
                                'skin'=>'hydrus',
                                'template' => 'd_visualize/template/component/d_product_sort/default.twig',
                                'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_product_sort/default.css'
                            )
                        )
                    ),
                    'd_layout_open' => array(
                        'template' => 'd_visualize/template/partial/d_layout_open.twig', // here can be custom settings for this template
                        'component' => array(
                            'd_layout_open' => array(
                                'template' => 'd_visualize/template/component/d_layout_open/default.twig'
                            )
                        )
                    ),
                    'd_layout_close' => array(
                        'template' => 'd_visualize/template/partial/d_layout_close.twig', // here can be custom settings for this template
                        'component' => array(
                            'd_layout_close' => array(
                                'template' => 'd_visualize/template/component/d_layout_close/default.twig'
                            )
                        )
                    ),
                    'd_product_list' => array(
                        'template' => 'd_visualize/template/partial/d_product_list.twig', // here can be custom settings for this template
                        'component' => array(
                            'd_product_list' => array(
                                'template' => 'd_visualize/template/component/d_product_list/default.twig',
                            )
                        )
                    ),
                    'd_rating' => array(
                        'template' => 'd_visualize/template/partial/d_rating.twig',
                        'component' => array(
                            'd_rating' => array(
                                'template' => 'd_visualize/template/component/d_rating/default.twig'
                            )
                        )
                    ),
                    'd_account_field' => array(
                        'template' => 'd_visualize/template/partial/d_account_field.twig',
                        'component' => array(
                            'd_account_field' => array(
                                'template' => 'd_visualize/template/component/d_account_field/default.twig'
                            )
                        )
                    ),
                    'd_account_field_affiliate' => array(
                        'template' => 'd_visualize/template/partial/d_account_field_affiliate.twig',
                        'component' => array(
                            'd_account_field_affiliate' => array(
                                'template' => 'd_visualize/template/component/d_account_field_affiliate/default.twig'
                            )
                        )
                    ),
                    'd_address_field' => array(
                        'template' => 'd_visualize/template/partial/d_address_field.twig',
                        'component' => array(
                            'd_address_field' => array(
                                'template' => 'd_visualize/template/component/d_address_field/default.twig'
                            )
                        )
                    ),
                    'd_name_field' => array(
                        'template' => 'd_visualize/template/partial/d_name_field.twig',
                        'component' => array(
                            'd_name_field' => array(
                                'template' => 'd_visualize/template/component/d_name_field/default.twig'
                            )
                        )
                    ),
                    'd_custom_field' => array(
                        'template' => 'd_visualize/template/partial/d_custom_field.twig',
                        'component' => array(
                            'd_custom_field' => array(
                                'template' => 'd_visualize/template/component/d_custom_field/default.twig'
                            )
                        )
                    ),
                    'd_button' => array(
                        'template' => 'd_visualize/template/partial/d_button.twig',
                        'component' => array(
                            'd_button' => array(
                                'template' => 'd_visualize/template/component/d_button/default.twig'
                            )
                        )
                    ),
                    'd_button_submit' => array(
                        'template' => 'd_visualize/template/partial/d_button_submit.twig',
                        'component' => array(
                            'd_button_submit' => array(
                                'template' => 'd_visualize/template/component/d_button_submit/default.twig',
                                'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/d_button_submit/default.css'
                            )
                        )
                    ),
                    'd_button_continue' => array(
                        'template' => 'd_visualize/template/partial/d_button_continue.twig',
                        'component' => array(
                            'd_button_continue' => array(
                                'template' => 'd_visualize/template/component/d_button_continue/default.twig'
                            )
                        )
                    ),
                    'd_review' => array(
                        'template' => 'd_visualize/template/partial/d_review.twig',
                        'component' => array(
                            'd_review' => array(
                                'template' => 'd_visualize/template/component/d_review/default.twig'
                            )
                        )
                    ),
                    'd_notification' => array(
                        'template' => 'd_visualize/template/partial/d_notification.twig',
                        'component' => array(
                            'd_notification' => array(
                                'template' => 'd_visualize/template/component/d_notification/default2.twig',
                            ),)
                    )
                ,
                ),
                'component' => array(
                    'product_review' => array(
                        'template' => 'd_visualize/template/component/product/review/default.twig',
                    ),
                    'd_mini_cart' => array(
                        'template' => 'd_visualize/template/component/d_mini_cart/default.twig',
                    ),
                    'product_quantity' => array(
                        'template' => 'd_visualize/template/component/product/quantity/default.twig',
                    ),
                    'product_remove' => array(
                        'template' => 'd_visualize/template/component/product/remove/default.twig',
                    ),
                    'd_loader' => array(
                        'template' => 'd_visualize/template/component/product/remove/default.twig'
                    ),

                ),
                'extension' => array(
                    'd_blog_module' => array(
                        'component' => array(
                            'd_post_thumb' => array(
                                'template' => 'd_visualize/template/component/d_post_thumb/default.twig'
                            )
                        ),
                    )
                ),
                'columns' => array(
                    'left' => 'col-3 d-sm-block d-none',
                    'main' => array(
                        'one_col' => 'col-12',
                        'two_col' => 'col-12 col-md-9',
                        'three_col' => 'col-6',
                    ),
                    'right' => 'col-3 d-md-block d-none',
                )
            ),
            'block' => array('main_wrapper', 'before_content', 'content', 'after_content')
        ),
        'common/home' => array(
            'layout' => array(
                'partial' => array(
                    'breadcrumb' => array(
                        'template' => 'd_visualize/template/partial/d_breadcrumb.twig', // here can be custom settings for this template
                        'component' => array(
                            'breadcrumb' => array(
                                'template' => 'd_visualize/template/component/d_breadcrumb/empty.twig'
                            )
                        )
                    ),
                )
            ),
        ),
        'product/product' => array(
            'layout' => array(
                'component' => array(
                    'product_product' => array(
                        'skin'=>'hydrus',
                        'template' => 'd_visualize/template/component/product_product/default.twig',
                        'stylesheet' => 'd_visualize/stylesheet/dist/vz-component/product_product/default.css',
                    ),

                    'product_options' => array(
                        'template' => 'd_visualize/template/component/product/options/default.twig',
                    )
                ),
            ),
            'scripts' => array(
                'catalog/view/javascript/jquery/magnific/jquery.magnific-popup.min.js',
            ),
            'styles' => array()
        ),
        'product/category' => array(
            'layout' => array(
                'component' => array(
                    'product_category' => array(
                        'skin'=>'hydrus',
                        'template' => 'd_visualize/template/component/product_category/default.twig',
                        'description_after' => true,
                        'description' => array(
                            'template' => 'd_visualize/template/component/product/category_description/default.twig')
                    )
                ),
            ),
            'scripts' => array(),
            'styles' => array()
        ),
        'checkout/cart' => array(
            'layout' => array(
                'component' => array(
                    'checkout_cart' => array(
                        'template' => 'd_visualize/template/component/checkout_cart/default.twig',
                    )
                ),
            ),
            'scripts' => array()
        ),
        'extension/d_blog_module/post' => array(
            'layout' => array(
                'columns' => array(
                    'left' => 'col-12 col-sm-4',
                    'main' => array(
                        'two_col' => 'col-12 col-sm-8',
                    ),
                    'right' => 'col-12 col-sm-4'
                )
            )
        ),
        'extension/d_blog_module/category' => array(
            'layout' => array(
                'columns' => array(
                    'left' => 'col-12 col-sm-4',
                    'main' => array(
                        'two_col' => 'col-12 col-sm-8',
                    ),
                    'right' => 'col-12 col-sm-4'
                )
            )
        )
    ),
    'pre_scripts' => array(
        'catalog/view/javascript/bootstrap/js/bootstrap.min.js',
        'catalog/view/javascript/jquery/jquery-2.1.1.min.js',
    ),
    'post_scripts' => array(
        'catalog/view/javascript/d_bootstrap_rating/bootstrap-rating.min.js',
    ),
    'post_styles' => array(
        'catalog/view/javascript/d_bootstrap_rating/bootstrap-rating.css',
    ),
    'pre_styles' => array(
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css',
        'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
        'https://use.fontawesome.com/releases/v5.2.0/css/v4-shims.css',
        'catalog/view/theme/d_visualize/stylesheet/dist/bootstrap.css',
        'catalog/view/theme/d_visualize/stylesheet/dist/bootstrap-grid.css',
        'https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,700,900&subset=cyrillic',
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