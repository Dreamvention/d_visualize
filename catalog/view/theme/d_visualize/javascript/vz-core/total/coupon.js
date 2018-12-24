var Total_coupon = {
	init:function(){
		console.log('start Total_coupon')
		this.render();
	},
	clickCoupon: function(){
		$.ajax({
			url: OPENCART_VERISON>'3.0.0.0'?'index.php?route=extension/total/coupon/coupon':'index.php?route=total/coupon/coupon',
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
				d_notification.dispatch('total/coupon/error',json);
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