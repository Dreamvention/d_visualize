var cart = {
	'add': function (product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function () {
				$('#cart > button').button('loading');
			},
			complete: function () {
				$('#cart > button').button('reset');
			},
			success: function (json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
						$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
					}, 100);

					$('html, body').animate({scrollTop: 0}, 'slow');

					$('#cart').load('index.php?route=common/cart/info');
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'update': function (key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function () {
				$('#cart > button').button('loading');
			},
			complete: function () {
				$('#cart > button').button('reset');
			},
			success: function (json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function (key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function () {
				$('#cart > button').button('loading');
			},
			complete: function () {
				$('#cart > button').button('reset');
			},
			success: function (json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'increaseQuantity': function (product_id) {
		$('.input-quantity-' + product_id).val(+$('.input-quantity-' + product_id).val() + 1);
		$(document).trigger('cart/increaseQuantity', {
			product_id: product_id,
			quantity: +$('.input-quantity-' + product_id).val()
		});
	},
	'decreaseQuantity': function (product_id, minimum) {
		$quantity = $('.input-quantity-' + product_id);
		if ($quantity.val() <= minimum) {
			$quantity.val(minimum);
		} else {
			$quantity.val(parseInt($quantity.val()) - 1);
		}
		$(document).trigger('cart/decreaseQuantity', {
			product_id: product_id,
			quantity: +$('.input-quantity-' + product_id).val()
		});
	}
};
cart.add = function (product_id, quantity) {
	d_visual_designer.dispatch('product/cart/add', {
		product_data: {
			product_id: product_id,
			quantity: typeof(quantity) != 'undefined' ? quantity : 1,
		},
		callback: function (json) {
			console.log(json)
			d_notification.dispatch('product/cart/add',json)
			if (json['error']) {
				console.log(json['error'])
				if (json['redirect']) {
					setTimeout(function () {
						location = json['redirect'];
					}, 200);
				}
			}
			// $('.vd-cart-btn').parent().addClass('open');
			$('html, body').animate({scrollTop: 0}, 'slow');

		},
		beforeSend: function () {
			$('#cart .dropdown-menu').addClass('backdrop');
		},
		complete: function () {
			$('#cart .dropdown-menu').removeClass('backdrop');
		}
	});


};
cart.remove = function (key) {
	d_visual_designer.dispatch('product/cart/remove', {
		product_data: {
			key: key,
		},
		beforeSend: function () {
			$('#cart .dropdown-menu').addClass('backdrop');
		},
		complete: function () {
			$('#cart .dropdown-menu').removeClass('backdrop');
		}
	});
};
cart.update = function (key, quantity) {
	d_visual_designer.dispatch('product/cart/update', {
		product_data: {
			key: key,
			quantity: quantity!='undefined'?quantity:1,
        },
		beforeSend: function () {
			$('#cart .dropdown-menu').addClass('backdrop');
		},
		complete: function () {
			$('#cart .dropdown-menu').removeClass('backdrop');
		}

	});
};
$(document).on('cart/increaseQuantity', function (action, data) {
	cart.update(data.product_id, data.quantity);
});
$(document).on('cart/decreaseQuantity', function (action, data) {
	cart.update(data.product_id, data.quantity);
});