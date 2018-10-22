import {RESPONSIVE} from '~/constants';
// state
export const state = () => ({
    menu: {
        hidden: false
    },
	mobile_toggle: RESPONSIVE.FULL,
    components: null,
    iframe: null
});

// getters
export const getters = {
    menu: state => state.menu,
    iframe: state => state.iframe,
	mobile_toggle: state => state.mobile_toggle,
    components: state => {
        return state.components
    },
	iframe_pages: (state, getters, rootState, rootGetters)=>{
		if (rootGetters['template/active_template'])
			return _.map(_.keys(rootGetters['template/active_template'].setting.page), (n)=>{
				return {value: n, text: `page.${n.replace('/', '_').replace('*','all')}`};
			}).splice(1);
	},
	current_page: (state, getters)=>{
		let current_page = getters.iframe.page;
		_.map(getters.iframe_pages, (page)=>{
			var matches = getters.iframe.page.match(page.value.replace('/', '\/'));
			if (matches) {
				current_page = page.value;
			}
		});
		return current_page;
	}
};
// mutations
export const mutations = {
    SET_IFRAME(state, payload) {
        state.iframe = payload
    },
	SET_MOBILE_TOGGLE(state,payload){
		state.mobile_toggle = payload;
	},
	CHANGE_IFRAME_PAGE(state, payload) {
		state.iframe.page = payload;
	},
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
	async SAVE_IFRAME_HISTORY({commit}, payload) {
		await this.$axios.post('extension/d_visualize/editor/save_iframe_url', {
			last_url: payload
		});
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