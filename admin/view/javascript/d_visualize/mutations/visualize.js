d_visualize.state.status = 0;
d_visualize.state.loading_first = true;
d_visualize.state.loading = false;

d_visualize.mutations['CHANGE_STATUS'] = function (state, payload) {
	Vue.set(state.setting, 'status', !state.setting.status);
};
d_visualize.mutations['CHANGE_AUTO_SAVE'] = function (state, payload) {
	Vue.set(state.setting, 'auto_save', !state.setting.auto_save);
};
