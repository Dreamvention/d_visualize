d_visualize.getters.components = function (state, getters) {
	let components = [];
	if (getters.active_template.setting) {
		components = _.reduce(getters.active_template.setting.page.default.layout.partial, function (memo, num, k) {
			//only thouse who have skin overloading
			if (num.component[k].skin){
				memo[k] = num.component[k];
			}
			return memo;
		}, {});
	}
	return components;
};
d_visualize.getters.available_components = function (state) {
	return state.available_components;
};
d_visualize.getters.iframe_src = function (state) {
	return state.iframe_src;
};
d_visualize.getters.vd_loaded = function (state) {
	return state.vd_loaded;
};
d_visualize.getters.component = function (state,getters) {
	return getters.components[state.route.params.id];
};
