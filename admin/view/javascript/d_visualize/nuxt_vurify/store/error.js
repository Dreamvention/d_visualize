export const actions = {
    async onRequest({dispatch, commit},error) {
        commit('load/LOADING_START');
        await dispatch('opencart/GET_OPDATA');
        await dispatch('setting/GET_SETTING')

    },
    async onResponse({dispatch, commit},error) {
        commit('load/LOADING_START');
        await dispatch('opencart/GET_OPDATA');
        await dispatch('setting/GET_SETTING')

    }
}
