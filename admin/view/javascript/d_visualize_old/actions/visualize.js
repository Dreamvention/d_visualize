d_visualize.actions['CHANGE_STATUS'] = function (context, payload) {
	context.commit('CHANGE_STATUS');
    if (context.getters.setting.auto_save){
        context.dispatch('SAVE_CONTENT');
    }
};
d_visualize.actions['CHANGE_AUTO_SAVE'] = function (context, payload) {
	context.commit('CHANGE_AUTO_SAVE');
    if (context.getters.setting.auto_save){
        context.dispatch('SAVE_CONTENT');
    }
};