<div class="sa-option-box">
	<h3 class="sa-option-title"><?php echo $params['name'] ?></h3>
	<div class="sa-option-field sa-select">
		<select name="<?php echo $params['id']; ?>">
			<?php
				foreach ( $params['options'] as $value => $label ) {
					$selected = ( sa_option( $params['id'] ) == $value ) ? ' selected="selected"' : '';
					?>
					<option value="<?php echo $value; ?>"<?php echo $selected; ?>><?php echo $label; ?></option>
					<?php
				}
			?>
		</select>
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