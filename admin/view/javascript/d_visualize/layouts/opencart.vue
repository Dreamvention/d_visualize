<template>
    <div class="opencart" :class="{'loading':loading.on_progress}">
        <v-app id="inspire">
            <v-content fluid>
                <div class="content" v-if="loading.content_loaded">
                    <top-line :breadcrumbs="opData.breadcrumbs" :title="opData.title"
                              :opAction="opData.action"></top-line>
                    <div class="opencart__panel panel">
                        <div class="panel__heading">
                            <v-container fluid>
                                <div class="display-1">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    Edit Visualize settings
                                </div>
                            </v-container>
                        </div>
                        <div class="panel__content">
                            <v-container fluid>
                                <nuxt/>
                            </v-container>
                        </div>
                    </div>
                </div>
                <v-layout  v-else-if="loading.status===load.FAIL" align-center justify-center row fill-height wrap
                           text-center>
                    <v-flex xs12>
                        <img :src="'nodata.png'|image" alt="nodata">
                        <div v-html="error.data"></div>
                    </v-flex>
                </v-layout>
                <v-layout v-else align-center justify-center row fill-height wrap text-center>
                    <Loader :loading="loading.status===load.LOADING"></Loader>
                </v-layout>
            </v-content>
        </v-app>
    </div>
</template>
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
				loading: 'load/loading',
				error: 'error/message',
			})
		},
		head() {
			return {
				title: this.opData.title,
			};
		},
		components: {
			TopLine
		}
	};
</script>
