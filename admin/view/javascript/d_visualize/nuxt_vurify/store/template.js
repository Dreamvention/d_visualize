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
	async SET_VARIATION({commit}, payload) {
		commit('SET_VARIATION', payload);
		//dispatch on save
	},
};
