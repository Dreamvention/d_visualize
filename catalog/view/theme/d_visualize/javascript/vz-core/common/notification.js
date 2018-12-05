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

}.bind(d_notification))();