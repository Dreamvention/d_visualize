d_visualize.state.loading = {
	status: Index.WAITING,
	on_progress: false,
	content_loaded: false,
	loader_stack: 0
};

d_visualize.mutations['LOADING_START'] = function (state, payload) {
	Vue.set(state, 'loading', $.extend({}, state.loading, {
		status: Index.LOADING,
		on_progress: true,
		loader_stack: state.loading.loader_stack + 1,
	}));
};
d_visualize.mutations['LOADING_END'] = function (state, payload) {
	if (state.loading.loader_stack > 0) { // set only when some one set start stack
		let loading = $.extend({}, state.loading, {
			on_progress: false,
			content_loaded: true,
			loader_stack: state.loading.loader_stack - 1,
		});
		if (loading.loader_stack === 0) {//wait queue of loading
			loading.status = Index.WAITING;
		} else {
			loading.status = Index.LOADING;
		}
		Vue.set(state, 'loading', loading);
	}
};
d_visualize.mutations['LOADING_SUCCESS'] = function (state, payload) {

	Vue.set(state, 'loading', $.extend({}, state.loading, {
		status: Index.SUCCESS,
		on_progress: false,
		content_loaded: true
	}));
};
d_visualize.mutations['LOADING_FAIL'] = function (state, payload) {
	Vue.set(state, 'loading', $.extend({}, state.loading, {
		status: Index.FAIL,
		on_progress: false,
		content_loaded: false
	}));
};
