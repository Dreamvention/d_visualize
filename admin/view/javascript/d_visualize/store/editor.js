import {RESPONSIVE} from '~/constants';
import Vue from 'vue';
// state
export const state = () => ({
    menu: {
	    hidden: false,
	    navigation: {
	    	common:[],
		    current_page:[]
	    },
	    active_tab:1
    },
	mobile_toggle: RESPONSIVE.FULL,
    iframe: null
});

// getters
export const getters = {
    menu: state => state.menu,
    iframe: state => state.iframe,
	mobile_toggle: state => state.mobile_toggle,
	current_page: (state, getters, rootState, rootGetters)=>{
		let current_page = getters.iframe.page;
		_.map(rootGetters['template/available_pages'], (page)=>{
			var matches = getters.iframe.page.match(page.value.replace('/', '\/'));
			if (matches) {
				current_page = page.value;
			}
		});
		return current_page;
	},
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
	CHANGE_NAVIGATION_CONTEXT(state, payload) {
		Vue.set(state.menu, 'navigation', payload);
	},
	CHANGE_ACTIVE_TAB(state, payload) {
		Vue.set(state.menu, 'active_tab', payload);
	}
};

// actions
export const actions = {
    async GET_EDITOR_IFRAME({commit}) {
        let {data: {iframe: iframe}} = await this.$axios.get('extension/d_visualize/editor')
        commit('SET_IFRAME', iframe)
    },
	async SAVE_IFRAME_HISTORY({commit}, payload) {
		await this.$axios.post('extension/d_visualize/editor/save_iframe_url', {
			last_url: payload
		});
	},
	CHANGE_NAVIGATION_CONTEXT({commit, getters,rootGetters }) {
        var navigation = {};
		navigation.common = Object.keys(rootGetters['template/default_components']).map(function (c) {
			return {
				href: '/editor/' + c,
				text: 'component.entry_' + c
			};
		});
		navigation.current_page = Object.keys(rootGetters['template/page_components']).map(function (c) {
			return {
				href: '/editor/' + c,
				text: 'component.entry_' + c
			};
		});
        commit('CHANGE_NAVIGATION_CONTEXT', navigation);
    },
    HIDE_MENU({commit}, payload) {
        commit('HIDE_MENU', payload)
    },
	IFRAME_INIT({commit, dispatch}, payload) {
		var listener = (event)=>{
			if (event.data.vz_ifame_data) {
				//take from Ifame date about page where it placed
				console.log(event.data.vz_ifame_data)
				commit('CHANGE_IFRAME_PAGE', event.data.vz_ifame_data.route);
				dispatch('SAVE_IFRAME_HISTORY', event.data.vz_ifame_data.location);
				dispatch('CHANGE_NAVIGATION_CONTEXT');
			}
			if (event.data.vz_ifame_loading) {
				console.log('start')
				commit('load/LOADING_START', {}, {root: true});
			}
		};
		window.addEventListener('message', listener);
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