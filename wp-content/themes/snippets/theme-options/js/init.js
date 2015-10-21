/* Cookies */
function createCookie(name,value,days){
	if(days){
		var date=new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires="; expires="+date.toGMTString()
	}else var expires="";
	document.cookie=name+"="+value+expires+"; path=/"
}
function readCookie(name){
	var nameEQ=name+"=";
	var ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++){
		var c=ca[i];
		while(c.charAt(0)==' ')c=c.substring(1,c.length);
		if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length)
	}
	return null
}
function eraseCookie(name){
	createCookie(name,"",-1)
}

jQuery(document).ready(function($) {

	// Tabs
	$('#sa-wrapper .sa-pane:not(:first)').hide();
	$('#sa-tabs a').click(function() {
		$('.sa-spin, .sa-spin-success').hide();
		$('#sa-tabs a').removeClass('sa-current');
		$(this).addClass('sa-current');
		$('#sa-wrapper .sa-pane').hide();
		$('#sa-wrapper .sa-pane').eq($(this).index()).show();
		createCookie('slick_admin_last_tab',$(this).attr('href'),100);
	});
	if ( window.location.hash != '' ) {
		$('#sa-tabs a[href="' + window.location.hash + '"]').click();
	}
	else if ( readCookie('slick_admin_last_tab') != null ) {
		$('#sa-tabs a[href="' + readCookie('slick_admin_last_tab') + '"]').click();
	}
	else {
		$('#sa-tabs a:first').click();
	}

	// Option boxes
	$('.sa-pane .sa-option-box:odd').addClass('sa-option-box-odd');

	// Form elements
	$('select, input:checkbox, input:radio, input:file').uniform();

	// AJAX form
	$('#sa-form-save-settings').ajaxForm({
		beforeSubmit: function() {
			$('#sa-form-save-settings .sa-spin').fadeIn(200);
			$('#sa-form-save-settings .sa-spin-success').hide();
			$('#sa-form-save-settings .sa-submit').attr('disabled', true);
		},
		success: function() {
			$('#sa-form-save-settings .sa-spin').hide();
			$('#sa-form-save-settings .sa-spin-success').show();
			setTimeout(function() {
				$('#sa-form-save-settings .sa-spin-success').fadeOut(200);
			}, 2000);
			$('#sa-form-save-settings .sa-submit').attr('disabled', false);
		}
	});

	// Upload
	jQuery('.sa-upload-button').click(function() {
		window.sa_current_upload = $(this).attr('rel');
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		return false;
	});

	window.send_to_editor = function(html) {
		var url = jQuery('img',html).attr('src');
		$('input.sa-upload-field[name="' + window.sa_current_upload + '"]').val(url);
		tb_remove();
	}

	// Reset prompt
	$('.sa-reset').click(function() {
		if (!confirm($(this).attr('title'))) {
			return false;
		} else {
			return true;
		}
	});

	// Colorpicker
	$('.sa-colorpicker').each(function(index, element) {
		$(element).ColorPicker({
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			},
			onShow: function (colpkr) {
				$(colpkr).show(200);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(100);
				return false;
			},
			onChange: function (hsb, hex, rgb, el) {
				//$(this).val(hex);
				$(element).val(hex);
				$(element).next('.sa-swatch').css('background-color', '#' + hex);
			},
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).val(hex);
				$(el).ColorPickerHide();
			}
		});
	});
	$('.sa-swatch').click(function() {
		$(this).parent('.sa-option-field').children('.sa-colorpicker').click();
	});

	// Sa-help
	$('.sa-help').click(function(event) {
		jQuery(this).toggleClass('sa-help-open');

		event.stopPropagation();
	});
	$(document).click(function() {
		jQuery('.sa-help-open').removeClass('sa-help-open');
	});

	// Slides
	$('.sa-slide-toggle').live('click', function() {
		$(this).parent('.sa-slide').toggleClass('sa-slide-open');
	});

	$('.sa-slide-remove').live('click', function() {
		if ( confirm( $(this).attr('title') ) ) {
			$(this).parent('.sa-slide').remove();
		}
	});
	$('.sa-option-slides').sortable();

	var slide_template = $('.sa-slide-template:first').html();
	$('.sa-slide-template').remove();
	$('.sa-add-slide').click(function() {
		var now_slides = $(this).parent('.sa-option-slides').children('.sa-slide').length;
		var new_slide = slide_template.replace(/%NUMBER%/g, now_slides);
		$(this).next('.sa-clear').after(new_slide);
		$(this).parent('.sa-option-slides').children('.sa-slide:first').children('label:first').children('input:text').focus();
		return false;
	});

});