var d_notification = new component();

(function () {
	this.subscribe('product/cart/add', function (e,json) {
		$('.alert-dismissible, .text-danger').remove();
		if (json['success']) {
			$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fas fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert" style="right: 0;">&times;</button></div>');
		}
		}.bind(this));
	this.subscribe('product/wishlist/add', function (e,json) {
		$('.alert-dismissible, .text-danger').remove();
		if (json['success']) {
			$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		}
		}.bind(this));
	this.subscribe('total/coupon/error', function (e,json) {
		$('.alert').remove();
		if (json['error']) {
			$('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}
		}.bind(this));
	this.subscribe('total/shipping/error', function (e,json) {
		$('.alert, .text-danger').remove();
		if (json['error']['warning']) {
			$('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}
	}.bind(this));
	this.subscribe('total/shipping/shipping_method', function (e,state) {
		let json = state.json;
		let that = state.that;
		$('#modal-shipping').remove();
		var html  = '<div id="modal-shipping" class="modal">';
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
	}.bind(this));
	this.subscribe('total/shipping/shipping_method/error', function (e,json) {
		$('.alert').remove();
		if (json['error']) {
			$('.breadcrumb').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}

	}.bind(this));

}.bind(d_notification))();