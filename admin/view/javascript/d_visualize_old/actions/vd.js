d_visualize.actions['LOAD_VISUAL_HEADER'] = function (context, payload) {
	context.commit('LOAD_VISUAL_HEADER', payload);
	context.dispatch('ENTER_VISUAL');
};
d_visualize.actions['LOAD_VISUAL_FOOTER'] = function (context, payload) {
	context.commit('LOAD_VISUAL_FOOTER', payload);
	context.dispatch('ENTER_VISUAL');
};
d_visualize.actions['ENTER_VISUAL'] = function (context, payload) {
	$('body').addClass('edit_vd');
	$('#iframe').animate(
		{width: '100%'},
		{
			duration: 500,
		});
	context.dispatch('HIDE_MENU');
	context.commit('ENTER_VISUAL', payload);
};
d_visualize.actions['LEAVE_VISUAL'] = function (context, payload) {
	$('body').removeClass('edit_vd');
	context.getters.iframe_history.pop()
	let last_iframe_page = context.getters.iframe_history.pop()
	context.dispatch('SHOW_MENU');
	context.commit('CHANGE_IFRAME_SRC', last_iframe_page.href);
	context.commit('LEAVE_VISUAL', payload);
};