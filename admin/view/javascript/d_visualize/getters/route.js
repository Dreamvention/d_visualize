d_visualize.getters.iframe_history = function (state) {
	return state.iframe_history;
};
d_visualize.getters.menu = function (state) {
	return state.menu;
};
d_visualize.getters.route = function (state) {
	return state.route;
};
d_visualize.getters.edit_history = function (state) {
	return state.edit_history;
};
d_visualize.getters.current_page = function (state, getters) {
	let current_page = state.current_page;
	_.map(getters.available_page, (page)=>{
		page = page.replace('/', '\/');
		var matches = state.current_page.match(page);
		if (matches) {
			current_page = page;
		}
	});
	console.log(current_page)
	return current_page;
};
d_visualize.getters.available_page = function (state, getters) {
	return _.keys(getters.active_template.setting.page);
};
