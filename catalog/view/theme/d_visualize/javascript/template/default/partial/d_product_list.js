$(document).on('grid-view',function () {
	var cols = $('#column-right, #column-left').length;
	if (cols == 2) {
		$('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-12');
	} else if (cols == 1) {
		$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-12');
	} else {
		$('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-12');
	}
	$('#list-view').removeClass('active');
	$('#grid-view').addClass('active');
	localStorage.setItem('display', 'grid');
});

$(document).on('list-view',function () {
	$('#content .product-grid > .clearfix').remove();
	$('#content .row > .product-grid').attr('class', 'product-layout product-list col-12');
	$('#grid-view').removeClass('active');
	$('#list-view').addClass('active');
	localStorage.setItem('display', 'list');
});
