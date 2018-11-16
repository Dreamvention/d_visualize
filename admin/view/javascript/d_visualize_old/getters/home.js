d_visualize.getters.templates = function (state) {
	return state.templates;
};
d_visualize.getters.active_template = function (state, getters) {
	return _.find(getters.templates, (v)=>{
		return state.setting.active_template === v.setting.codename;
	});
};
