<template>
    <div class="marketplace">
        <v-container fluid>
            <!--<div class="display-2">Local</div>-->
            <!--<available-themes :templates="local_templates"/>-->
            <div class="display-3">Marketplace</div>
            <div v-if="marketplace_templates">
                <available-themes :templates="marketplace_templates" :local_templates="local_templates" :active="active_template_codename"/>
            </div>
            <div v-else>
                can't load any from shopunity
            </div>
        </v-container>
    </div>
</template>
<script>
	import {mapGetters} from 'vuex';
	import AvailableThemes from '~/components/marketplace/AvailableThemes.vue';

	export default {
		layout: 'opencart',
		computed: mapGetters({
			local_templates: 'template/templates',
			marketplace_templates: 'marketplace/templates',
            active_template_codename: 'setting/active_template_codename',
		}),
		async fetch({store}){
			store.commit('load/LOADING_START');
			await store.dispatch('opencart/GET_OPDATA');
			await store.dispatch('setting/GET_SETTING');
			await store.dispatch('template/GET_TEMPLATES');
			await store.dispatch('marketplace/GET_SHOPUNITY_THEMES');
			store.commit('load/LOADING_END');
		},
		components: {
			AvailableThemes
		}
	};
</script>
