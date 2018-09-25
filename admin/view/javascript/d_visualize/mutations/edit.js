d_visualize.state.current_component = undefined;
d_visualize.state.theme_components = [];
d_visualize.state.vd_loaded = false;
d_visualize.state.iframe_src = '';
d_visualize.state.available_components = [];

d_visualize.mutations['CHANGE_CURRENT_COMPONENT'] = function (state, payload) {
	Vue.set(state, 'current_component', payload);
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
d_visualize.mutations['LOAD_VISUAL_HEADER'] = function (state, payload) {
	Vue.set(state, 'iframe_src', payload);
};
d_visualize.mutations['LOAD_VISUAL_FOOTER'] = function (state, payload) {
	Vue.set(state, 'iframe_src', payload);
};
d_visualize.mutations['UPDATE_COMPONENT'] = function (state, payload) {
	// state.templates[payload.active_template_id].setting.page.default.layout.partial[payload.component_id].component[payload.component_id] = payload.component;
	Vue.set(state.templates[payload.active_template_id].setting.page.default.layout.partial[payload.component_id].component, payload.component_id, payload.component);
	console.log(state.templates[payload.active_template_id].setting.page.default.layout.partial[payload.component_id].component)
	// state.theme_components[payload.id] = payload.component;
	// var new_theme_components = JSON.parse(JSON.stringify(state.theme_components));
	// Vue.set(state, 'theme_components', new_theme_components);
};
