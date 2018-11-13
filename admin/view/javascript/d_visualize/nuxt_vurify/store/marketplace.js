import Vue from 'vue';

export const state = () => ({
    templates: null,
});
export const getters = {
    templates: state=>state.templates,
}
export const mutations = {
    SET_SHOPUNITY_THEMES(state,payload){
        Vue.set(state,'templates',payload)
    }
}
export const actions = {
    async GET_SHOPUNITY_THEMES({commit, dispatch, getters}, payload) {
        let {data} = await this.$axios.get('shopunity', {data: {type: 'theme', tag: 'd_visualize'}})
        commit('SET_SHOPUNITY_THEMES',data)
    }
}
