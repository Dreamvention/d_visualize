var D_mega_menu = {

    setting: {
        menu_max_columns: 4,
        menu: $('#d_mega_menu'),
        menu_width: '',
        sub_menu_col_width: '',
		url: window.location.href
    },

    init: function(setting) {
        this.setting = $.extend({}, this.setting, setting);
        this.setting.menu_width = this.setting.menu.find('.menu').outerWidth();
        this.setting.menu_col_width = Math.floor(this.setting.menu_width/this.setting.menu_max_columns);
        this.render();
    },

    render: function() {
        console.log('d_mega_menu started');
		var x = this;
        var menu = this.setting.menu;
		var setting = this.setting;
		if (menu.find('.menu-toggle').css('display')=='none') {
        $.each(menu.find('.sub-menu'), function(i, value){
            var sub_menu = $(this);
			var menu_item = sub_menu.parents('.menu-item');
            var sub_menu_column = sub_menu.find('.col');
            var col_count = sub_menu_column.length;
            if(col_count > setting.menu_max_columns) {
                col_count = setting.menu_max_columns;
            }
            sub_menu.css('width', (col_count * setting.menu_col_width)+'px');
            sub_menu_column.css('width', setting.menu_col_width+'px').css('max-width', setting.menu_col_width+'px');
			var submenu_left_width = menu_item.position().left+(col_count*setting.menu_col_width);
			if (submenu_left_width>setting.menu_width) {
				sub_menu.css('left', '-'+(submenu_left_width-setting.menu_width)+'px');
				sub_menu.find('.arrow').css('left', (submenu_left_width-setting.menu_width)+'px');
			}
        });
		}
		menu.find('.menu-toggle').on('click', function(event){
			$(this).toggleClass('collapsed');
		});
		menu.find('.sub-menu-toggle').on('click', function(event){
			$(this).toggleClass('collapsed');
		});
		menu.find('.sub-sub-menu-toggle').on('click', function(event){
			$(this).toggleClass('collapsed');
		});
		menu.find('.sub-menu-item').children('.title').on('mouseenter', function(e){
			if ($(this).attr('image')) {
				$(this).parents('.sub-menu').find('.image').children('.img-responsive').attr('src', $(this).attr('image'));
			}
		}).on('mouseleave', function(e){
			if ($(this).attr('image')) {
				$(this).parents('.sub-menu').find('.image').children('.img-responsive').attr('src', $(this).parents('.menu-item').children('.title').attr('image'));
			}
		});
		menu.find('.more').on('click', function(e){
			if ($(this).find('.more-hide').css('display')=='none') {
				$(this).find('.more-hide').fadeIn('slow');
				$(this).find('.more-show').hide();
				$(this).parent().find('.animated').fadeIn('slow');

			} else {
				$(this).find('.more-hide').hide();
				$(this).find('.more-show').fadeIn('slow')
				$(this).parent().find('.animated').hide();

			}
			e.stopPropagation();
		});
		menu.find('.title').each(function(index) {
		if ($(this).attr('href')) {
			if ($(this).attr('href').toString()==setting.url) {
				$(this).addClass('current-url');
				$(this).parents('.sub-menu-item').children('.title').addClass('current-url');
				$(this).parents('.menu-item').children('.title').addClass('current-url');
			}
		}
		});
    }
};

$(window).resize(function(){
	if (!Modernizr.touch) {
		$('#d_mega_menu').load('index.php?route=module/d_mega_menu/update');
	}
});
