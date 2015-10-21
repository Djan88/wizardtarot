<?php

	/**
	 * Get SA info
	 *
	 * title, themename, shortname, page, option, dir, url, ver
	 *
	 * @param string $option Option name
	 * @return mixed Option value
	 */
	function sa_info( $option = null ) {

		$options = array(
			'title' => SA_TITLE,
			'themename' => get_current_theme(),
			'shortname' => str_replace( ' ', '_', htmlspecialchars( mb_strtolower( get_current_theme() ) ) ),
			'page' => 'theme-options',
			'option' => 'sa_' . str_replace( ' ', '_', htmlspecialchars( mb_strtolower( get_current_theme() ) ) ) . '_theme_options',
			'dir' => TEMPLATEPATH . SA_DIR,
			'rel_path' => str_replace( site_url(), '', get_template_directory_uri() ) . SA_DIR,
			'url' => get_bloginfo( 'template_url' ) . SA_DIR,
			'ver' => '5.0'
		);
		return ( $option ) ? $options[$option] : false;
	}

	/**
	 * Get option from database
	 *
	 * @param string $option Option name
	 * @return mixed Option value
	 */
	function sa_option( $option = false ) {

		// Get options from database
		$options = get_option( sa_info( 'option' ) );

		$value = ( $option ) ? $options[$option] : 'No option specified!';

		return ( is_array( $value ) ) ? $value : stripslashes( $value );
	}

	/**
	 * Options page
	 */
	function sa_admin_page() {
		echo '<form action="" id="sa-form-save-settings" method="post">';
		include( 'template.php' );
		echo '<input type="hidden" name="action" value="save" />';
		echo '</form>';
	}

	/**
	 * Notifications
	 */
	function sa_notification() {

		// No-js message
		echo '<div class="error sa-no-js sa-notification"><p>' . __( 'For full functionality of this page it is recommended to enable JavaScript.', 'slickadmin' ) . ' <a href="http://www.enable-javascript.com/" target="_blank">' . __( 'Instructions', 'slickadmin' ) . '</a></p></div>';

		// Options reseted
		if ( $_GET['reseted'] == 'true' ) {
			echo '<div class="updated sa-notification"><p>' . __( 'Options reseted', 'slickadmin' ) . '</p></div>';
		}

		// Saved
		if ( $_GET['saved'] == 'true' ) {
			echo '<div class="sa-success sa-notification"><p>' . __( 'Settings saved', 'slickadmin' ) . '</p></div>';
		}

		// No changes
		elseif ( $_GET['saved'] == 'false' ) {
			echo '<div class="error sa-notification"><p>' . __( 'No changes', 'slickadmin' ) . '</p></div>';
		}
	}

	/**
	 * Tabs
	 */
	function sa_tabs() {
		$tabs = sa_theme_options();
		$first = true;
		foreach ( $tabs as $tab ) {
			$class = ( $first ) ? ' class="sa-current"' : '';
			switch ( $tab['type'] ) {
				case 'opentab' :
					echo '<a href="#' . $tab['id'] . '"' . $class . '><span style="background:10px 11px url(' . sa_info( 'url' ) . '/images/menu-icons/' . $tab['id'] . '.png) no-repeat">' . $tab['name'] . '</span></a>';
					break;
			}
			$first = false;
		}
	}

	/**
	 * Panes
	 */
	function sa_panes() {

		// Get default options
		$options = sa_theme_options();

		// Get options from database
		$settings = get_option( sa_info( 'option' ) );

		// Options loop
		foreach ( $options as $option ) {
			sa_option_box( $option['type'], $option );
		}
	}

	/**
	 * Option box
	 */
	function sa_option_box( $type, $params ) {
		include( sa_info( 'dir' ) . '/fields/' . $type . '.php' );
	}

	function sa_options_generator() {
		if ( isset( $_GET['generator'] ) ) {
			?>

			<div id="sa-options-generator">
							GENERATOR
			</div>

			<?php
		}
	}
?>