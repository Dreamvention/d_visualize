import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from '~/constants/colors.js';

let res = {};
_.each(colors.customProperties, (e, key)=>{
	res[key.slice(2)] = e;
});
Vue.use(Vuetify, {
	theme: res,
	iconfont: 'fa'
});
