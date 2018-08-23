d_visualize.state.setting =
	{
		active_template: '',
		available_templates: []
	};

d_visualize.mutations['LOAD_CONTENT_FAIL'] = function (state, payload) {
};
d_visualize.mutations['LOAD_CONTENT_SUCCESS'] = function (state, payload) {
	Vue.set(state.setting, 'active_template', payload.setting.active_template);
	Vue.set(state.setting, 'available_templates', payload.setting.available_templates);
	Vue.set(state,'status',  payload.status)
};
d_visualize.mutations['CHANGE_TEMPLATE'] = function (state, payload) {
	Vue.set(state.setting, 'active_template', state.setting.active_template);
}