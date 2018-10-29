<template>
    <div class="home">
        <v-container fluid>
            <v-toolbar flat color="transparent">
                <v-toolbar-items>
                    <v-btn flat nuxt exact to="/home">
                        <h3 class="display-2">{{$t('common.themes')}}</h3>
                    </v-btn>
                    <v-btn flat nuxt exact to="/home/setting">
                        <h3 class="display-2">{{$t('common.setting')}}</h3>
                    </v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <nuxt-child/>
        </v-container>
    </div>
</template>
<style lang="scss">
    .home .v-toolbar {
        margin-bottom: 15px;
    }

    .home .v-toolbar__items .v-btn{
        margin-right: 10px !important;
    }

    .home .container {
        padding-top: 0;
    }

    .theme-holder {
        padding-bottom: 15px;
    }

    .display-2 {
        margin-top: 15px;
    }
</style>
<script>

	export default {
		layout: 'opencart_hmr',
        async fetch({store}){
	        store.commit('load/LOADING_START');
	        await store.dispatch('opencart/GET_OPDATA');
	        await store.dispatch('setting/GET_SETTING');
	        await store.dispatch('template/GET_TEMPLATES');
	        store.commit('load/LOADING_END');
        }
	};
</script>
