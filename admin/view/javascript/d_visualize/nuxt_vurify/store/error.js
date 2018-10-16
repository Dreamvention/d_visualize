export const state = ()=>({
	status: false,
	message: '',
});

export const getters = {
	getMessage: state=>state.message
}
export const mutations = {
	SET_ERROR_MESSAGE(state, payload) {
		state.status = true;
		state.message = payload.message;
	}
};
export const actions = {
	ERROR_LANG({commit}, payload) {
		payload.message=payload.message+'- error lang'
		commit('SET_ERROR_MESSAGE', payload);
	}
};