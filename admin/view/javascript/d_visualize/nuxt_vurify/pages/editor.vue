<template>
    <v-app id="vz-edit" v-if="iframe" :class="{'loading':loading.on_progress}">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
                mobile-break-point="768"
                width="300"
        >
            <v-btn nuxt to="/" flat icon>
                <v-icon>fas fa-arrow-left</v-icon>
            </v-btn>
            menu
            <!--<v-footer fixed>-->
            <!--<div class=vz-edit-controls>-->
            <!--<div class="hider" @click="toggle_show"><i class="fas "-->
            <!--:class="menu.hidden?'fa-caret-right':'fa-caret-left'"></i>-->
            <!--</div>-->
            <!--<div class="help-text" v-if="!menu.hidden">{{$t('common.entry_collapse')}}</div>-->
            <!--<div class="vz-edit-responsive_toggle">-->
            <!--<div class="desktop" @click="changeIfrmeSize('100%')"><i class="fas fa-desktop"></i></div>-->
            <!--<div class="tablet" @click="changeIfrmeSize('770px')"><i class="fas fa-tablet-alt"></i></div>-->
            <!--<div class="phone" @click="changeIfrmeSize('320px')"><i class="fas fa-mobile-alt"></i></div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</v-footer>-->
        </v-navigation-drawer>
        <v-content fluid
                   app>
            <Iframe :iframe="iframe" :loading="loading.status===load.WAITING" v-if="loading.content_loaded"></Iframe>
        </v-content>
    </v-app>
    <!--<div class='vz-edit' :class="[{'menu-hidden':menu.hidden}]" v-if="iframe">-->

    <!--&lt;!&ndash;<vz-edit-menu></vz-edit-menu>&ndash;&gt;-->
    <!--</div>-->
</template>
<script>
	import {mapGetters} from 'vuex';
	import Iframe from '~/components/editor/Iframe.vue';
	import {LOAD} from '~/constants';

	export default {
		computed: mapGetters({
			iframe: 'editor/iframe',
			menu: 'editor/menu',
			loading: 'load/loading'
			// route_class: 'x'
		}),
		data: ()=>({
			load: LOAD,
			drawer: null
		}),
		async fetch({store}) {
			store.commit('load/LOADING_START');
			store.dispatch('setting/GET_SETTING');
			store.dispatch('template/GET_TEMPLATES');
			store.dispatch('editor/GET_EDITOR_IFRAME');
			store.commit('load/LOADING_END');
		},
		components: {
			Iframe
		},
		head() {
			return {
				title:'Visualize editor'
            }
		},
		methods: {
			changeIfrmeSize(size) {

			},
			toggle_show() {

			}
		}
	};
</script>
