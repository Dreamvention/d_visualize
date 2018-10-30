<template>
        <div class="opencart" :class="{'loading':loading.on_progress}">
        <v-app id="inspire">
            <v-navigation-drawer
                    :value="menu"
                    fixed
                    clipped
                    app
                    mobile-break-point="768"
                    width="235"
                    v-if="loading.content_loaded"
            >
                <div class="opencart-column-left" v-html="opData.column_left">
                </div>
            </v-navigation-drawer>
            <v-toolbar
                    color="transparent"
                    card
                    clipped-left
                    app
                    fixed
                    v-if="loading.content_loaded"
            >
                <div v-html="opData.header" class="opencart-header"></div>
            </v-toolbar>
            <v-content fluid>
                <div class="content" v-if="loading.content_loaded">
                    <top-line :breadcrumbs="opData.breadcrumbs" :title="opData.title"
                              :opAction="opData.action"></top-line>
                    <nuxt/>
                    <div class="opencart-footer" v-html="opData.footer"></div>
                </div>
                <v-layout  v-else-if="loading.status===load.FAIL" align-center justify-center row fill-height wrap
                          text-center>
                    <v-flex xs12>
                        <img :src="'nodata.png'|image" alt="nodata">
                    </v-flex>
                    <v-flex xs12>
                        <div>{{error}}</div>
                    </v-flex>
                </v-layout>
                <v-layout v-else align-center justify-center row fill-height wrap text-center>
                    <Loader :loading="loading.status===load.LOADING"></Loader>
                </v-layout>
            </v-content>
        </v-app>
    </div>
</template>
<style scoped>
    .error {
        margin-top: 100px;
    }
</style>
<script>
	import {mapGetters} from 'vuex';
	import {LOAD} from '~/constants';
	import TopLine from '~/components/opencart/TopLine.vue';

	export default {
		data: ()=>({
			load: LOAD,
		}),
		computed: {
			...mapGetters({
			opData: 'opencart/opData',
            menu: 'opencart/menu',
			loading: 'load/loading',
			error: 'error/getMessage',
			})
		},
		head() {
			return {
				title: this.opData.title,
			};
		},
		mounted() {
            /*opencart eto odni kostili (*/
			setTimeout(()=>{
				if (this.opData.header) {
					let menu = document.querySelector('#button-menu');
					console.log(menu);
					if (menu) {
						document.querySelector('#button-menu').addEventListener('click', (e)=>{
							e.preventDefault();
							this.drawer = !this.drawer;
						});
					}
				}
			}, 1000);
		},
		components: {
			TopLine
		}
	};
</script>
