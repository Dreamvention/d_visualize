d_visualize.state.loading = true;

d_visualize.mutations['LOADING_START'] = function (state, payload) {
	Vue.set(state, 'loading', true);
};
d_visualize.mutations['LOADING_END'] = function (state, payload) {
	Vue.set(state, 'loading_first', false);
	Vue.set(state, 'loading', false);
};
