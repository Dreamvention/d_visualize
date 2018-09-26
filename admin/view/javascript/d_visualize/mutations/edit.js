d_visualize.state.current_component = {};
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

//main changing component
d_visualize.mutations['UPDATE_COMPONENT'] = function (state, payload) {
	let old_component = state.templates[payload.active_template_id].setting.page.default.layout.partial[payload.component_id].component[payload.component_id];
	let new_component = JSON.parse(JSON.stringify(old_component));
	new_component.skin = payload.component_skin;
	new_component.template = old_component.template.replace(old_component.skin, new_component.skin);
	if (old_component.stylesheet) {
		new_component.stylesheet = old_component.stylesheet.replace(old_component.skin, new_component.skin);
	} else {
		//if there no styles add them by default
		new_component.stylesheet = 'd_visualize/stylesheet/dist/vz-component/' + payload.component_id + '/' + new_component.skin + '.css';
	}
	Vue.set(state.templates[payload.active_template_id].setting.page.default.layout.partial[payload.component_id].component, payload.component_id, new_component);
	Vue.set(state, 'current_component', new_component);
};
