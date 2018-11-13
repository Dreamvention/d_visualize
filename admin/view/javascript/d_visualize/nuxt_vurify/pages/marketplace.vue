<template>
    <div class="marketplace">
        <v-container fluid>
            <!--local:{{local_templates}}-->
            market:{{marketplace_templates}}
        </v-container>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
	export default {
		layout: 'opencart',
        computed: mapGetters({
            local_templates: 'template/templates',
            marketplace_templates: 'marketplace/templates',
        }),
        async fetch({store}){
	        store.commit('load/LOADING_START');
	        await store.dispatch('opencart/GET_OPDATA');
	        await store.dispatch('setting/GET_SETTING');
	        await store.dispatch('template/GET_TEMPLATES');
	        await store.dispatch('marketplace/GET_SHOPUNITY_THEMES');
	        store.commit('load/LOADING_END');
        }
	};
</script>
