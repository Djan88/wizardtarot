	<div class="sa-action-buttons sa-action-buttons-bottom">
			<input type="submit" value="<?php _e( 'Save settings', 'slickadmin' ); ?>" class="button-primary sa-submit" />
	<span class="sa-spin"><img src="<?php echo sa_info( 'url' ); ?>/images/spin.gif" alt="" /> <?php _e( 'Saving', 'slickadmin' ); ?>&hellip;</span>
	<span class="sa-spin-success"><img src="<?php echo sa_info( 'url' ); ?>/images/success.png" alt="" /> <?php _e( 'Saved', 'slickadmin' ); ?></span>
	<a href="<?php echo admin_url( 'themes.php?page=' . sa_info( 'page' ) . '&action=reset' ); ?>" class="button alignright sa-reset" title="<?php _e( 'Are you sure? It can not be undone!', 'slickadmin' ); ?>"><?php _e( 'Reset settings', 'slickadmin' ); ?></a>
	</div>
</div>