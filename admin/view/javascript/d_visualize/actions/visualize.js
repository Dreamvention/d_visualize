d_visualize.actions['CHANGE_STATUS'] = function (context, payload) {
	context.commit('CHANGE_STATUS');
};
d_visualize.actions['LOADING_START'] = function (context, payload) {
	context.commit('LOADING_START');
};
d_visualize.actions['LOADING_END'] = function (context, payload) {
	context.commit('LOADING_END');
};