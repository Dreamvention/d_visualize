export const state = ()=>({
	status: false,
	message: '',
});

export const getters = {
	message: state=>state.message
}
export const mutations = {
	SET_ERROR_MESSAGE(state, payload) {
		state.status = true;
		state.message = payload;
	}
};
export const actions = {
	LOAD_RESPONSE({commit}, payload) {
		commit('SET_ERROR_MESSAGE', payload);
	}
};