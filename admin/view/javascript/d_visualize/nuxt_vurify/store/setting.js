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
    },
    TOGGLE_STATUS(state, payload) {
        state.status = !state.status;
    }
};
// actions
export const actions = {
    async GET_SETTING({commit}) {
        // const { data: { message: dog } } = await app.$axios.get('/dog')
        // return { dog }
        let {data} = await this.$axios.get('extension/d_visualize/setting')
        commit('SET_SETTING', data.setting)
        commit('SET_STATUS', data.status)
    },
    async TOGGLE_STATUS({commit}) {
        commit('TOGGLE_STATUS')
    },
    async SAVE({$store}) {
        let {data} = await this.$axios.post('extension/d_visualize/setting/save', {
            status: $store.getters['setting/status'],
            setting: $store.getters['setting/all_status'],
        })
        data = await this.$axios.post('extension/d_visualize/template/save', {
            template: $store.getters['template/active_template'],
        })
        // commit('SET_STATUS', data.status)
    }
};