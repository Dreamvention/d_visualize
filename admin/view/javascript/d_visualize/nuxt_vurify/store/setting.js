// state
export const state = () => ({
    all_setting: null,
    status: null,
});
// getters
export const getters = {
    all_setting: state => state.all_setting,
    status: state => state.status
};
// mutations
export const mutations = {
    SET_SETTING(state, payload) {
        state.all_setting = payload;
    },
    SET_STATUS(state, payload) {
        state.status = payload;
    }
};
// actions
export const actions = {
    async GET_SETTING({commit}) {
        let {data} = await this.$axios.get('extension/d_visualize/setting')
        commit('SET_SETTING', data.setting)
        commit('SET_STATUS', data.status)
    }
};
