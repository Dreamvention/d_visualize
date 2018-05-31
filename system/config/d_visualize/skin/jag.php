<?php
$_['d_visualize_skin_jag'] = array(
    'name'          => 'Default skin',
    'description'   => 'Skin from default opencart',
    'page'          => array(
        'default'          => array(
            'layout' => array(
                'template'        => 'd_visualize/template/layout/default.twig', // here can be custom settings for this template
                'container_width' => '1024',
                'partial'         => array(
                    'breadcrumb'      => array(
                        'template'   => 'd_visualize/template/partial/d_breadcrumb.twig', // here can be custom settings for this template
                        'components' => array(
                            'breadcrumb' => array(
                                'template' => 'd_visualize/template/component/d_breadcrumb/default.twig'
                            )
                        )
                    ),
                    'd_product_sort'  => array(
                        'template'   => 'd_visualize/template/partial/d_product_sort.twig', // here can be custom settings for this template
                        'components' => array(
                            'd_product_sort' => array(
                                'template' => 'd_visualize/template/component/d_product_sort/jag.twig'
                            )
                        )
                    ),
                    'd_product_thumb' => array(
                        'template'   => 'd_visualize/template/partial/d_product_thumb.twig', // here can be custom settings for this template
                        'components' => array(
                            'd_product_thumb' => array(
                                'template'   => 'd_visualize/template/component/d_product_thumb/jag.twig',
                                'partials'   => array('d_rating'),//may be if we want to insert component to component we have to just declare only name and can use in components.d_rating
                                'components' => array(
                                    'd_rating' => array(
                                        'template' => 'd_visualize/template/component/d_rating/default.twig'
                                    )
                                )
                            )
                        )
                    ),
                    'd_product_list'  => array(
                        'template'   => 'd_visualize/template/partial/d_product_list.twig', // here can be custom settings for this template
                        'components' => array(
                            'd_product_list' => array(
                                'template' => 'd_visualize/template/component/d_product_list/jag.twig',
                            )
                        )
                    ),
                    'd_rating'        => array(
                        'template'   => 'd_visualize/template/partial/d_rating.twig',
                        'components' => array(
                            'd_rating' => array(
                                'template' => 'd_visualize/template/component/d_rating/default.twig'
                            )
                        )
                    ),
                    'd_review'        => array(
                        'template'   => 'd_visualize/template/partial/d_review.twig',
                        'components' => array(
                            'd_review' => array(
                                'template' => 'd_visualize/template/component/d_review/jag.twig'
                            )
                        )
                    )
                ,
                ),
                'components'      => array(
                    'notification' => array(
                        'template' => 'd_visualize/template/component/notification/default.twig',
                    )
                ),
            ),
            'blocks' => array('main_wrapper', 'before_content', 'content', 'after_content')
        ),
        'common/home'      => array(
            'layout' => array(
                'partial' => array(
                    'breadcrumb' => array(
                        'template'   => 'd_visualize/template/partial/d_breadcrumb.twig', // here can be custom settings for this template
                        'components' => array(
                            'breadcrumb' => array(
                                'template' => 'd_visualize/template/component/d_breadcrumb/empty.twig'
                            )
                        )
                    ),
                )
            ),
        ),
        'product/product'  => array(
            'layout'  => array(
                'components' => array(
                    'product_section' => array(
                        'template' => 'd_visualize/template/component/product_section/jag.twig',

                    ),
                    'options' => array(
                        'template' => 'd_visualize/template/component/product_options/jag.twig',

                    )
                ),
            ),
            'scripts' => array(
                'catalog/view/javascript/jquery/magnific/jquery.magnific-popup.min.js',
            )
        ),
        'product/category' => array(
            'layout'  => array(
                'components' => array(
                    'category_section' => array(
                        'template' => 'd_visualize/template/component/category_section/jag.twig',
                    )
                ),
            ),
            'scripts' => array()
        ),
        'checkout/cart'    => array(
            'layout'  => array(
                'components' => array(
                    'checkout_cart' => array(
                        'template' => 'd_visualize/template/component/checkout_cart/jag.twig',
                    )
                ),
            ),
            'scripts' => array()
        )
    ),
    'scripts'       => array(
        'catalog/view/theme/d_visualize/javascript/skin/jag/d_default.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
        'https://code.jquery.com/jquery-2.1.1.min.js',
    ),
    'styles'        => array(
        'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
        'catalog/view/theme/d_visualize/stylesheet/core/lib/bootstrap3/css/bootstrap.min.css',
        'catalog/view/theme/d_visualize/stylesheet/core/lib/bootstrap4/bootstrap-grid.min.css',
        'https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,700,900&subset=cyrillic',
    ),
    'custom_styles' => array(
        ''
    )
);
$_['config_theme_jag'] = array(
    'product_thumb_size' => array('width' => '707', 'height' => '707')
);