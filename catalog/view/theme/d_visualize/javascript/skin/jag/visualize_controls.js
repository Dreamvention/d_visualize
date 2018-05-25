(function($) {
    jQuery.fn.visualizeControls = function(options) {
        if ($(this)[0] && $(this)[0].type) {
            var inputType = $(this)[0].type;

            options = $.extend({
                container: '<div class="' + inputType + '-container"></div>',
                inputWrap: '<div class="' + inputType + '-input custom-input"></div>',
                control: '<div class="' + inputType + '-control"></div>'
            }, options);

            var build = function () {

                $(this).wrap(options.inputWrap)
                    .after(options.control);

                if ($(this).parents('label').length > 0) {
                    $(this).parents('label')
                        .wrap(options.container);
                } else {
                    $(this).parent($(options.inputWrap))
                        .wrap(options.container);
                }
            };

            return this.each(build);
        }
    };
})(jQuery);

/*
$(document).ready(function () {
    $('body').click(function () {
        $('input[type="checkbox"]').each(function() {
            if ($(this).parents('.ajax-filter').length === 0) {
                $(this).visualizeControls();
            }
        });

        $('input[type="radio"]').each(function() {
            if ($(this).parents('.ajax-filter').length === 0) {
                $(this).visualizeControls();
            }
        });

    });
});*/
