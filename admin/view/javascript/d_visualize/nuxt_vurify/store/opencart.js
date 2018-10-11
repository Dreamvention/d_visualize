// state
export const state = () => ({
    opData: null,
});
// getters
export const getters = {
    opData: state=>state.opData,
};
// mutations
export const mutations = {
    SET_OP_DATA(state,opData) {
        state.opData = opData;
    }
};
// actions
export const actions = {
    async GET_OPDATA ({ commit }) {
        const { data } = await this.$axios.get('extension/module/d_visualize/opencartData')
        commit('SET_OP_DATA', data)
    }
};
