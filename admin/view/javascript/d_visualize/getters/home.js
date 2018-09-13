d_visualize.getters.templates = function (state) {
	return state.templates;
};
d_visualize.getters.active_template = function (state, getters) {
	let active = _.find(getters.templates, (v)=>{
		return state.setting.active_template === v.setting.codename;
	});
	if (!active) {
		active = {img:'',setting:'',source:''}
	}
	return active;
};
