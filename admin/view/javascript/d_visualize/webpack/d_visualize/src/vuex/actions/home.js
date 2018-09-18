d_visualize.actions['CHANGE_TEMPLATE'] = function (context, payload) {
    context.commit('CHANGE_TEMPLATE', payload);
    if (context.getters.setting.auto_save){
        context.dispatch('SAVE_CONTENT');
    }
}