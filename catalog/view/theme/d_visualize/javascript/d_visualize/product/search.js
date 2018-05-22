var Search = {
	init: function(){
		console.log('start Search');
		this.render();
	},

	clickSearch: function(){
		url = 'index.php?route=product/search';

		var search = $('#content input[name=\'search\']').prop('value');

		if (search) {
			url += '&search=' + encodeURIComponent(search);
		}

		var category_id = $('#content select[name=\'category_id\']').prop('value');

		if (category_id > 0) {
			url += '&category_id=' + encodeURIComponent(category_id);
		}

		var sub_category = $('#content input[name=\'sub_category\']:checked').prop('value');

		if (sub_category) {
			url += '&sub_category=true';
		}

		var filter_description = $('#content input[name=\'description\']:checked').prop('value');

		if (filter_description) {
			url += '&description=true';
		}

		location = url;
	},

	render: function(){
		var that = this;

		$(document).on('click', '#button-search', function() {
			that.clickSearch();
		});

		$(document).on('keydown', '#content input[name=\'search\']', function(e) {
			if (e.keyCode == 13) {
				$('#button-search').trigger('click');
			}
		});

		$(document).on('change', 'select[name=\'category_id\']', function() {
			if (this.value == '0') {
				$('input[name=\'sub_category\']').prop('disabled', true);
			} else {
				$('input[name=\'sub_category\']').prop('disabled', false);
			}
		});

		$('select[name=\'category_id\']').trigger('change');

	}
}