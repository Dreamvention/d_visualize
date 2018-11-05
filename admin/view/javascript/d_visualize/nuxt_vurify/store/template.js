import Vue from 'vue';
// state
export const state = () => ({
	templates: null,
});
// getters
export const getters = {
	templates: state=>state.templates,
	active_template: (state, getters, rootState, rootGetters)=>{
		//for some reasons dev tools make first call of this getters
		return (getters.templates[rootState.setting.all_setting.active_template]);
	},
	active_template_skin: (state, getters)=>{
		return getters.active_template.skines[getters.active_template.setting.active_skin];
	},
	active_skin_holder: (state, getters)=>(holder_key)=>{
		return getters.active_template_skin[holder_key];
	},
	active_skin_holder_variables: (state, getters)=>(holder_key)=>{
		return getters.active_template_skin.settings[holder_key].variables;
	},
	available_components: state=>state.available_components,
	component: (state, getters)=>id=>{
		return getters.available_components[id];
	},
	default_components: (state, getters)=>{
		let components = _.reduce(getters.active_template.setting.page['default'].layout.component, (memo, component, key)=>{
			if (component.editable) {
				memo[key] = component;
			}
			return memo;
		}, []);
		return components;
	},
	page_components: (state, getters, rootState, rootGetters)=>{
		let components = _.reduce(getters.active_template.setting.page[rootGetters['editor/current_page']].layout.component, (memo, component, key)=>{
			if (component.editable) {
				memo[key] = component;
			}
			return memo;
		}, []);
		return components;

	},
	available_pages: (state, getters)=>{
		return _.map(_.keys(getters.active_template.setting.page), (n)=>{
			return {value: n, text: `page.${n.replace('/', '_').replace('*', 'all')}`};
		}).splice(1);
	},
};
// mutations
export const mutations = {
	SET_TEMPLATES(state, payload) {
		state.templates = payload;
	},
	SET_COMPONENTS(state, payload) {
		state.available_components = payload;
	},
	RENAME_TEMPLATE_TITLE(state,  payload) {
		state.templates[payload.template_codename].title = payload.value;
	},
	SET_VARIATION(state, payload) {
		state.templates[payload.template_id]
			.setting
			.page[payload.page]
			.layout.component[payload.component_id]
			.skin = payload.variation;
	},
	SET_SKIN(state, payload) {
		state.templates[payload.template_id]
			.setting
			.active_skin = payload.skin;
	},
	SET_SKIN_VARIABLE(state, payload) {
		let holder = JSON.parse(JSON.stringify(state.templates[payload.template_id]
			.skines[payload.skin]
			[payload.holder]
		));
		holder[payload.key] = payload.value;
		Vue.set(state.templates[payload.template_id].skines[payload.skin], payload.holder, holder);
	},
	SET_SKIN_CUSTOM_STYLE(state, payload) {
		state.templates[payload.template_id]
			.skines[payload.skin].custom_style = payload.custom_style;

	},
};
// actions
export const actions = {
	async GET_TEMPLATES({commit}) {
		let {data} = await this.$axios.get('extension/d_visualize/template/all');
		commit('SET_TEMPLATES', data);
	},
	async GET_COMPONENTS({commit}) {
		let {data: {components: components}} = await this.$axios.get('extension/d_visualize/template/components');
		commit('SET_COMPONENTS', components);
	},
	async RENAME_TEMPLATE_TITLE({commit, dispatch, getters}, payload) {
		commit('RENAME_TEMPLATE_TITLE', payload);
		dispatch('SAVE', getters.active_template);
	},
	/*
	 * payload is a template
	 * need to get config of the template
	 * and custom styles
	 * */
	async SAVE({commit, dispatch, getters}, payload) {
		let {data: {template: template}} = await this.$axios.post('extension/d_visualize/template/save', {
			template_id: payload.setting.codename,
			template: payload,
		});
		let config_template_skin = getters.templates[payload.setting.codename].skines[payload.setting.active_skin];
		await dispatch('SAVE_CUSTOM', {
			codename: payload.setting.codename,
			skin: payload.setting.active_skin,
			config: config_template_skin,
			custom_style: config_template_skin.custom_style
		});
		await dispatch('setting/SAVE_CUSTOM_STYLE',{},{root:true});
		document.getElementById('iframe').contentWindow.postMessage({
			vz_token: true,
			vz_change_component_variation: true
		}, '*');
	},
	async SAVE_CUSTOM({commit}, payload) {
		let {data} = await this.$axios.post('extension/d_visualize/template/save_custom', {
			template_id: payload.codename,
			skin: payload.skin,
			config: payload.config,
			custom_style: payload.custom_style,
		});
	},

	async SET_VARIATION({commit, dispatch, getters}, payload) {
		commit('SET_VARIATION', payload);
		await dispatch('SAVE', getters.active_template);
		//dispatch to make ajax reload
		document.getElementById('iframe').contentWindow.postMessage({
			vz_token: true,
			vz_change_component_variation: {
				template_id: payload.template_id,
				page: payload.page,
				component_id: payload.component_id,
				skin: payload.variation
			}
		}, '*');
	},
	async SET_SKIN({commit, dispatch, getters}, payload) {
		commit('SET_SKIN', payload);
		await dispatch('SAVE', getters.active_template);
		document.getElementById('iframe').contentWindow.postMessage({
			vz_token: true,
			vz_change_component_variation: true
		}, '*');

	},
	async SET_SKIN_VARIABLE({commit, dispatch, getters}, payload) {
		commit('SET_SKIN_VARIABLE', payload);
		document.getElementById('iframe').contentWindow.postMessage({
			vz_token: true,
			vz_change_css: {
				template_id: payload.template_id,
				skin: payload.skin,
				variables: getters.templates[payload.template_id].skines[payload.skin]
			}
		}, '*');
	},
	async SET_SKIN_CUSTOM_STYLE({commit}, payload) {
		commit('SET_SKIN_CUSTOM_STYLE', payload);
		document.getElementById('iframe').contentWindow.postMessage({
			vz_token: true,
			vz_skin_custom_style: payload.custom_style
		}, '*');
	},


};
