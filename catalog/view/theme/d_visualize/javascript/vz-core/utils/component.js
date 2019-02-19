function component() {
	this.dispatch = function (action, state) {
		$(document).trigger(action,state);
	};
	this.subscribe = function (action, callback) {
		$(document).on(action, callback);
	};
}