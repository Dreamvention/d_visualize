d_visualize.actions['SAVE_CONTENT'] = function (context, payload) {
    context.commit('LOADING_START');
    $.post(context.state.config.save_url, {
        setting :{
            active_template: context.state.setting.active_template,
	        auto_save: +context.state.setting.auto_save
        },
        status: +context.state.setting.status,
    }, function (data, status) {
        if (status === 'success') {
            context.commit('LOADING_END');
            alertify.success(data['success']);
            if (!_.isUndefined(payload) && !_.isUndefined(payload.callback) && _.isFunction(payload.callback)) {
                payload.callback(data)
            }
        }
    }, 'json').fail(function (e, m) {
        context.commit('LOADING_END');
        alertify.error(m);
        alertify.error(app.$i18n.t('error.save_content'));
    });
};

d_visualize.actions['LOAD_CONTENT'] = function (context, payload) {
    context.commit('LOADING_START');
    $.post(context.state.config.load_setting_url, {type: 'common', 'id': 0}, function (data, status) {
        if (status === 'success') {
            context.commit('LOAD_CONTENT_SUCCESS', data);
        }
        if (status === 'error') {
            context.commit('LOAD_CONTENT_FAIL', data);
        }
        context.commit('LOADING_END');
    }, 'json').fail(function () {
        alertify.error(app.$i18n.t('error.load_content'));
        context.commit('LOADING_END');
    });
};

d_visualize.actions['LOADING_START'] = function (context, payload) {
    context.commit('LOADING_START');
};
d_visualize.actions['LOADING_END'] = function (context, payload) {
    context.commit('LOADING_END');
};