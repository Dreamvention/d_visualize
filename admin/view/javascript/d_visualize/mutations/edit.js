d_visualize.state.vd_loaded = false;
d_visualize.state.iframe_src = '';
d_visualize.state.menu = {
	hidden: false
};
d_visualize.mutations['LOAD_VISUAL_HEADER'] = function (state, payload) {
	Vue.set(state, 'iframe_src', payload);
};
d_visualize.mutations['LOAD_VISUAL_FOOTER'] = function (state, payload) {
	Vue.set(state, 'iframe_src', payload);
};
d_visualize.mutations['CHANGE_IFRAME_SRC'] = function (state, payload) {
	Vue.set(state, 'iframe_src', payload);
};
d_visualize.mutations['ENTER_VISUAL'] = function (state, payload) {
	Vue.set(state, 'vd_loaded', true);
};
d_visualize.mutations['LEAVE_VISUAL'] = function (state, payload) {
	Vue.set(state, 'vd_loaded', false);
};
d_visualize.mutations['HIDE_MENU'] = function (state, payload) {
	Vue.set(state.menu, 'hidden', true);
};
d_visualize.mutations['SHOW_MENU'] = function (state, payload) {
	Vue.set(state.menu, 'hidden', false);
};
