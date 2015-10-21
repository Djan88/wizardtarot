<div class="sa-option-box">
	<h3 class="sa-option-title"><?php echo $params['name'] ?></h3>
	<div class="sa-option-field">
		<?php
			foreach ( $params['options'] as $value => $label ) {
				$checked = ( sa_option( $params['id'] ) == $value ) ? ' checked="checked"' : '';
				?>
				<label class="sa-radio-label"><input type="radio" name="<?php echo $params['id']; ?>" value="<?php echo $value; ?>"<?php echo $checked; ?>> <?php echo $label; ?></label>
				<?php
			}
		?>
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