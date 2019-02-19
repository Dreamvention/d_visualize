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
			url: OPENCART_VERISON>'3.0.0.0'?'index.php?route=extension/total/shipping/quote':'index.php?route=total/shipping/quote',
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
					d_notification.dispatch('total/shipping/error',json)

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
					d_notification.dispatch('total/shipping/shipping_method',{json,that});

				}
			}
		});
	},

	clickShipping: function(){
		$.ajax({
			url: OPENCART_VERISON>'3.0.0.0'?'index.php?route=extension/total/shipping/shipping':'index.php?route=total/shipping/shipping',
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
				d_notification.dispatch('total/shipping/shipping_method/error',json);
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