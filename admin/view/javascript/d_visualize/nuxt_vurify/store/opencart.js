// state
import {map} from 'lodash'

export const state = () => ({
    opData: {
        title:false,
        header:false,
        footer:false,
        base_url:null,
        breadcrumbs:null
    },
});
// getters
export const getters = {
        opData: state => state.opData,
    }
;
// mutations
export const mutations = {
    SET_OP_DATA(state, opData) {
        state.opData = opData;
    }
};
// actions
export const actions = {
    async GET_OPDATA({commit}) {
        const {data} = await this.$axios.get('extension/d_visualize/opencart')
        commit('SET_OP_DATA', data)
    }
};
