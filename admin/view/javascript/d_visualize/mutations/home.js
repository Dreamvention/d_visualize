d_visualize.mutations['CHANGE_TEMPLATE'] = function (state, payload) {
	Vue.set(state.setting, 'active_template', payload.value);
};