<template>
    <div class="opencart ">
        <v-app id="inspire" v-if="loading.content_loaded">
            <v-navigation-drawer
                    v-model="drawer"
                    fixed
                    clipped
                    app
                    mobile-break-point="768"
                    width="235"
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

            >
                <div v-html="opData.header" class="opencart-header"></div>
            </v-toolbar>
            <v-content fluid>
                <div class="content" :class="{'loading':loading.on_progress}">
                    <top-line :breadcrumbs="opData.breadcrumbs" :title="opData.title"
                    :opAction="opData.action"></top-line>
                    <nuxt/>
                    <div class="opencart-footer" v-html="opData.footer"></div>
                </div>

            </v-content>
        </v-app>
        <div v-else>
            <v-container error>
                <v-layout align-center justify-center row fill-height wrap text-center>
                    <v-flex xs12>
                        <img :src="'nodata.png'|image" alt="nodata">
                    </v-flex>
                    <v-flex xs12>
                        <div>{{error}}</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>
<style scoped>
    .error{
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
			drawer: null
		}),
		computed: mapGetters({
			opData: 'opencart/opData',
			loading: 'load/loading',
			error: 'error/getMessage',
		}),
		head() {
			return {
				title: this.opData.title,
			};
		},
		mounted() {
            /*opencart eto odni kostili (*/
			setTimeout(()=>{
				if (this.opData.header) {
					document.querySelector('#button-menu').addEventListener('click', (e)=>{
						e.preventDefault();
						this.drawer = !this.drawer;
					});
				}
			}, 500);
		},
		components: {
			TopLine
		}
	};
</script>
