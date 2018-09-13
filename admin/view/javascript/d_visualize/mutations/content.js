d_visualize.state.templates = {}
d_visualize.state.setting ={};

d_visualize.mutations['LOAD_CONTENT_FAIL'] = function (state, payload) {
};
d_visualize.mutations['LOAD_CONTENT_SUCCESS'] = function (state, payload) {
	Vue.set(state.setting, 'active_template', payload.setting.active_template);
	Vue.set(state.setting, 'status', payload.setting.status);
	Vue.set(state.setting, 'auto_save', payload.setting.auto_save);
	Vue.set(state, 'templates', payload.templates);
};