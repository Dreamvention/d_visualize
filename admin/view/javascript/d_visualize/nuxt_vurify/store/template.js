// state
export const state = () => ({
    templates: null,
});
// getters
export const getters = {
    templates: state => state.templates,
    active_template: (state, getters, rootState, rootGetters) => {
	    //for some reasons dev tools make first call of this getters
	    return (getters.templates[rootState.setting.all_setting.active_template]);
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
	active_skin_colors: (state, getters)=>{
		return getters.active_template.skines[getters.active_template.setting.active_skin].colors;
	},
	active_skin_typography: (state, getters)=>{
		return getters.active_template.skines[getters.active_template.setting.active_skin].typography;
	},
	active_skin_buttons: (state, getters)=>{
		return getters.active_template.skines[getters.active_template.setting.active_skin].buttons;
	},
	active_skin_grid: (state, getters)=>{
		return getters.active_template.skines[getters.active_template.setting.active_skin].grid;
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
	RENAME_TEMPLATE_TITLE(state, rootState, payload) {
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
	CHANGE_SKIN_COLOR(state, payload) {
		state.templates[payload.template_id]
			.skines[payload.skin]
			.colors[payload.color_key] = payload.color_value;
	},
};
// actions
export const actions = {
    async GET_TEMPLATES({commit}) {
        let {data} =  await this.$axios.get('extension/d_visualize/template/all');
        commit('SET_TEMPLATES', data)
    },
	async GET_COMPONENTS({commit}) {
		let {data: {components: components}} = await this.$axios.get('extension/d_visualize/template/components');
		commit('SET_COMPONENTS', components);
	},
    async RENAME_TEMPLATE_TITLE({commit},payload) {
        commit('RENAME_TEMPLATE_TITLE', payload)
    },
	async SAVE({commit}, payload) {
		let {data} = await this.$axios.post('extension/d_visualize/template/save', {
			template_id: payload.setting.codename,
			template: payload,
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
	async CHANGE_SKIN_COLOR({commit, dispatch, getters}, payload) {
		commit('CHANGE_SKIN_COLOR', payload);
		document.getElementById('iframe').contentWindow.postMessage({
			vz_token: true,
			vz_change_css: {
				template_id: payload.template_id,
				skin: payload.skin,
				colors: getters.active_skin_colors
			}
		}, '*');
	}
};
