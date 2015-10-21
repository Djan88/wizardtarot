<?php

// Load Slick Admin
require_once('slickadmin.php');

// Slick admin directory, relative to theme directory
define('SA_DIR', '/theme-options');

// Slick admin menu and panel title
define('SA_TITLE', __('Настройки сайта', 'slickadmin'));

/**
 * Theme options
 *
 * @return array Theme options
 */
function sa_theme_options()
{
    $options = array(

        /*
         * Первый блок
         */
        array(
            'id' => 'standard',
            'type' => 'opentab',
            'name' => __('Настройки слайдера', 'slickadmin'),
        ),
        array(
            'name' => __('Текст на слайдере сверху', 'slickadmin'),
            'id' => 'slider_up_static',
            'type' => 'text',
        ),
        array(
            'name' => __('Текст на слайдере снизу', 'slickadmin'),
            'id' => 'slider_down_static',
            'type' => 'text',
        ),
        array(
            'type' => 'closetab',
        ),

        /*
        * Второй блок
        */
        array(
            'id' => 'standard',
            'type' => 'opentab',
            'name' => __('Блок быстрой навигации', 'slickadmin'),
        ),
        array(
            'name' => __('Заголовок #1', 'slickadmin'),
            'id' => 'quicknav1',
            'type' => 'text',
        ),
        array(
            'name' => __('Заголовок #2', 'slickadmin'),
            'id' => 'quicknav2',
            'type' => 'text',
        ),
        array(
            'type' => 'closetab',
        ),
    );

    return $options;
}
