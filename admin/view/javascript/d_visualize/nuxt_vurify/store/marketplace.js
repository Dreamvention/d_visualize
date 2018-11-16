import Vue from 'vue';

export const state = () => ({
    shopunity_templates: null,
});
export const getters = {
    templates: (state)=>{
	    let templates = _.reduce(state.shopunity_templates,(mem,t)=>{
	        let tem = _.extend({},t);
		    tem.db_saved = false;
		    tem.source = 'shopunity';
		    tem.setting = {}
		    tem.setting.title=t.name;
		    tem.setting.codename=t.codename;
		    tem.setting.description=t.description;
		    tem.preview = {};
		    tem.preview.processed_images = _.map(t.processed_images,t=>t.url);
		    tem.preview.desktop = t.image;
		    tem.preview.mobile = t.image;
            mem[t.codename] = tem;
            return mem
        },{})
        return templates;
    }
}
export const mutations = {
    SET_SHOPUNITY_THEMES(state,payload){
        Vue.set(state,'shopunity_templates',payload)
    }
}
export const actions = {
    async GET_SHOPUNITY_THEMES({commit, dispatch, getters}, payload) {
        let {data} = await this.$axios.get('shopunity', {data: {type: 'theme', tag: 'd_visualize'}})
        commit('SET_SHOPUNITY_THEMES',data)
    }
}
