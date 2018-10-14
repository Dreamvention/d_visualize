// state
export const state = () => ({
    templates: null,
});
// getters
export const getters = {
    templates: state => state.templates,
    active_template: (state, getters, rootState, rootGetters) => {
        //for some reasons nuxt make a call if there is rootState which is needed
        if (rootState.setting.all_setting) {
            return (getters.templates[rootState.setting.all_setting.active_template])
        }
    },
};
// mutations
export const mutations = {
    SET_TEMPLATES(state, payload) {
        state.templates = payload;
    },
    RENAME_TEMPLATE_TITLE(state, payload) {
        state.templates[payload.template_codename].title = payload.value;
    },
};
// actions
export const actions = {
    async GET_TEMPLATES({commit}) {
        let {data} =  await this.$axios.get('extension/d_visualize/template/all');
        commit('SET_TEMPLATES', data)
    },
    async RENAME_TEMPLATE_TITLE({commit},payload) {
        commit('RENAME_TEMPLATE_TITLE', payload)
    },
};
