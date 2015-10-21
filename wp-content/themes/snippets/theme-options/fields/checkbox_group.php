<div class="sa-option-box">
	<h3 class="sa-option-title"><?php echo $params['name'] ?></h3>
	<div class="sa-option-field sa-checkbox-group">
		<?php
			foreach ( $params['options'] as $value => $label ) {
				?>
				<label><input type="checkbox" name="<?php echo $params['id']; ?>[<?php echo $value; ?>]"<?php echo $checked; ?> /> <?php echo $label ?></label>
				<?php
			}
		?>
		<div class="sa-clear"></div>
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