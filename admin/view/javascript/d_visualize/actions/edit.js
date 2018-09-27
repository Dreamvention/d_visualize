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
		})
	context.dispatch('HIDE_MENU');
	context.commit('ENTER_VISUAL', payload);
};
d_visualize.actions['LEAVE_VISUAL'] = function (context, payload) {
	$('body').removeClass('edit_vd');
	console.log(context.getters.iframe_history)
	context.getters.iframe_history.pop();//this route is a vdh route
	let last_iframe_page = context.getters.iframe_history.pop();
	context.dispatch('SHOW_MENU');
	context.commit('CHANGE_IFRAME_SRC', last_iframe_page.href);
	context.commit('LEAVE_VISUAL', payload);
};
d_visualize.actions['ENTER_EDIT'] = function (context, payload) {
	$('body').addClass('edit');
};
d_visualize.actions['LEAVE_EDIT'] = function (context, payload) {
	$('body').removeClass('edit');
};
d_visualize.actions['HIDE_MENU'] = function (context, payload) {
	context.commit('HIDE_MENU', payload);
};
d_visualize.actions['SHOW_MENU'] = function (context, payload) {
	context.commit('SHOW_MENU', payload);
};
d_visualize.actions['CHANGE_CURRENT_COMPONENT'] = function (context, payload) {
	context.commit('CHANGE_CURRENT_COMPONENT', payload);
};
d_visualize.actions['SAVE_TEMPLATE'] = function (context, payload) {
	// context.commit('LOADING_START');
	$.post(context.state.config.save_template_url, {
		template_codename: context.getters.setting.active_template,
		template: JSON.stringify(context.getters.active_template)
	}, function (data, status) {
		if (status === 'success') {
			context.dispatch('RELOAD_IFRAME');
			// context.commit('LOADING_END');
			alertify.success(data['success']);
		}
	}, 'json').fail(function (e, m) {
		// context.commit('LOADING_END');
		alertify.error(m);
		alertify.error(app.$i18n.t('error.save_content'));
	});

};
d_visualize.actions['UPDATE_SKIN'] = function (context, payload) {
	context.commit('UPDATE_SKIN', payload);
	context.dispatch('SAVE_TEMPLATE')
}