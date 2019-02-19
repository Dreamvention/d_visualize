export const actions = {
    async nuxtClientInit({dispatch, commit}) {
        await dispatch('editor/IFRAME_INIT');
        // await dispatch('setting/GET_SETTING');
	    // await dispatch('template/GET_TEMPLATES');
    }
}
