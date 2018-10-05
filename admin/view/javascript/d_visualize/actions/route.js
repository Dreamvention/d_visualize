d_visualize.actions['POP_EDIT_HISTORY'] = function (context, payload) {
	context.commit('POP_EDIT_HISTORY', payload);
};
d_visualize.actions['PUSH_EDIT_HISTORY'] = function (context, payload) {
	context.commit('PUSH_EDIT_HISTORY', payload);
};
d_visualize.actions['CHANGE_PAGE'] = function (context, payload) {
	let iFrameDOM = $("iframe#iframe").contents();
	let route = iFrameDOM.find("#content").data('route');
	context.commit('CHANGE_PAGE', route);

};
d_visualize.actions['RELOAD_IFRAME'] = function (context, payload) {
	$('iframe')[0].contentWindow.location.reload();
}
;d_visualize.actions['PUSH_IFRAME_HISTORY'] = function (context, payload) {
	context.commit('PUSH_IFRAME_HISTORY', payload);
	context.dispatch('CHANGE_PAGE', payload);
	//saving on the server last url
	let last_visited_url = 'http://localhost/index.php?route=common/home';
	if (context.getters.iframe_history[context.getters.iframe_history.length - 1].href) {
		last_visited_url = context.getters.iframe_history[context.getters.iframe_history.length - 1].href;
	}
	$.post(context.state.config.save_iframe_url, {
		last_url: last_visited_url
	}, function (data, status) {
		if (status === 'success') {
		}
	}, 'json').fail(function (e, m) {
		// context.commit('LOADING_END');
		alertify.error(m);
		alertify.error(app.$i18n.t('error.save_content'));
	});
	;
};
d_visualize.actions['CHANGE_NAVIGATION_CONTEXT'] = function (context, payload) {
	context.commit('CHANGE_NAVIGATION_CONTEXT', payload);
};