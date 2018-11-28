var Checkout = {

	/**
	 * Setting:
	 *    When starting checout app, you must pass all
	 *    of the following setting vars, substituting the 'text_...'
	 *    with php <?php echo $text_... ; ?>
	 *
	 * @type {Object}
	 */
	setting: {
		account: 'guest',
		shipping_required: true,
		step: 'account',
		$account: $('#collapse-checkout-option'),
		$payment_address: $('#collapse-payment-address'),
		$shipping_address: $('#collapse-shipping-address'),
		$shipping_method: $('#collapse-shipping-method'),
		$payment_method: $('#collapse-payment-method'),
		$confirm: $('#collapse-checkout-confirm'),
		text_checkout_account: 'text_checkout_account',
		text_checkout_option: 'text_checkout_option',
		text_checkout_payment_address: 'text_checkout_payment_address',
		text_checkout_shipping_address: 'text_checkout_shipping_address',
		text_checkout_shipping_method: 'text_checkout_shipping_method',
		text_checkout_payment_method: 'text_checkout_payment_method',
		text_checkout_confirm: 'text_checkout_confirm',

	},

	/**
	 * initate your app with this function
	 *
	 * @param  {[type]} setting [description]
	 * @return {[type]}         [description]
	 */
	init: function (setting) {
		console.log('start Checkout');
		this.setting = $.extend({}, this.setting, setting);
		this.setting.$account_title = this.setting.$account.parent().find('.panel-heading .panel-title');
		this.setting.$payment_address_title = this.setting.$payment_address.parent().find('.panel-heading .panel-title');
		this.setting.$shipping_address_title = this.setting.$shipping_address.parent().find('.panel-heading .panel-title');
		this.setting.$shipping_method_title = this.setting.$shipping_method.parent().find('.panel-heading .panel-title');
		this.setting.$payment_method_title = this.setting.$payment_method.parent().find('.panel-heading .panel-title');
		this.setting.$confirm_title = this.setting.$confirm.parent().find('.panel-heading .panel-title');

		this.setting.$account_body = this.setting.$account.find('.panel-body');
		this.setting.$payment_address_body = this.setting.$payment_address.find('.panel-body');
		this.setting.$shipping_address_body = this.setting.$shipping_address.find('.panel-body');
		this.setting.$shipping_method_body = this.setting.$shipping_method.find('.panel-body');
		this.setting.$payment_method_body = this.setting.$payment_method.find('.panel-body');
		this.setting.$confirm_body = this.setting.$confirm.find('.panel-body');

		this.render();
	},
	/**
	 * Show agree terms modal: account
	 */
	initAgreeModal:function(){
		/* Agree to Terms */
		$(document).delegate('.agree', 'click', function(e) {
			e.preventDefault();
			$('#modal-agree').remove();
			var element = this;
			$.ajax({
				url: $(element).attr('href'),
				type: 'get',
				dataType: 'html',
				success: function(data) {
					var html  = '<div id="modal-agree" class="modal">';
					html += '  <div class="modal-dialog">';
					html += '    <div class="modal-content">';
					html += '      <div class="modal-header">';
					html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
					html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
					html += '      </div>';
					html += '      <div class="modal-body">' + data + '</div>';
					html += '    </div';
					html += '  </div>';
					html += '</div>';
					$('body').append(html);
					$('#modal-agree').modal('show');
				}
			});
		});
	},
	/**
	 * Setter: account
	 */
	setAccount: function () {
		if (this.setting.account != 'logged') {
			this.setting.account = $('input[name=\'account\']:checked').prop('value');
		}
		console.log(this.setting.account);
	},
	/**
	 * Error handler
	 * @param  {[type]} xhr         [description]
	 * @param  {[type]} ajaxOptions [description]
	 * @param  {[type]} thrownError [description]
	 * @return {[type]}             [description]
	 */
	errorHandler: function (xhr, ajaxOptions, thrownError) {
		alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
	},
	/**
	 * Action: changing step. It includes 6 steps:
	 * 'account', 'payment_address', 'shipping_address',
	 * 'shipping_method', 'payment_method', 'confirm'
	 *
	 * every step will unfold the body of step container.
	 *
	 * @param  {[type]} step [description]
	 * @return {[type]}      [description]
	 */
	changeStep: function (step) {
		this.setting.step = step;
		if (this.setting.step == 'account') {
			$('a[href=\'#collapse-checkout-option\']').trigger('click');
		}

		if (this.setting.step == 'payment_address') {
			$('a[href=\'#collapse-payment-address\']').trigger('click');

		}

		if (this.setting.step == 'shipping_address') {
			$('a[href=\'#collapse-shipping-address\']').trigger('click');
			this.setting.$shipping_method_title.html(this.setting.text_checkout_shipping_method);
			this.setting.$payment_method_title.html(this.setting.text_checkout_payment_method);
			this.setting.$confirm_title.html(this.setting.text_checkout_confirm);
		}

		if (this.setting.step == 'shipping_method') {
			$('a[href=\'#collapse-shipping-method\']').trigger('click');
			this.setting.$payment_method_title.html(this.setting.text_checkout_payment_method);
			this.setting.$confirm_title.html(this.setting.text_checkout_confirm);
		}

		if (this.setting.step == 'payment_method') {
			$('a[href=\'#collapse-payment-method\']').trigger('click');
			this.setting.$confirm_title.html(this.setting.text_checkout_confirm);
		}

		if (this.setting.step == 'confirm') {
			$('a[href=\'#collapse-checkout-confirm\']').trigger('click');
		}
		this.initAgreeModal();
		console.log(this.setting.step);
	},

	/**
	 * Action: changing account. Fires when client picks one of the account types: register or guest
	 * @return {[type]} [description]
	 */
	changeAccount: function () {
		this.setAccount();
		var that = this;

		if (that.setting.$payment_address_title.children('*').is('a')) {
			if (this.setting.account == 'register') {
				that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + this.setting.text_checkout_account + ' <i class="fa fa-caret-down"></i></a>');
			} else {
				that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + this.setting.text_checkout_payment_address + ' <i class="fa fa-caret-down"></i></a>');
			}
		} else {
			if (this.setting.account == 'register') {
				that.setting.$payment_address_title.html(this.setting.text_checkout_account);
			} else {
				that.setting.$payment_address_title.html(this.setting.text_checkout_payment_address);
			}
		}
	},

	/**
	 *
	 *
	 *        VIEWS
	 *
	 *
	 */
	/**
	 * Returns the view of Login
	 * @param  {Function} callback
	 * @return {[type]}
	 */
	getLoginView: function (callback) {

		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/login',
			dataType: 'html',
			success: function (html) {
				that.setting.$account_body.html(html);
				that.setting.$account_title.html('<a href="#collapse-checkout-option" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_option + ' <i class="fa fa-caret-down"></i></a>');

				if (typeof callback == "function") callback();

			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Returns the view of Register. If the client is not logged in
	 * and has selected account option 'register'
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getRegisterView: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/register',
			dataType: 'html',
			beforeSend: function () {
				$('#button-account').button('loading');
			},
			complete: function () {
				$('#button-account').button('reset');
			},
			success: function (html) {
				$('.alert, .text-danger').remove();

				that.setting.$payment_address_body.html(html);

				that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_account + ' <i class="fa fa-caret-down"></i></a>');

				$('input[name=\'customer_group_id\']:checked').trigger('change');

				if (typeof callback == "function") callback();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Returns the view of Guest. If the client is not logged in
	 * and has selected account option 'guest'
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getGuestView: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/guest',
			dataType: 'html',
			beforeSend: function () {
				$('#button-account').button('loading');
			},
			complete: function () {
				$('#button-account').button('reset');
			},
			success: function (html) {
				$('.alert, .text-danger').remove();

				that.setting.$payment_address_body.html(html);
				that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_payment_address + ' <i class="fa fa-caret-down"></i></a>');

				$('input[name=\'customer_group_id\']:checked').trigger('change');

				if (typeof callback == "function") callback();

			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Returns the view of Payment Address. If the client is logged in.
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getPaymentAddressView: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/payment_address',
			dataType: 'html',
			success: function (html) {
				that.setting.$payment_address_body.html(html);
				that.setting.$payment_address_title.html('<a href="#collapse-payment-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_payment_address + ' <i class="fa fa-caret-down"></i></a>');

				$('input[name=\'customer_group_id\']:checked').trigger('change');

				if (typeof callback == "function") callback();

			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Returns the view of Shipping Address. If the client is logged in
	 * or if he is not logged in but has selected 'register' account option
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getShippingAddressView: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/shipping_address',
			dataType: 'html',
			success: function (html) {
				that.setting.$shipping_address_body.html(html);

				that.setting.$shipping_address_title.html('<a href="#collapse-shipping-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_shipping_address + ' <i class="fa fa-caret-down"></i></a>');

				if (typeof callback == "function") callback();

			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Returns the view of Shipping Address for Guest.
	 * If the client is not logged in has selected 'guest' account option
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getGuestShippingAddressView: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/guest_shipping',
			dataType: 'html',
			success: function (html) {
				that.setting.$shipping_address_body.html(html);
				that.setting.$shipping_address_title.html('<a href="#collapse-shipping-address" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_shipping_address + ' <i class="fa fa-caret-down"></i></a>');

				if (typeof callback == "function") callback();

			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Returns the view of Shipping Method.
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getShippingMethodView: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/shipping_method',
			dataType: 'html',
			success: function (html) {
				that.setting.$shipping_method_body.html(html);
				that.setting.$shipping_method_title.html('<a href="#collapse-shipping-method" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_shipping_method + ' <i class="fa fa-caret-down"></i></a>');

				if (typeof callback == "function") callback();

			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Returns the view of Payment Method.
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getPaymentMethodView: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/payment_method',
			dataType: 'html',
			success: function (html) {
				that.setting.$payment_method_body.html(html);
				that.setting.$payment_method_title.html('<a href="#collapse-payment-method" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_payment_method + ' <i class="fa fa-caret-down"></i></a>');

				if (typeof callback == "function") callback();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Returns the view of Confirm.
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getConfirmView: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/confirm',
			dataType: 'html',
			complete: function () {
				$('#button-payment-method').button('reset');
			},
			success: function (html) {
				that.setting.$confirm_body.html(html);
				that.setting.$confirm_title.html('<a href="#collapse-checkout-confirm" data-toggle="collapse" data-parent="#accordion" class="accordion-toggle">' + that.setting.text_checkout_confirm + ' <i class="fa fa-caret-down"></i></a>');

				if (typeof callback == "function") callback();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 *
	 *
	 *        CLICKS
	 *
	 *
	 */
	/**
	 * Ajax request for saving the login values and validating them.
	 *
	 * @return {[type]} [description]
	 */
	clickLogin: function () {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/login/save',
			type: 'post',
			data: $('#collapse-checkout-option :input'),
			dataType: 'json',
			beforeSend: function () {
				$('#button-login').button('loading');
			},
			complete: function () {
				$('#button-login').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();
				$('.form-group').removeClass('has-error');

				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					that.setting.$confirm_body.prepend('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					// Highlight any found errors
					$('input[name=\'email\']').parent().addClass('has-error');
					$('input[name=\'password\']').parent().addClass('has-error');
				}

			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	/**
	 * Ajax request for saving register values and validating them.
	 * Only if the customer is not logged in and
	 * selected 'register' as account option.
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	clickRegister: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/register/save',
			type: 'post',
			data: $('#collapse-payment-address input[type=\'text\'], #collapse-payment-address input[type=\'date\'], #collapse-payment-address input[type=\'datetime-local\'], #collapse-payment-address input[type=\'time\'], #collapse-payment-address input[type=\'password\'], #collapse-payment-address input[type=\'hidden\'], #collapse-payment-address input[type=\'email\'], #collapse-payment-address input[type=\'checkbox\']:checked, #collapse-payment-address input[type=\'radio\']:checked, #collapse-payment-address textarea, #collapse-payment-address select'),
			dataType: 'json',
			beforeSend: function () {
				$('#button-register').button('loading');
			},
			complete: function () {
				$('#button-register').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();
				$('.form-group').removeClass('has-error');

				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					$('#button-register').button('reset');

					if (json['error']['warning']) {
						that.setting.$payment_address_body.prepend('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					}

					for (var i in json['error']) {
						var element = that.setting.$payment_address.find('#input-' + i.replace('_', '-'));

						if ($(element).parent().hasClass('input-group')) {
							$(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
						} else {
							$(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
						}
					}

					// Highlight any found errors
					$('.text-danger').parent().addClass('has-error');
				} else {
					if (typeof callback == "function") callback();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});

	},

	clickGuest: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/guest/save',
			type: 'post',
			data: $('#collapse-payment-address input[type=\'text\'], #collapse-payment-address input[type=\'date\'], #collapse-payment-address input[type=\'datetime-local\'], #collapse-payment-address input[type=\'time\'], #collapse-payment-address input[type=\'password\'], #collapse-payment-address input[type=\'hidden\'],#collapse-payment-address input[type=\'email\'], #collapse-payment-address input[type=\'checkbox\']:checked, #collapse-payment-address input[type=\'radio\']:checked, #collapse-payment-address textarea, #collapse-payment-address select'),
			dataType: 'json',
			beforeSend: function () {
				$('#button-guest').button('loading');
			},
			complete: function () {
				$('#button-guest').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();
				$('.form-group').removeClass('has-error');

				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					$('#button-guest').button('reset');

					if (json['error']['warning']) {
						that.setting.$payment_address_body.prepend('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					}

					for (var i in json['error']) {
						var element = that.setting.$payment_address.find('#input-' + i.replace('_', '-'));

						if ($(element).parent().hasClass('input-group')) {
							$(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
						} else {
							$(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
						}
					}

					// Highlight any found errors
					$('.text-danger').parent().addClass('has-error');
				} else {
					if (typeof callback == "function") callback();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});

	},

	clickPaymentAddress: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/payment_address/save',
			type: 'post',
			data: $('#collapse-payment-address input[type=\'text\'], #collapse-payment-address input[type=\'date\'], #collapse-payment-address input[type=\'datetime-local\'], #collapse-payment-address input[type=\'time\'], #collapse-payment-address input[type=\'password\'], #collapse-payment-address input[type=\'checkbox\']:checked, #collapse-payment-address input[type=\'radio\']:checked, #collapse-payment-address input[type=\'hidden\'], #collapse-payment-address textarea, #collapse-payment-address select'),
			dataType: 'json',
			beforeSend: function () {
				$('#button-payment-address').button('loading');
			},
			complete: function () {
				$('#button-payment-address').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					if (json['error']['warning']) {
						$('#collapse-payment-address .panel-body').prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					}

					for (var i in json['error']) {
						var element = that.setting.$payment_address.find('#input-' + i.replace('_', '-'));

						if ($(element).parent().hasClass('input-group')) {
							$(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
						} else {
							$(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
						}
					}

					// Highlight any found errors
					$('.text-danger').parent().parent().addClass('has-error');
				} else {
					if (typeof callback == "function") callback();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	clickShippingAddress: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/shipping_address/save',
			type: 'post',
			data: $('#collapse-shipping-address input[type=\'text\'], #collapse-shipping-address input[type=\'date\'], #collapse-shipping-address input[type=\'datetime-local\'], #collapse-shipping-address input[type=\'time\'], #collapse-shipping-address input[type=\'password\'], #collapse-shipping-address input[type=\'checkbox\']:checked, #collapse-shipping-address input[type=\'radio\']:checked, #collapse-shipping-address textarea, #collapse-shipping-address select'),
			dataType: 'json',
			beforeSend: function () {
				$('#button-shipping-address').button('loading');
			},
			complete: function () {
				$('#button-shipping-address').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					$('#button-shipping-address').button('reset');

					if (json['error']['warning']) {
						that.setting.$shipping_address_body.prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					}

					for (var i in json['error']) {
						var element = that.setting.$shipping_address.find('#input-' + i.replace('_', '-'));

						if ($(element).parent().hasClass('input-group')) {
							$(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
						} else {
							$(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
						}
					}

					// Highlight any found errors
					$('.text-danger').parent().parent().addClass('has-error');
				} else {
					if (typeof callback == "function") callback();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	clickGuestShippingAddress: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/guest_shipping/save',
			type: 'post',
			data: $('#collapse-shipping-address input[type=\'text\'], #collapse-shipping-address input[type=\'date\'], #collapse-shipping-address input[type=\'datetime-local\'], #collapse-shipping-address input[type=\'time\'], #collapse-shipping-address input[type=\'password\'], #collapse-shipping-address input[type=\'checkbox\']:checked, #collapse-shipping-address input[type=\'radio\']:checked, #collapse-shipping-address textarea, #collapse-shipping-address select'),
			dataType: 'json',
			beforeSend: function () {
				$('#button-guest-shipping').button('loading');
			},
			complete: function () {
				$('#button-guest-shipping').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					$('#button-guest-shipping').button('reset');

					if (json['error']['warning']) {
						that.setting.$shipping_address_body.prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					}

					for (var i in json['error']) {
						var element = that.setting.$shipping_address.find('#input-' + i.replace('_', '-'));

						if ($(element).parent().hasClass('input-group')) {
							$(element).parent().after('<div class="text-danger">' + json['error'][i] + '</div>');
						} else {
							$(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
						}
					}

					// Highlight any found errors
					$('.text-danger').parent().addClass('has-error');
				} else {
					if (typeof callback == "function") callback();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	clickShippingMethod: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/shipping_method/save',
			type: 'post',
			data: $('#collapse-shipping-method input[type=\'radio\']:checked, #collapse-shipping-method textarea'),
			dataType: 'json',
			beforeSend: function () {
				$('#button-shipping-method').button('loading');
			},
			complete: function () {
				$('#button-shipping-method').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					$('#button-shipping-method').button('reset');

					if (json['error']['warning']) {
						that.setting.$shipping_address.prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					}
				} else {
					if (typeof callback == "function") callback();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	clickPaymentMethod: function (callback) {
		var that = this;
		$.ajax({
			url: 'index.php?route=checkout/payment_method/save',
			type: 'post',
			data: $('#collapse-payment-method input[type=\'radio\']:checked, #collapse-payment-method input[type=\'checkbox\']:checked, #collapse-payment-method textarea'),
			dataType: 'json',
			beforeSend: function () {
				$('#button-payment-method').button('loading');
			},
			complete: function () {
				$('#button-payment-method').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				} else if (json['error']) {
					if (json['error']['warning']) {
						that.setting.$payment_method_body.prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					}
				} else {
					if (typeof callback == "function") callback();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				that.errorHandler(xhr, ajaxOptions, thrownError);
			}
		});
	},

	render: function () {

		var that = this;
		if (this.setting.account != 'logged') {
			this.getLoginView(function () {
				that.setAccount();
				that.changeStep('account');
			});
		} else {
			this.getPaymentAddressView(function () {
				that.changeStep('payment_address');
			});
		}

		$(document).on('change', 'input[name=\'account\']', function () {
			that.changeAccount();
		});


		//account
		$(document).on('click', '#button-account', function () {
			if (that.setting.account == 'register') {
				that.getRegisterView(function () {
					that.changeStep('payment_address');
				});
			} else {
				that.getGuestView(function () {
					that.changeStep('payment_address');
				});
			}
		});

		//login
		$(document).on('click', '#button-login', function () {
			that.clickLogin();
		});

		//register
		$(document).on('click', '#button-register', function () {
			that.clickRegister(function () {
				if (that.setting.shipping_required) {
					var shipping_address = that.setting.$payment_address.find('input[name=\'shipping_address\']:checked').prop('value');

					if (shipping_address) {
						that.getShippingMethodView(function () {
							that.getShippingAddressView(function () {
								that.changeStep('shipping_method');
							});
						});
					} else {
						that.getShippingAddressView(function () {
							that.changeStep('shipping_address');
						});
					}
				} else {
					that.getPaymentMethodView(function () {
						that.changeStep('payment_method');
					});
				}
				that.getPaymentAddressView();
			});
		});

		//payment_address
		$(document).on('click', '#button-payment-address', function () {
			that.clickPaymentAddress(function () {
				if (that.setting.shipping_required) {
					that.getShippingAddressView(function () {
						that.changeStep('shipping_address');
					});
				} else {
					that.getPaymentMethodView(function () {
						that.changeStep('payment_method');
					});
				}
				that.getPaymentAddressView();
			});
		});

		//shipping_address
		$(document).on('click', '#button-shipping-address', function () {
			that.clickShippingAddress(function () {
				that.getShippingMethodView(function () {
					that.changeStep('shipping_method');
					that.getShippingAddressView();
				});
			});
		});

		//guest
		$(document).on('click', '#button-guest', function () {
			that.clickGuest(function () {
				if (that.setting.shipping_required) {
					var shipping_address = that.setting.$payment_address.find('input[name=\'shipping_address\']:checked').prop('value');
					console.log('shipping_address:' + shipping_address);
					if (shipping_address) {
						that.getShippingMethodView(function () {
							that.getGuestShippingAddressView(function () {
								that.changeStep('shipping_method');
							});
						});
					} else {
						that.getGuestShippingAddressView(function () {
							that.changeStep('shipping_address');
						});
					}
				} else {
					that.getPaymentMethodView(function () {
						that.changeStep('payment_method');
					});
				}
			});
		});

		//guest_shipping_address
		$(document).on('click', '#button-guest-shipping', function () {
			that.clickGuestShippingAddress(function () {
				that.getShippingMethodView(function () {
					that.changeStep('shipping_method');
				});
			});
		});

		//shipping_method
		$(document).on('click', '#button-shipping-method', function () {
			that.clickShippingMethod(function () {
				that.getPaymentMethodView(function () {
					that.changeStep('payment_method');
				});
			});
		});

		//payment_method
		$(document).on('click', '#button-payment-method', function () {
			that.clickPaymentMethod(function () {
				that.getConfirmView(function () {
					that.changeStep('confirm');
				});
			});
		});

	}
};