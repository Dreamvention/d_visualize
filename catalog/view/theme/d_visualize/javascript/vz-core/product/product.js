var Product = {

	setting: {
		product_id: '',
		$quantity: '',
		minimum: '',
	},
    init: function(setting) {
        console.log('start Product');
        this.setting = $.extend({}, this.setting, setting);
        this.render();
    },

    increaseQuantity: function(){
    	this.setting.$quantity.val(parseInt(this.setting.$quantity.val())+1);
    },

	decreaseQuantity: function(){
		if(this.setting.$quantity.val() <= this.setting.minimum){
			this.setting.$quantity.val(this.setting.minimum);
		}else{
			this.setting.$quantity.val(parseInt(this.setting.$quantity.val())-1);
		}
	},

    updateRecurringDescription: function(){
    	$.ajax({
			url: 'index.php?route=product/product/getRecurringDescription',
			type: 'post',
			data: $('input[name=\'product_id\'], input[name=\'quantity\'], select[name=\'recurring_id\']'),
			dataType: 'json',
			beforeSend: function() {
				$('#recurring-description').html('');
			},
			success: function(json) {
				$('.alert, .text-danger').remove();

				if (json['success']) {
					$('#recurring-description').html(json['success']);
				}
			}
		});
    },

    addCart: function(){
    	$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: $('#product input[type=\'text\'], #product input[type=\'hidden\'], #product input[type=\'radio\']:checked, #product input[type=\'checkbox\']:checked, #product select, #product textarea'),
			dataType: 'json',
			beforeSend: function() {
				$('#button-cart').button('loading');
			},
			complete: function() {
				$('#button-cart').button('reset');
			},
			success: function(json) {
				$('.alert, .text-danger').remove();
				$('.form-group').removeClass('has-error');

				if (json['error']) {
					if (json['error']['option']) {
						for (i in json['error']['option']) {
							var element = $('#input-option' + i.replace('_', '-'));

							if (element.parent().hasClass('input-group')) {
								element.parent().after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
							} else {
								element.after('<div class="text-danger">' + json['error']['option'][i] + '</div>');
							}
						}
					}

					if (json['error']['recurring']) {
						$('select[name=\'recurring_id\']').after('<div class="text-danger">' + json['error']['recurring'] + '</div>');
					}

					// Highlight any found errors
					$('.text-danger').parent().addClass('has-error');
				}

				if (json['success']) {
					$('.breadcrumb').after('<div class="alert alert-success">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					$('#cart > button').html('<i class="fa fa-shopping-cart"></i> ' + json['total']);

					$('html, body').animate({ scrollTop: 0 }, 'slow');

					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
	        error: function(xhr, ajaxOptions, thrownError) {
	            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
	        }
		});
	},

	uploadFile: function(node){

		$('#form-upload').remove();

		$('body').prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" /></form>');

		$('#form-upload input[name=\'file\']').trigger('click');

		if (typeof timer != 'undefined') {
	    	clearInterval(timer);
		}

		timer = setInterval(function() {
			if ($('#form-upload input[name=\'file\']').val() != '') {
				clearInterval(timer);

				$.ajax({
					url: 'index.php?route=tool/upload',
					type: 'post',
					dataType: 'json',
					data: new FormData($('#form-upload')[0]),
					cache: false,
					contentType: false,
					processData: false,
					beforeSend: function() {
						$(node).button('loading');
					},
					complete: function() {
						$(node).button('reset');
					},
					success: function(json) {
						$('.text-danger').remove();

						if (json['error']) {
							$(node).parent().find('input').after('<div class="text-danger">' + json['error'] + '</div>');
						}

						if (json['success']) {
							alert(json['success']);

							$(node).parent().find('input').attr('value', json['code']);
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
						alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
					}
				});
			}
		}, 500);
    },

    loadReviewPage: function(node, e){

	    e.preventDefault();

	    $('#review').fadeOut('slow');

	    $('#review').load(node.href);

	    $('#review').fadeIn('slow');

    },


    sendReview: function(){
    	var that = this;

    	$.ajax({
			url: 'index.php?route=product/product/write&product_id='+that.setting.product_id,
			type: 'post',
			dataType: 'json',
			data: $("#form-review").serialize(),
			beforeSend: function() {
				$('#button-review').button('loading');
			},
			complete: function() {
				$('#button-review').button('reset');
			},
			success: function(json) {
				$('.alert-success, .alert-danger').remove();

				if (json['error']) {
					$('#review').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '</div>');
				}

				if (json['success']) {
					$('#review').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + '</div>');

					$('input[name=\'name\']').val('');
					$('textarea[name=\'text\']').val('');
					$('input[name=\'rating\']:checked').prop('checked', false);
				}
			}
		});
    },

    render: function() {
        var that = this;

        $(document).on('change', 'select[name=\'recurring_id\'], input[name="quantity"]', function(){
        	that.updateRecurringDescription();
        })

        $(document).on('click', '#button-cart', function() {
			that.addCart();
		});

        $(document).on('click', 'button[id^=\'button-upload\']', function() {
       		that.uploadFile(this);
        });

        $(document).on('click', '#review .pagination a', function(e) {
			that.loadReviewPage(this, e);
		});

		$(document).on('click', '#button-review', function() {
			that.sendReview();
		});

		$(document).on('click', '#quantity_control .decrease', function() {
			that.decreaseQuanityt();
		});

		$(document).on('click', '#quantity_control .increase', function() {
			that.increaseQuantity();
		});

		$('#review').load('index.php?route=product/product/review&product_id='+that.setting.product_id);

		$('input[name=\'rating\']').rating();

		$('.date').datetimepicker({
			pickTime: false
		});

		$('.datetime').datetimepicker({
			pickDate: true,
			pickTime: true
		});

		$('.time').datetimepicker({
			pickDate: false
		});

		$('.vz-product-product__thumbnails__item').magnificPopup({
			type:'image',
			delegate: 'a',
			gallery: {
				enabled:true
			}
		});
    }
}