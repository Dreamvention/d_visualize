// state
import {map} from 'lodash';

export const state = () => ({
    opData: {
        title:false,
        header:false,
        footer:false,
        base_url:null,
        breadcrumbs:null
    },
	menu: true,
});
// getters
export const getters = {
	opData: state=>state.opData,
	menu: state=>state.menu,
    };
// mutations
export const mutations = {
    SET_OP_DATA(state, opData) {
        state.opData = opData;
    },
	TOGGLE_MENU(state, payload) {
		state.menu = !state.menu;
	},

};
// actions
export const actions = {
    async GET_OPDATA({commit}) {
        const {data} = await this.$axios.get('extension/d_visualize/opencart')
        commit('SET_OP_DATA', data)
    },
    async REFRESH_DB({commit}) {
        const {data} = await this.$axios.get('extension/d_visualize/opencart/refresh_db')
    },
    async TRANCE_DB({commit}) {
        const {data} = await this.$axios.get('extension/d_visualize/opencart/trunce_db')
    },
	async RECREATE_AM({commit}) {
        const {data} = await this.$axios.get('extension/d_visualize/opencart/refresh_menu')
    },
	async SETUP({dispatch}){
		await dispatch('setting/GET_SETTING',{},{root:true})
		await dispatch('setting/TOGGLE_STATUS',{},{root:true})
		await dispatch('setting/CHANGE_ACTIVE_TEMPLATE','default',{root:true})
		await dispatch('setting/SAVE',{},{root:true})
	}
};
