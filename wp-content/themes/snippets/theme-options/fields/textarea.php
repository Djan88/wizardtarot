<?php
	$rows = ( $params['rows'] ) ? $params['rows'] : 7;
?>

<div class="sa-option-box">
	<h3 class="sa-option-title"><?php echo $params['name'] ?></h3>
	<div class="sa-option-field">
		<textarea name="<?php echo $params['id']; ?>" rows="<?php echo $rows; ?>"><?php echo sa_option( $params['id'] ); ?></textarea>
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