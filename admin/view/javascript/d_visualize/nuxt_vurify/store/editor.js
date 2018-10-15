// state
export const state = () => ({
    menu: {
        hidden: false
    },
    components: null,
    iframe: null
});

// getters
export const getters = {
    menu: state => state.menu,
    iframe: state => state.iframe,
    components: state => {
        return state.components
    }
};

// mutations
export const mutations = {
    SET_IFRAME(state, payload) {
        state.iframe = payload
    }
};

// actions
export const actions = {
    async GET_EDITOR_IFRAME({commit}) {
        let {data: {iframe: iframe}} = await this.$axios.get('extension/d_visualize/editor')
        commit('SET_IFRAME', iframe)
    },
    CHANGE_NAVIGATION_CONTEXT({commit}) {
        var navigation = [];
        navigation.push({
            href: '/editor/vdh',
            text: 'edit.vdh'
        });
        // navigation = navigation.concat(Object.keys(context.getters.components).map(function (c) {
        //     return {
        //         href: '/editor/components/' + c,
        //         text: 'editor.entry_' + c
        //     };
        // }));
        navigation.push({
            href: '/editor/vdf',
            text: 'edit.vdf'
        });
        commit('CHANGE_NAVIGATION_CONTEXT', navigation);
    },
    HIDE_MENU({commit}, payload) {
        commit('HIDE_MENU', payload)
    },

};

/*
};
d_visualize.actions['PUSH_NAVIGATION_HISTORY'] = function (context, payload) {
    context.commit('PUSH_NAVIGATION_HISTORY', payload);
}
d_visualize.actions['SHOW_MENU'] = function (context, payload) {
    context.commit('SHOW_MENU', payload);
};
d_visualize.getters.iframe_history = function (state) {
    return state.iframe_history;
};
d_visualize.getters.menu = function (state) {
    return state.menu;
};
d_visualize.getters.route = function (state) {
    return state.route;
};
d_visualize.getters.edit_history = function (state) {
    return state.edit_history;
};
d_visualize.getters.current_page = function (state, getters) {
    let current_page = state.current_page;
    _.map(getters.available_page, (page) => {
        page = page.replace('/', '\/');
        var matches = state.current_page.match(page);
        if (matches) {
            current_page = page;
        }
    });
    return current_page;
};
d_visualize.getters.available_page = function (state, getters) {
    return _.keys(getters.active_template.setting.page);
};
*/