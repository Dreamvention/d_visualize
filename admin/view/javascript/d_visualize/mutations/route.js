d_visualize.state.edit_history = ['/home/dashboard', '/edit'];
d_visualize.state.iframe_history = ['/'];

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
