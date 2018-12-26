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
	    active_tab: 0
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
			var matches = current_page.match(page.value);
			if (matches) {
				current_page = page.value;
			}
		});
		if (!rootGetters['template/available_pages'].find((i)=>i.value===current_page)){
			return 'common/home';
		}
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
				if (!event.data.vz_ifame_data.route) return;
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
	IFRAME_RELOAD({commit, dispatch, rootGetters}, payload) {
		document.getElementById('iframe').contentWindow.postMessage({vz_token: true, vz_get_iframe_info: true}, '*');
		// save current state customizing after refresh
		document.getElementById('iframe').contentWindow.postMessage({
			vz_token: true,
			vz_change_css: {
				template_id: rootGetters['template/active_template'].setting.codename,
				skin: rootGetters['template/active_template'].setting.active_skin,
				variables: rootGetters['template/active_template'].skines[rootGetters['template/active_template'].setting.active_skin]
			}
		}, '*');
		//save custom section after refresh
		dispatch('setting/SET_GLOBAL_CUSTOM_STYLE', rootGetters['setting/custom_style'], {root: true});
		//save skin section after refresh
		dispatch('template/SET_SKIN_CUSTOM_STYLE',
			{
				template_id: rootGetters['template/active_template'].setting.codename,
				skin: rootGetters['template/active_template'].setting.active_skin,
				custom_style: rootGetters['template/active_template_skin'].custom_style
			},  {root: true});

	},

};

