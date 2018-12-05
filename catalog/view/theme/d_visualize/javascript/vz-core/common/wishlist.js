var wishlist = {
	'add': function(product_id) {
		// $.ajax({
		// 	url: 'index.php?route=account/wishlist/add',
		// 	type: 'post',
		// 	data: 'product_id=' + product_id,
		// 	dataType: 'json',
		// 	success: function(json) {
		// 		$('.alert').remove();
		//
		// 		if (json['redirect']) {
		// 			location = json['redirect'];
		// 		}
		//
		// 		if (json['success']) {
		// 			$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		// 		}
		//
		// 		$('#wishlist-total span').html(json['total']);
		// 		$('#wishlist-total').attr('title', json['total']);
		//
		// 		$('html, body').animate({ scrollTop: 0 }, 'slow');
		// 	},
	    //     error: function(xhr, ajaxOptions, thrownError) {
	    //         alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
	    //     }
		// });
	},
	'remove': function() {

	}
}

