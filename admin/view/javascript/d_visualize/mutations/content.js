d_visualize.state.setting =
    {
        active_template: '',
        available_templates: []
    };

d_visualize.mutations['LOAD_CONTENT_FAIL'] = function (state, payload) {
};
d_visualize.mutations['LOAD_CONTENT_SUCCESS'] = function (state, payload) {
    Vue.set(state.setting, 'active_template', payload.setting.active_template);
    Vue.set(state.setting, 'available_templates', payload.setting.available_templates);
    Vue.set(state.setting, 'status', payload.setting.status);
    Vue.set(state.setting, 'auto_save', payload.setting.auto_save);
};