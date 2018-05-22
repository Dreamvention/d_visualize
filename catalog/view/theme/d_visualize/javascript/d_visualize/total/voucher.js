var Total_voucher = {
	init:function(){
		console.log('start Total_voucher')
		this.render();
	},

	clickVoucher: function(){
		$.ajax({
		    url: 'index.php?route=total/voucher/voucher',
		    type: 'post',
		    data: 'voucher=' + encodeURIComponent($('input[name=\'voucher\']').val()),
		    dataType: 'json',
		    beforeSend: function() {
		      $('#button-voucher').button('loading');
		    },
		    complete: function() {
		      $('#button-voucher').button('reset');
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
		$(document).on('click', '#button-voucher', function() {
			that.clickVoucher();
		});
	}
};