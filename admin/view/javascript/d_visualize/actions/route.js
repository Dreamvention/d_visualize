d_visualize.actions['POP_EDIT_HISTORY'] = function (context, payload) {
	context.commit('POP_EDIT_HISTORY', payload);
};
d_visualize.actions['PUSH_EDIT_HISTORY'] = function (context, payload) {
	context.commit('PUSH_EDIT_HISTORY', payload);
};
d_visualize.actions['RELOAD_IFRAME'] = function (context, payload) {
	var iframe = document.getElementById('iframe');
	iframe.src = iframe.src;
}
;d_visualize.actions['PUSH_IFRAME_HISTORY'] = function (context, payload) {
	context.commit('PUSH_IFRAME_HISTORY', payload);
};
d_visualize.actions['CHANGE_NAVIGATION_CONTEXT'] = function (context, payload) {
	context.commit('CHANGE_NAVIGATION_CONTEXT', payload);
};