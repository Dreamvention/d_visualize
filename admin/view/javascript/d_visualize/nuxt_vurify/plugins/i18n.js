import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: 1,
	messages: {}
});

export default async ({app, store, $axios})=>{
	let {data} = await $axios.get('extension/module/d_visualize/load_language');
	try {
		i18n.setLocaleMessage(data.locale, data.messages[data.locale]);
		i18n.locale = data.locale;
		app.i18n = i18n;
	} catch (e) {
		store.dispatch('load/LOADING_FAIL',e);
		store.dispatch('error/ERROR_LANG',e);
	}

}
