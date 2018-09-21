var Total_reward = {
	init:function(){
		console.log('start Total_reward')
		this.render();
	},

	clickReward: function(){
		$.ajax({
			url: 'index.php?route=total/reward/reward',
			type: 'post',
			data: 'reward=' + encodeURIComponent($('input[name=\'reward\']').val()),
			dataType: 'json',
			beforeSend: function() {
				$('#button-reward').button('loading');
			},
			complete: function() {
				$('#button-reward').button('reset');
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
		$(document).on('click', '#button-reward', function() {
			that.clickReward();
		});
	}
};