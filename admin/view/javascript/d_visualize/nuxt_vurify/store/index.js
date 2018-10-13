export const actions = {
    async nuxtClientInit({dispatch, commit}) {
        commit('load/LOADING_START');
        await dispatch('opencart/GET_OPDATA');
        await dispatch('setting/GET_SETTING')

    }
}
