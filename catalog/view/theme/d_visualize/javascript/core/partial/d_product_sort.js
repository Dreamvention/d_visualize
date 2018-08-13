$(document).ready(function() {
    // Product List
    $(document).on('click', '#list-view', function() {
        $(document).trigger('list-view');
    });
    // Product Grid
    $(document).on('click', '#grid-view', function() {
	    $(document).trigger('grid-view');
    });
    if (localStorage.getItem('display') == 'list') {
        $('#list-view').trigger('click');
    } else {
        $('#grid-view').trigger('click');
    }
});