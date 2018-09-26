d_visualize.state.edit_history = ['/home/dashboard', '/edit'];
d_visualize.state.iframe_history = [];
d_visualize.state.menu = {
	hidden: false,
	navigation:[],
	navigation_history:[]
};

d_visualize.mutations['CHANGE_NAVIGATION_CONTEXT'] = function (state, payload) {
	state.menu.navigation_history.push(state.menu.navigation);
	var new_history = JSON.parse(JSON.stringify(state.menu.navigation_history));
	var new_navigation = JSON.parse(JSON.stringify(payload));
	Vue.set(state, 'menu', JSON.parse(JSON.stringify({
		hidden: state.menu.hidden,
		navigation:new_navigation,
		navigation_history:new_history
	})));

};
d_visualize.mutations['PUSH_EDIT_HISTORY'] = function (state, payload) {
	state.edit_history.push(payload);
	var new_history = JSON.parse(JSON.stringify(state.edit_history));
	Vue.set(state, 'edit_history', new_history);
};
d_visualize.mutations['POP_EDIT_HISTORY'] = function (state, payload) {
	state.edit_history.pop();
	var new_history = JSON.parse(JSON.stringify(state.edit_history));
	Vue.set(state, 'edit_history', new_history);
};
d_visualize.mutations['PUSH_IFRAME_HISTORY'] = function (state, payload) {
	state.iframe_history.push(payload);
	var new_history = JSON.parse(JSON.stringify(state.iframe_history));
	Vue.set(state, 'iframe_history', new_history);
};

d_visualize.mutations['HIDE_MENU'] = function (state, payload) {
	Vue.set(state.menu, 'hidden', true);
};
d_visualize.mutations['SHOW_MENU'] = function (state, payload) {
	Vue.set(state.menu, 'hidden', false);
};
