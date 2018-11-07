import {LOAD} from '~/constants';
import Vue from 'vue';
// state
export const state = ()=>({
	loading: {
		status: LOAD.WAITING,
		on_progress: false,
		content_loaded: false,
		loader_stack: 0
	}
});

// getters
export const getters = {
	loading: state=>state.loading
};

// mutations
export const mutations = {
	LOADING_START(state, payload) {
		//if there is no error
		if (state.loading.status !== LOAD.FAIL) {
			Vue.set(state, 'loading', _.extend({}, state.loading, {
				status: LOAD.LOADING,
				on_progress: true,
				loader_stack: state.loading.loader_stack + 1,
			}));
		}

	},
	LOADING_END(state, payload) {
		if (state.loading.loader_stack > 0) { // set only when some one set start stack
			if (state.loading.status !== LOAD.FAIL) {
				let loading = _.extend({}, state.loading, {
					on_progress: false,
					content_loaded: true,
					loader_stack: state.loading.loader_stack - 1,
				});
				if (loading.loader_stack === 0) {//wait queue of loading
					loading.status = LOAD.WAITING;
				} else {
					loading.status = LOAD.LOADING;
				}
				Vue.set(state, 'loading', loading);
			}
		}
	},
	LOADING_SUCCESS(state, payload) {

		Vue.set(state, 'loading', _.extend({}, state.loading, {
			status: LOAD.SUCCESS,
			on_progress: false,
			content_loaded: true
		}));
	},
	LOADING_FAIL(state, payload) {
		console.log('fail');
		Vue.set(state, 'loading', _.extend({}, state.loading, {
			status: LOAD.FAIL,
			on_progress: false,
			content_loaded: false
		}));
	},

};

// actions
export const actions = {
	LOADING_FAIL({commit}, payload) {
		commit('LOADING_FAIL', payload);
	}
};
