d_visualize.actions['SAVE_CONTENT'] = function (context, payload) {
	$.post(context.state.config.save_url, {setting: JSON.stringify(_.extend({}, context.rootState.elements.entities))}, function (data, status) {
		if (status === 'success') {
			alertify.notify('sample', 'success', 5, function () {
				console.log('dismissed');
			});
		}
	}, 'json');
};

d_visualize.actions['LOAD_CONTENT'] = function (context, payload) {
	$.post(context.state.config.load_setting_url, {type: 'common', 'id': 0}, function (data, status) {
		if (status === 'success') {
			context.commit('LOAD_CONTENT_SUCCESS', data);
		}
		if (status === 'error') {
			context.commit('LOAD_CONTENT_FAIL', data);
		}
	}, 'json').fail(function () {
		alertify.error(app.$i18n.t('error.load_content'));
	});
};
