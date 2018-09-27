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
d_visualize.mutations['UPDATE_COMPONENT_CURRENT'] = function (state, payload) {
	Vue.set(state, 'current_component', payload);
};
d_visualize.mutations['UPDATE_COMPONENT'] = function (state, payload) {
	let old_component = state.templates[payload.active_template_id].setting.page.default.layout.partial[payload.component_id].component[payload.component_id];
	let new_component = JSON.parse(JSON.stringify(old_component));
	new_component.skin = payload.component_skin;
	new_component.template = old_component.template.replace(/(\w+).twig/, new_component.skin + '.twig');
	if (old_component.stylesheet) {
		new_component.stylesheet = old_component.stylesheet.replace(/(\w+).css/, new_component.skin + '.css');
	} else {
		//if there no styles add them by default
		new_component.stylesheet = 'd_visualize/stylesheet/dist/vz-component/' + payload.component_id + '/' + new_component.skin + '.css';
	}
	console.log(new_component);
	Vue.set(state.templates[payload.active_template_id].setting.page.default.layout.partial[payload.component_id].component, payload.component_id, new_component);
};
//main changing skin
d_visualize.mutations['UPDATE_SKIN'] = function (state, payload) {
	Vue.set(state.templates[payload.active_template_id].setting, 'active_skin', payload.skin);
};
