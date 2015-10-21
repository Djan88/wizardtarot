<div class="wrap">

	<div id="sa-wrapper">

		<div id="sa-wrapper-shell">

			<span id="sa-logo"><?php echo sa_info( 'title' ); ?></span>

			<div id="sa-support">
				<strong><?php echo sa_info( 'themename' ); ?></strong><br/>
				<a href="http://docs.gndev.info/<?php echo sa_info( 'shortname' ); ?>" target="_blank"><?php _e( 'Documentation', 'slickadmin' ); ?></a>
				<a href="http://twitter.com/gn_themes/" target="_blank">Twitter</a>
				<a href="http://themeforest.net/user/gooodnews" target="_blank"><?php _e( 'Ask question', 'slickadmin' ); ?></a>
			</div>

			<div id="sa-tabs">
				<?php sa_tabs(); ?>
			</div>

			<div id="sa-panes">
				<?php sa_notification(); ?>
				<?php sa_panes(); ?>
			</div>

			<div class="sa-clear"></div>

		</div>

	</div>

</div>