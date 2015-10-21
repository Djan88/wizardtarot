<?php
	$checked = ( sa_option( $params['id'] ) == 'on' ) ? ' checked="checked"' : '';
?>

<div class="sa-option-box">
	<h3 class="sa-option-title"><?php echo $params['name'] ?></h3>
	<div class="sa-option-field">
		<label><input type="checkbox" name="<?php echo $params['id']; ?>"<?php echo $checked; ?> /> <?php echo $params['label'] ?></label>
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