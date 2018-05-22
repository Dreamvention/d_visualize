var Total_coupon = {
	init:function(){
		console.log('start Total_coupon')
		this.render();
	},

	clickCoupon: function(){
		$.ajax({
			url: 'index.php?route=total/coupon/coupon',
			type: 'post',
			data: 'coupon=' + encodeURIComponent($('input[name=\'coupon\']').val()),
			dataType: 'json',
			beforeSend: function() {
				$('#button-coupon').button('loading');
			},
			complete: function() {
				$('#button-coupon').button('reset');
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
		$(document).on('click', '#button-coupon', function() {
			that.clickCoupon();
		});
	}
};