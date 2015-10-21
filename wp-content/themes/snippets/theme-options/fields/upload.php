<div class="sa-option-box">
	<h3 class="sa-option-title"><?php echo $params['name'] ?></h3>
	<div class="sa-option-field">
		<input type="text" name="<?php echo $params['id']; ?>" value="<?php echo sa_option( $params['id'] ); ?>" class="sa-upload-field" /> <a href="#" class="sa-upload-button" rel="<?php echo $params['id']; ?>"><?php _e( 'Browse', 'slickadmin' ); ?></a>
	</div>
	<?php
		if ( isset( $params['desc'] ) ) {
			?>
			<span class="sa-help" title="<?php echo $params['desc']; ?>"><?php echo $params['desc']; ?></span>
			<?php
		}
	?>
	<div class="sa-clear"></div>
</div>