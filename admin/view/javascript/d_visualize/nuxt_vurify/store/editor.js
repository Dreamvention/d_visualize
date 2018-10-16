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
    },
	PUSH_IFRAME_HISTORY(state,payload){
		state.iframe_history.push(payload);
		var new_history = JSON.parse(JSON.stringify(state.iframe_history));
		Vue.set(state, 'iframe_history', new_history);
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
	PUSH_IFRAME_HISTORY({commit}, payload) {

		commit('PUSH_IFRAME_HISTORY', payload);
		// dispatch('CHANGE_PAGE', payload);
		//saving on the server last url
		// let last_visited_url = 'http://localhost/index.php?route=common/home';
		// if (getters.iframe_history[getters.iframe_history.length - 1].href) {
		// 	last_visited_url = getters.iframe_history[context.getters.iframe_history.length - 1].href;
		// }
		// $.post(state.config.save_iframe_url, {
		// 	last_url: last_visited_url
		// }, function (data, status) {
		// 	if (status === 'success') {
		// 	}
		// }, 'json').fail(function (e, m) {
		// 	// context.commit('LOADING_END');
		// 	error(m);
		// 	error(app.$i18n.t('error.save_content'));
		// });
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