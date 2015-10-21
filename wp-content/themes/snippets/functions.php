<?php
/*
 * Добавляем поддержку меню в систему и регистрируем новое
 */
register_nav_menu('menu','menu');

/*
 * Добавляем в тему поддержку миниатюр записи
 */
add_theme_support ('post-thumbnails');

/*
 * Добавляем в тему возможность настройки
 */
require_once( 'theme-options/theme-options.php' );

/*
 * Фикс функции для получения пути, теперь возможны русские символы. Используется в ресайзере изображений vt_resize
 */
if ( !function_exists( 'pathinfo_utf') ) {
    function pathinfo_utf($path) {

        if (strpos($path, '/') !== false)
            $basename = end(explode('/', $path));
        elseif (strpos($path, '\\') !== false)
            $basename = end(explode('\\', $path));
        else
            return false;

        if (!$basename)
            return false;

        $dirname = substr($path, 0,
            strlen($path) - strlen($basename) - 1);

        if (strpos($basename, '.') !== false) {
            $extension = end(explode('.', $path));
            $filename = substr($basename, 0,
                strlen($basename) - strlen($extension) - 1);
        } else {
            $extension = '';
            $filename = $basename;
        }

        return array (
            'dirname' => $dirname,
            'basename' => $basename,
            'extension' => $extension,
            'filename' => $filename
        );
    }
}

/*
 * Функция для ресайза изображений
 */
if ( !function_exists( 'vt_resize') ) {
    function vt_resize( $attach_id = null, $img_url = null, $width, $height, $crop = false ) {

        // this is an attachment, so we have the ID
        if ( $attach_id ) {

            $image_src = wp_get_attachment_image_src( $attach_id, 'full' );
            $file_path = get_attached_file( $attach_id );

            // this is not an attachment, let's use the image url
        } else if ( $img_url ) {

            $file_path = parse_url( $img_url );
            $file_path = $_SERVER['DOCUMENT_ROOT'] . $file_path['path'];

            // Look for Multisite Path
            if(file_exists($file_path) === false){
                global $blog_id;
                $file_path = parse_url( $img_url );
                if (preg_match("/files/", $file_path['path'])) {
                    $path = explode('/',$file_path['path']);
                    foreach($path as $k=>$v){
                        if($v == 'files'){
                            $path[$k-1] = 'wp-content/blogs.dir/'.$blog_id;
                        }
                    }
                    $path = implode('/',$path);
                }
                $file_path = $_SERVER['DOCUMENT_ROOT'].$path;
            }
            //$file_path = ltrim( $file_path['path'], '/' );
            //$file_path = rtrim( ABSPATH, '/' ).$file_path['path'];

            $orig_size = getimagesize( $file_path );

            $image_src[0] = $img_url;
            $image_src[1] = $orig_size[0];
            $image_src[2] = $orig_size[1];
        }

        $file_info = pathinfo_utf( $file_path );

        // check if file exists
        $base_file = $file_info['dirname'].'/'.$file_info['filename'].'.'.$file_info['extension'];
        if ( !file_exists($base_file) )
            return;

        $extension = '.'. $file_info['extension'];

        // the image path without the extension
        $no_ext_path = $file_info['dirname'].'/'.$file_info['filename'];

        $cropped_img_path = $no_ext_path.'-'.$width.'x'.$height.$extension;

        // checking if the file size is larger than the target size
        // if it is smaller or the same size, stop right here and return
        if ( $image_src[1] > $width ) {

            // the file is larger, check if the resized version already exists (for $crop = true but will also work for $crop = false if the sizes match)
            if ( file_exists( $cropped_img_path ) ) {

                $cropped_img_url = str_replace( basename( $image_src[0] ), basename( $cropped_img_path ), $image_src[0] );

                $vt_image = array (
                    'url' => $cropped_img_url,
                    'width' => $width,
                    'height' => $height
                );

                return $vt_image;
            }

            // $crop = false or no height set
            if ( $crop == false OR !$height ) {

                // calculate the size proportionaly
                $proportional_size = wp_constrain_dimensions( $image_src[1], $image_src[2], $width, $height );
                $resized_img_path = $no_ext_path.'-'.$proportional_size[0].'x'.$proportional_size[1].$extension;

                // checking if the file already exists
                if ( file_exists( $resized_img_path ) ) {

                    $resized_img_url = str_replace( basename( $image_src[0] ), basename( $resized_img_path ), $image_src[0] );

                    $vt_image = array (
                        'url' => $resized_img_url,
                        'width' => $proportional_size[0],
                        'height' => $proportional_size[1]
                    );

                    return $vt_image;
                }
            }

            // check if image width is smaller than set width
            $img_size = getimagesize( $file_path );
            if ( $img_size[0] <= $width ) $width = $img_size[0];

            // Check if GD Library installed
            if (!function_exists ('imagecreatetruecolor')) {
                echo 'GD Library Error: imagecreatetruecolor does not exist - please contact your webhost and ask them to install the GD library';
                return;
            }

            // no cache files - let's finally resize it
            $new_img_path = image_resize( $file_path, $width, $height, $crop );
            $new_img_size = getimagesize( $new_img_path );
            $new_img = str_replace( basename( $image_src[0] ), basename( $new_img_path ), $image_src[0] );

            // resized output
            $vt_image = array (
                'url' => $new_img,
                'width' => $new_img_size[0],
                'height' => $new_img_size[1]
            );

            return $vt_image;
        }

        // default output - without resizing
        $vt_image = array (
            'url' => $image_src[0],
            'width' => $width,
            'height' => $height
        );

        return $vt_image;
    }
};

/*
 * Вывод "хлребных крошек"
 */
function the_breadcrumb() {
    echo '';
    if (!is_front_page()) {
        echo '<a href="';
        echo get_option('home');
        echo '">Главная';
        echo "</a>".' >> ';
        if (is_category() || is_single()) {
            the_category(' ');
            if (is_single()) {
                echo ' >> ';
                the_title();
            }
        } elseif (is_page()) {
            echo the_title();
        }
    }
    else {
        echo 'Главная';
    }
}

/*
 * Функция паджинации
 */
function wp_corenavi($wp_query) {

    $pages = '';
    $max = $wp_query->max_num_pages;
    if (!$current = get_query_var('paged')) $current = 1;
    $a['base'] = str_replace(999999999, '%#%', get_pagenum_link(999999999));
    $a['total'] = $max;
    $a['current'] = $current;

    $total = 1; //1 - выводить текст "Страница N из N", 0 - не выводить
    $a['mid_size'] = 3; //сколько ссылок показывать слева и справа от текущей
    $a['end_size'] = 1; //сколько ссылок показывать в начале и в конце
    $a['prev_text'] = '&laquo;'; //текст ссылки "Предыдущая страница"
    $a['next_text'] = '&raquo;'; //текст ссылки "Следующая страница"

    if ($max > 1) echo '<div class="navigation">';
    //if ($total == 1 && $max > 1) $pages = '<span class="pages">Страница ' . $current . ' из ' . $max . '</span>'."\r\n";
    echo $pages . paginate_links($a);
    if ($max > 1) echo '</div>';
}
