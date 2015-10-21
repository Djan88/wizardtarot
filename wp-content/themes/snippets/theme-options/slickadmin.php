<?php

	/**
	 * Slick Admin
	 *
	 * Theme options script by Vladimir Anokhin
	 *
	 * @see http://ilovecode.ru/
	 */
	// Localization
	load_theme_textdomain( 'slickadmin', dirname( __FILE__ ) . '/languages' );

	// Functions
	require_once( dirname( __FILE__ ) . '/functions.php' );

	/**
	 * Scripts and stylesheets
	 */
	function sa_init_head() {

		global $pagenow;
		if ( $pagenow == 'themes.php' && $_GET['page'] == 'theme-options' ) {

			// Register
			wp_register_style( 'slickadmin-colorpicker', sa_info( 'url' ) . '/css/colorpicker.css', false, sa_info( 'ver' ), 'all' );
			wp_register_style( 'slickadmin-uniform', sa_info( 'url' ) . '/css/uniform.css', false, sa_info( 'ver' ), 'all' );
			wp_register_style( 'slickadmin', sa_info( 'url' ) . '/css/style.css', false, sa_info( 'ver' ), 'all' );

			wp_register_script( 'slickadmin-form', sa_info( 'url' ) . '/js/form.js', false, sa_info( 'ver' ), false );
			wp_register_script( 'slickadmin-colorpicker', sa_info( 'url' ) . '/js/colorpicker.js', false, sa_info( 'ver' ), false );
			wp_register_script( 'slickadmin-uniform', sa_info( 'url' ) . '/js/uniform.js', false, sa_info( 'ver' ), false );
			wp_register_script( 'slickadmin-init', sa_info( 'url' ) . '/js/init.js', false, sa_info( 'ver' ), true );

			// Enqueue
			wp_enqueue_style('thickbox');
			wp_enqueue_style( 'slickadmin-colorpicker' );
			wp_enqueue_style( 'slickadmin-uniform' );
			wp_enqueue_style( 'slickadmin' );

			wp_enqueue_script( 'jquery' );
			wp_enqueue_script( 'jquery-ui-core' );
			wp_enqueue_script( 'jquery-ui-widget' );
			wp_enqueue_script( 'jquery-ui-mouse' );
			wp_enqueue_script( 'jquery-ui-sortable' );
			wp_enqueue_script( 'media-upload' );
			wp_enqueue_script( 'thickbox' );
			wp_enqueue_script( 'slickadmin-form' );
			wp_enqueue_script( 'slickadmin-colorpicker' );
			wp_enqueue_script( 'slickadmin-uniform' );
			wp_enqueue_script( 'slickadmin-init' );
		}
	}

	add_action( 'admin_init', 'sa_init_head' );

	/**
	 * Add Slick Admin options page
	 */
	function sa_add_admin_page() {
		add_submenu_page( 'themes.php', sa_info( 'title' ), sa_info( 'title' ), 'administrator', sa_info( 'page' ), 'sa_admin_page' );
	}

	add_action( 'admin_menu', 'sa_add_admin_page' );

	/**
	 * Insert default settigns in database
	 */
	function sa_insert_defaults() {

		global $pagenow;

		if ( !get_option( sa_info( 'option' ) ) ) {

			// Get theme options
			$options = sa_theme_options();

			foreach ( $options as $value ) {
				$defaults[$value['id']] = $value['std'];
			}

			// Insert theme options
			update_option( sa_info( 'option' ), $defaults );
		}
	}

	add_action( 'admin_init', 'sa_insert_defaults' );

	/**
	 * Save/reset options action
	 */
	function sa_manage_options() {

		// Save options
		if ( $_POST['action'] == 'save' && $_GET['page'] == sa_info( 'page' ) ) {

			$options = sa_theme_options();

			foreach ( $options as $value ) {
				$new_options[$value['id']] = ( is_array( $_POST[$value['id']] ) ) ? $_POST[$value['id']] : htmlspecialchars( $_POST[$value['id']] );
			}

			// Save new options
			if ( update_option( sa_info( 'option' ), $new_options ) ) {

				// Redirect
				header( 'Location: ' . admin_url( 'themes.php?page=' . sa_info( 'page' ) . '&saved=true' ) );
			}

			// Options not saved
			else {

				// Redirect
				header( 'Location: ' . admin_url( 'themes.php?page=' . sa_info( 'page' ) . '&saved=false' ) );
			}
		}

		// Reset options
		elseif ( $_GET['action'] == 'reset' && $_GET['page'] == sa_info( 'page' ) ) {

			$options = sa_theme_options();

			foreach ( $options as $value ) {
				$new_options[$value['id']] = $value['std'];
			}

			// Save new options
			if ( update_option( sa_info( 'option' ), $new_options ) ) {

				// Redirect
				header( 'Location: ' . admin_url( 'themes.php?page=' . sa_info( 'page' ) . '&reseted=true' ) );
			}
		}
	}

	add_action( 'admin_init', 'sa_manage_options' );
?>