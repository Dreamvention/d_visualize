d_visualize.state.iframe_history = [];
d_visualize.state.current_page = '';
d_visualize.state.menu = {
    hidden: false,
    navigation: [],
    navigation_history: []
};

d_visualize.mutations['PUSH_NAVIGATION_HISTORY'] = function (state, payload) {
    state.menu.navigation_history.push(payload);
    var new_history = JSON.parse(JSON.stringify(state.menu.navigation_history));
    Vue.set(state.menu, 'navigation_history', new_history);
}
d_visualize.mutations['CHANGE_NAVIGATION_CONTEXT'] = function (state, payload) {
    // var new_menu = JSON.parse(JSON.stringify(state.menu));
    // new_menu.navigation = payload;
    Vue.set(state.menu, 'navigation', payload);

};

d_visualize.mutations['PUSH_IFRAME_HISTORY'] = function (state, payload) {
    state.iframe_history.push(payload);
    var new_history = JSON.parse(JSON.stringify(state.iframe_history));
    Vue.set(state, 'iframe_history', new_history);
};
d_visualize.mutations['CHANGE_PAGE'] = function (state, payload) {
    Vue.set(state, 'current_page', payload);
};

d_visualize.mutations['HIDE_MENU'] = function (state, payload) {
    Vue.set(state.menu, 'hidden', true);
};
d_visualize.mutations['SHOW_MENU'] = function (state, payload) {
    Vue.set(state.menu, 'hidden', false);
};
