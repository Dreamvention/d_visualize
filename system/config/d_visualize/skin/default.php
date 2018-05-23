<?php
$_['d_visualize_skin_default'] = array(
    'name'        => 'Default skin',
    'description' => 'Skin from default opencart',
    'page'        => array(
        'default'     => array(
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
                                'template' => 'd_visualize/template/component/d_product_sort/default.twig'
                            )
                        )
                    ),
                    'd_product_thumb' => array(
                        'template'   => 'd_visualize/template/partial/d_product_thumb.twig', // here can be custom settings for this template
                        'components' => array(
                            'd_product_thumb' => array(
                                'template'   => 'd_visualize/template/component/d_product_thumb/default.twig',
                                'partials'   => array('d_rating'),//may be if we want to insert component to component we have to just declare only name and can use in components.d_rating
                                'components' => array(
                                    'd_rating' => array(
                                        'template' => 'd_visualize/template/component/d_rating/default.twig'
                                    )
                                )
                            )
                        )
                    ),
                    'd_rating'        => array(
                        'template'   => 'd_visualize/template/component/d_rating/default.twig',
                        'components' => array(
                            'd_rating' => array(
                                'template' => 'd_visualize/template/component/d_rating/default.twig'
                            )
                        )
                    )
                ,
                ),
                'components'      => array(
                    'notification'        => array(
                        'template'   => 'd_visualize/template/component/notification/default.twig',
                    )
                ),
            ),
            'blocks' => array('main_wrapper', 'before_content', 'content', 'after_content')
        ),
        'common/home' => array(
            'partial' => array(
                'breadcrumb' => array(
                    'template'   => 'd_visualize/template/partial/d_breadcrumb.twig', // here can be custom settings for this template
                    'components' => array(
                        'breadcrumb' => array(
                            'template' => 'd_visualize/template/component/d_breadcrumb/empty.twig'
                        )
                    )
                ),
            ),
        ),
    ),
    'events'      => array(),

);
$_['dependency'] = array(
    "animate"   => "^1.0.0",
    "bootstrap" => "^4.0.0-beta",
    'jquery'    => '^2.1.1',
);