<?php
/*
 * Template Name: Шаблон главной
 */
?>

<?php get_header(); ?>


<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>

        <?php
        $url = wp_get_attachment_url(get_post_thumbnail_id($post->ID));
        $image = vt_resize(null, $url, 220, 220, true);
        if (!$image['url']) $image['url'] = 'http://placehold.it/220x220&text=NO IMAGE';
        ?>
        <?php the_title(); ?>
        <?php the_content(); ?>
    <?php endwhile; ?>
<?php else: ?>
    <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
<?php endif; ?>

<?php

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array(
    'post_type' => 'news',
    'posts_per_page' => '3',
    'paged' => $paged
);

$the_query = new WP_Query($args);
?>

<?php if ($the_query->have_posts()) : ?>
    <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

        <?php
        $url = wp_get_attachment_url(get_post_thumbnail_id($the_query->post->ID));
        $image = vt_resize(null, $url, 220, 220, true);
        if (!$image['url']) $image['url'] = 'http://placehold.it/220x220&text=NO IMAGE';
        ?>
        <?php echo $image['url']; ?>

        <?php the_title(); ?>
        <?php the_content('Читать далее...'); ?>

    <?php endwhile; ?>

    <?php wp_corenavi($the_query); ?>
    <?php wp_reset_postdata(); ?>
<?php else: ?>
    <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
<?php endif; ?>

<?php get_footer(); ?>
<!-- ___________________________________________________________________ -->

<!-- Вывод записей из категории на страницу -->
<?php 
    // WP_Query arguments
    $args_spec = array (
            'cat'              => '5',
            'posts_per_page'         => '8',
            'orderby'                => 'id',
    );

    // The Query
    $query = new WP_Query( $args_spec );



    while ($query->have_posts()) : $query->the_post();

        echo '<div class="col-sm-3 col-md-3 spect">';
        echo '<a href="'.get_permalink().'">';
        if( get_the_post_thumbnail()){
          echo '<img src="'.the_post_thumbnail("permalink").'" alt="'.the_title().'">';
        } else {
          echo '<img src="/wp-content/themes/kdk/img/none_img.jpg" alt="alt">';
        };
        echo '<p class="desc">'.the_title().'</p>';
        echo '<p class="date">'.the_field('period').'</p></a></div>';

    endwhile;
    wp_reset_postdata(); 

?>
<!-- ___________________________________________________________________ -->
