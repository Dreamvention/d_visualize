d_visualize.state.status = 0;
d_visualize.state.loading_first = true;
d_visualize.state.loading = false;

d_visualize.mutations['CHANGE_STATUS'] = function (state, payload) {
	Vue.set(state, 'status', !state.status);
};
