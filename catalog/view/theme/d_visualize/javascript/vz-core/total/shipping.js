var Total_shipping = {

	setting: {
		shipping_method: 'shipping_method',
		text_shipping_method: 'text_shipping_method',
		text_loading: 'text_loading',
		button_cancel: 'button_cancel',
		button_shipping: 'button_shipping'
	},
	init: function(setting){
		console.log('start Total_shipping');
		this.setting = $.extend({}, this.setting, setting);
		this.render();
	},

	clickQoute: function(){
		var that = this;
		$.ajax({
			url: 'index.php?route=total/shipping/quote',
			type: 'post',
			data: 'country_id=' + $('select[name=\'country_id\']').val() + '&zone_id=' + $('select[name=\'zone_id\']').val() + '&postcode=' + encodeURIComponent($('input[name=\'postcode\']').val()),
			dataType: 'json',
			beforeSend: function() {
				$('#button-quote').button('loading');
			},
			complete: function() {
				$('#button-quote').button('reset');
			},
			success: function(json) {
				$('.alert, .text-danger').remove();

				if (json['error']) {
					if (json['error']['warning']) {
						$('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

						$('html, body').animate({ scrollTop: 0 }, 'slow');
					}

					if (json['error']['country']) {
						$('select[name=\'country_id\']').after('<div class="text-danger">' + json['error']['country'] + '</div>');
					}

					if (json['error']['zone']) {
						$('select[name=\'zone_id\']').after('<div class="text-danger">' + json['error']['zone'] + '</div>');
					}

					if (json['error']['postcode']) {
						$('input[name=\'postcode\']').after('<div class="text-danger">' + json['error']['postcode'] + '</div>');
					}
				}

				if (json['shipping_method']) {
					$('#modal-shipping').remove();

					html  = '<div id="modal-shipping" class="modal">';
					html += '  <div class="modal-dialog">';
					html += '    <div class="modal-content">';
					html += '      <div class="modal-header">';
					html += '        <h4 class="modal-title">'+that.setting.text_shipping_method+'</h4>';
					html += '      </div>';
					html += '      <div class="modal-body">';

					for (var i in json['shipping_method']) {
						html += '<p><strong>' + json['shipping_method'][i]['title'] + '</strong></p>';

						if (!json['shipping_method'][i]['error']) {
							for (var j in json['shipping_method'][i]['quote']) {
								html += '<div class="radio">';
								html += '  <label>';

								if (json['shipping_method'][i]['quote'][j]['code'] == that.setting.shipping_method) {
									html += '<input type="radio" name="shipping_method" value="' + json['shipping_method'][i]['quote'][j]['code'] + '" checked="checked" />';
								} else {
									html += '<input type="radio" name="shipping_method" value="' + json['shipping_method'][i]['quote'][j]['code'] + '" />';
								}

								html += json['shipping_method'][i]['quote'][j]['title'] + ' - ' + json['shipping_method'][i]['quote'][j]['text'] + '</label></div>';
							}
						} else {
							html += '<div class="alert alert-danger">' + json['shipping_method'][i]['error'] + '</div>';
						}
					}

					html += '      </div>';
					html += '      <div class="modal-footer">';
					html += '        <button type="button" class="btn btn-default" data-dismiss="modal">'+that.setting.button_cancel+'</button>';

					if(that.setting.shipping_method){
						html += '        <input type="button" value="'+that.setting.button_shipping+'" id="button-shipping" data-loading-text="'+that.setting.text_loading+'" class="btn btn-primary" />';
					}else{
						html += '        <input type="button" value="'+that.setting.button_shipping+'" id="button-shipping" data-loading-text="'+that.setting.text_loading+'" class="btn btn-primary" disabled="disabled" />';
					}

					html += '      </div>';
					html += '    </div>';
					html += '  </div>';
					html += '</div> ';

					$('body').append(html);

					$('#modal-shipping').modal('show');

					$('input[name=\'shipping_method\']').on('change', function() {
						$('#button-shipping').prop('disabled', false);
					});
				}
			}
		});
	},

	clickShipping: function(){
		$.ajax({
			url: 'index.php?route=total/shipping/shipping',
			type: 'post',
			data: 'shipping_method=' + encodeURIComponent($('input[name=\'shipping_method\']:checked').val()),
			dataType: 'json',
			beforeSend: function() {
				$('#button-shipping').button('loading');
			},
			complete: function() {
				$('#button-shipping').button('reset');
			},
			success: function(json) {
				$('.alert').remove();

				if (json['error']) {
					$('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}

				if (json['redirect']) {
					location = json['redirect'];
				}
			}
		});
	},

	render: function(){
		var that = this;

		$(document).on('click', '#button-quote', function() {
			that.clickQoute();
		});

		$(document).on('click', '#button-shipping', function() {
			that.clickShipping();
		});
	}
};