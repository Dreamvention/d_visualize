import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from '~/constants/colors.js';
let res = {};
for (let property in colors.customProperties){
	res[property.slice(2)] = colors.customProperties[property];
}
const MY_ICONS = {
	// 'complete': '',
	// 'cancel': '',
	// 'close': '',
	// 'delete': '', // delete (e.g. v-chip close)
	// 'clear': '',
	// 'success': '',
	// 'info': '',
	// 'warning': '',
	// 'error': '',
	// 'prev': '',
	// 'next': '',
	// 'checkboxOn': '',
	// 'checkboxOff': '',
	// 'checkboxIndeterminate': '',
	// 'delimiter': '', // for carousel
	// 'sort': '',
	// 'expand': 'fas fa-angle-down',
	'menu': 'fas fa-angle-down',
	// 'subgroup': '',
	'dropdown': 'fas fa-angle-down',
	// 'radioOn': '',
	// 'radioOff': '',
	// 'edit': ''
}

Vue.use(Vuetify, {
	theme: res,
	iconfont: 'fa',
	icons: MY_ICONS
});
