'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * TrackpadScrollEmulator
 * Version: 1.0.8
 * Author: Jonathan Nicol @f6design
 * https://github.com/jnicol/trackpad-scroll-emulator
 */
;(function ($) {
    var pluginName = 'TrackpadScrollEmulator';

    function Plugin(element, options) {
        var el = element;
        var $el = $(element);
        var $scrollContentEl;
        var $contentEl = $el.find('div[data-is="af_group_checkbox"]:first');
        var $scrollbarEl;
        var $dragHandleEl;
        var dragOffset;
        var flashTimeout;
        var pageJumpMultp = 7 / 8;
        var scrollDirection = 'vert';
        var scrollOffsetAttr = 'scrollTop';
        var sizeAttr = 'height';
        var offsetAttr = 'top';

        options = $.extend({}, $.fn[pluginName].defaults, options);

        /**
         * Initialize plugin
         */
        function init() {
            if ($el.hasClass('horizontal')) {
                scrollDirection = 'horiz';
                scrollOffsetAttr = 'scrollLeft';
                sizeAttr = 'width';
                offsetAttr = 'left';
            }

            $el.prepend('<div class="tse-scrollbar"><div class="drag-handle"></div></div>');
            $scrollbarEl = $el.find('.tse-scrollbar:first');
            $dragHandleEl = $el.find('.drag-handle:first');

            if (options.wrapContent) {
                $contentEl.wrap('<div class="tse-scroll-content" />');
            }
            $scrollContentEl = $el.find('.tse-scroll-content:first');

            resizeScrollContent();

            if (options.autoHide) {
                $el.on('mouseenter', flashScrollbar);
            }

            $dragHandleEl.on('mousedown', startDrag);
            $scrollbarEl.on('mousedown', jumpScroll);
            $scrollContentEl.on('scroll', onScrolled);

            resizeScrollbar();

            $(window).on('resize', function () {
                recalculate();
            });

            if (!options.autoHide) {
                showScrollbar();
            }
        }

        /**
         * Start scrollbar handle drag
         */
        function startDrag(e) {
            // Preventing the event's default action stops text being
            // selectable during the drag.
            e.preventDefault();

            // Measure how far the user's mouse is from the top of the scrollbar drag handle.
            var eventOffset = e.pageY;
            if (scrollDirection === 'horiz') {
                eventOffset = e.pageX;
            }
            dragOffset = eventOffset - $dragHandleEl.offset()[offsetAttr];

            $(document).on('mousemove', drag);
            $(document).on('mouseup', endDrag);
        }

        /**
         * Drag scrollbar handle
         */
        function drag(e) {
            e.preventDefault();

            // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
            var eventOffset = e.pageY;
            if (scrollDirection === 'horiz') {
                eventOffset = e.pageX;
            }
            var dragPos = eventOffset - $scrollbarEl.offset()[offsetAttr] - dragOffset;
            // Convert the mouse position into a percentage of the scrollbar height/width.
            var dragPerc = dragPos / $scrollbarEl[sizeAttr]();
            // Scroll the content by the same percentage.
            var scrollPos = dragPerc * $contentEl[sizeAttr]();

            $scrollContentEl[scrollOffsetAttr](scrollPos);
        }

        /**
         * End scroll handle drag
         */
        function endDrag() {
            $(document).off('mousemove', drag);
            $(document).off('mouseup', endDrag);
        }

        /**
         * Scroll in the same manner as the PAGE UP/DOWN keys
         */
        function jumpScroll(e) {
            // If the drag handle element was pressed, don't do anything here.
            if (e.target === $dragHandleEl[0]) {
                return;
            }

            // The content will scroll by 7/8 of a page.
            var jumpAmt = pageJumpMultp * $scrollContentEl[sizeAttr]();

            // Calculate where along the scrollbar the user clicked.
            var eventOffset = scrollDirection === 'vert' ? e.originalEvent.layerY : e.originalEvent.layerX;

            // Get the position of the top (or left) of the drag handle.
            var dragHandleOffset = $dragHandleEl.position()[offsetAttr];

            // Determine which direction to scroll.
            var scrollPos = eventOffset < dragHandleOffset ? $scrollContentEl[scrollOffsetAttr]() - jumpAmt : $scrollContentEl[scrollOffsetAttr]() + jumpAmt;

            $scrollContentEl[scrollOffsetAttr](scrollPos);
        }

        /**
         * Scroll callback
         */
        function onScrolled(e) {
            flashScrollbar();
        }

        /**
         * Resize scrollbar
         */
        function resizeScrollbar() {
            var contentSize = sizeAttr === 'height' ? $contentEl.outerHeight() : $contentEl.outerWidth();
            var scrollOffset = $scrollContentEl[scrollOffsetAttr](); // Either scrollTop() or scrollLeft().
            var scrollbarSize = $scrollbarEl[sizeAttr]();
            var scrollbarRatio = scrollbarSize / contentSize;

            // Calculate new height/position of drag handle.
            // Offset of 2px allows for a small top/bottom or left/right margin around handle.
            var handleOffset = Math.round(scrollbarRatio * scrollOffset) + 2;
            var handleSize = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;

            if (scrollbarSize < contentSize) {
                if (scrollDirection === 'vert') {
                    $dragHandleEl.css({ 'top': handleOffset, 'height': handleSize });
                } else {
                    $dragHandleEl.css({ 'left': handleOffset, 'width': handleSize });
                }
                $scrollbarEl.show();
            } else {
                $scrollbarEl.hide();
            }
        }

        /**
         * Flash scrollbar visibility
         */
        function flashScrollbar() {
            resizeScrollbar();
            showScrollbar();
        }

        /**
         * Show scrollbar
         */
        function showScrollbar() {
            $dragHandleEl.addClass('visible');

            if (!options.autoHide) {
                return;
            }
            if (typeof flashTimeout === 'number') {
                window.clearTimeout(flashTimeout);
            }
            flashTimeout = window.setTimeout(function () {
                hideScrollbar();
            }, 1000);
        }

        /**
         * Hide Scrollbar
         */
        function hideScrollbar() {
            $dragHandleEl.removeClass('visible');
            if (typeof flashTimeout === 'number') {
                window.clearTimeout(flashTimeout);
            }
        }

        /**
         * Resize content element
         */
        function resizeScrollContent() {
            if (scrollDirection === 'vert') {
                $scrollContentEl.width($el.width() + scrollbarWidth());
                $scrollContentEl.height($el.height());
            } else {
                $scrollContentEl.width($el.width());
                $scrollContentEl.height($el.height() + scrollbarWidth());
                $contentEl.height($el.height());
            }
        }

        /**
         * Calculate scrollbar width
         *
         * Original function by Jonathan Sharp:
         * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
         * Updated to work in Chrome v25.
         */
        function scrollbarWidth() {
            // Append a temporary scrolling element to the DOM, then measure
            // the difference between between its outer and inner elements.
            var tempEl = $('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
            $('body').append(tempEl);
            var width = $(tempEl).innerWidth();
            var widthMinusScrollbars = $('div', tempEl).innerWidth();
            tempEl.remove();
            // On OS X if the scrollbar is set to auto hide it will have zero width. On webkit we can still
            // hide it using ::-webkit-scrollbar { width:0; height:0; } but there is no moz equivalent. So we're
            // forced to sniff Firefox and return a hard-coded scrollbar width. I know, I know...
            if (width === widthMinusScrollbars && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                return 17;
            }
            return width - widthMinusScrollbars;
        }

        /**
         * Recalculate scrollbar
         */
        function recalculate() {
            resizeScrollContent();
            resizeScrollbar();
        }

        /**
         * Get/Set plugin option.
         */
        function option(key, val) {
            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }

        /**
         * Destroy plugin.
         */
        function destroy() {
            // Restore the element to its original state.
            $contentEl.insertBefore($scrollbarEl);
            $scrollbarEl.remove();
            $scrollContentEl.remove();
            $contentEl.css({ 'height': $el.height() + 'px', 'overflow-y': 'scroll' });

            hook('onDestroy');
            $el.removeData('plugin_' + pluginName);
        }

        /**
         * Plugin callback hook.
         */
        function hook(hookName) {
            if (options[hookName] !== undefined) {
                options[hookName].call(el);
            }
        }

        init();

        return {
            option: option,
            destroy: destroy,
            recalculate: recalculate
        };
    }

    $.fn[pluginName] = function (options) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function () {
                if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === "object" || !options) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        onInit: function onInit() {},
        onDestroy: function onDestroy() {},
        wrapContent: true,
        autoHide: true
    };
})(jQuery);

$(document).ready(function () {
    setTimeout(function () {
        $('.af-wrapper').TrackpadScrollEmulator({ autoHide: false });
    }, 1500);
});
$(document).on('ready', function(){

});
$(document).ready(function () {
    // $(document).on('click','.product-quantity .quantity-control', function () {
    //     var parent = $(this).closest('.product-quantity');
    //     var input = parent.find('#input-quantity');
    //     var inputVal = +input.val();
    //
    //     if ($(this).data('prop') === 'decrement') {
    //         if (inputVal >= 2) {
    //             input.val(inputVal - 1);
    //         }
    //     }
    //
    //     if ($(this).data('prop') === 'increment') {
    //         console.log(inputVal)
    //         input.val(inputVal + 1);
    //     }
    // });
});
// const swiper = require('swiper');
// $('#featured').swiper({
//     mode: 'horizontal',
//     slidesPerView: 6,
//     pagination: '.featured',
//     paginationClickable: true,
//     spaceBetween: 0,
//     autoplayDisableOnInteraction: true,
//     loop: true,
//     mousewheel: true,
//     breakpoints: {
//         991: {
//             slidesPerView: 2
//         },
//         640: {
//             slidesPerView: 1
//         }
//     }
// });

$(document).ready(function () {
    //initialize swiper when document ready
    // var mySwiper = new Swiper('#featured', {
    //     mode: 'horizontal',
    //     slidesPerView: 3,
    //     pagination: '.swiper-pagination',
    //     paginationClickable: true,
    //     spaceBetween: 0,
    //     autoplayDisableOnInteraction: true,
    //     loop: true,
    //     mousewheel: true,
    //     breakpoints: {
    //         991: {
    //             slidesPerView: 2
    //         },
    //         640: {
    //             slidesPerView: 1
    //         }
    //     }
    // });
});
function truncate(selector) {
    $(selector).text(function (index, currentcontent) {
        console.log($.trim(currentcontent).substring(0, 25).split(" ").slice(0, -1).join(" ") + "...");
        return $.trim(currentcontent).substring(0, 25).split(" ").slice(0, -1).join(" ") + "...";
    });
}

$(document).ready(function () {
    // truncate('.product-layout-sm .product-name a');
});
(function ($) {
    jQuery.fn.visualizeControls = function (options) {
        if ($(this)[0] && $(this)[0].type) {
            var inputType = $(this)[0].type;

            options = $.extend({
                container: '<div class="' + inputType + '-container"></div>',
                inputWrap: '<div class="' + inputType + '-input custom-input"></div>',
                control: '<div class="' + inputType + '-control"></div>'
            }, options);

            var build = function build() {

                $(this).wrap(options.inputWrap).after(options.control);

                if ($(this).parents('label').length > 0) {
                    $(this).parents('label').wrap(options.container);
                } else {
                    $(this).parent($(options.inputWrap)).wrap(options.container);
                }
            };

            return this.each(build);
        }
    };
})(jQuery);

//
$(document).ready(function () {
	Product.init = function init(setting) {
		this.setting = $.extend({}, this.setting, setting);
		this.render();
		$('.rating-loading').rating({
			step: 1,
			filled: 'fas fa-star',
			empty: 'fas empty fa-star'
		});
	}
	Product.sendReview = function () {
		var that = this;
		$.ajax({
			url: 'index.php?route=product/product/write&product_id=' + that.setting.product_id,
			type: 'post',
			dataType: 'json',
			data: $("#form-review").serialize(),
			beforeSend: function beforeSend() {
				$('#button-review').button('loading');
			},
			complete: function complete() {
				$('#button-review').button('reset');
			},
			success: function success(json) {
				$('.alert-success, .alert-danger').remove();

				if (json['error']) {
					$('#write_review_modal .modal-body').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '</div>');
				}

				if (json['success']) {
                    $('#write_review_modal .modal-body').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + '</div>');

					$('input[name=\'name\']').val('');
					$('textarea[name=\'text\']').val('');
					$('input[name=\'rating\']:checked').prop('checked', false);
				}
			}
		});
	}

});