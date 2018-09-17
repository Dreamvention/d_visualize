d_visualize.state.vd_loaded = false;
d_visualize.state.iframe_history = [];

d_visualize.mutations['LOAD_VISUAL_HEADER'] = function (state, payload) {
	Vue.set(state, 'iframe_src', payload);
};
d_visualize.mutations['LOAD_VISUAL_FOOTER'] = function (state, payload) {
	Vue.set(state, 'iframe_src', payload);
};
d_visualize.mutations['ENTER_VISUAL'] = function (state, payload) {
	Vue.set(state, 'vd_loaded', true);
};
d_visualize.mutations['LEAVE_VISUAL'] = function (state, payload) {
	Vue.set(state, 'vd_loaded', false);
};
d_visualize.mutations['ADD_IFRAME_HISTORY'] = function (state, payload) {
	Vue.set(state, 'iframe_history', payload);
};