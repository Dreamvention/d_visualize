$(document).ready(function () {
    $('.product-quantity .quantity-control').on('click', function () {
        let parent = $(this).closest('.product-quantity');
        let input = parent.find('#input-quantity');
        let inputVal = +input.val();

        if ($(this).data('prop') === 'decrement') {
            if (inputVal >= 2) {
                input.val(inputVal - 1);
            }
        }

        if ($(this).data('prop') === 'increment') {
            input.val(inputVal + 1);
        }
    });
});