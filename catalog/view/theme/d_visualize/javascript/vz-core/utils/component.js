function component() {
	this.dispatch = function (action, state) {
		console.log(state)
		$(document).trigger(action,state);
	};
	this.subscribe = function (action, callback) {
		$(document).on(action, callback);
	};
}