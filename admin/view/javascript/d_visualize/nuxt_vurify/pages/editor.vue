<template>
    <v-app id="vz-edit" v-if="iframe" :class="{'loading':loading.on_progress}">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
                mobile-break-point="768"
                width="300"
                class="editor-menu"
        >
            <v-layout class="editor-menu__header">
                <v-btn nuxt to="/" flat icon color="accent">
                    <v-icon small>fas fa-times</v-icon>
                </v-btn>
                <v-select
                        flat
                        height="auto"
                        solo
                        hide-details
                        full-width
                        :value="'Foo'"
                        :items="items"
                ></v-select>
                <v-btn color="success"
                > save
                </v-btn>
            </v-layout>
            <v-footer fixed class="editor-toggle" height="auto">
                <v-btn-toggle xs12 v-model="toggle" mandatory>
                    <v-btn :value="respons.MOBILE" flat color="primary">
                        <v-icon>fas fa-mobile</v-icon>
                    </v-btn>
                    <v-btn :value="respons.TABLET" flat color="primary">
                        <v-icon>fas fa-tablet</v-icon>
                    </v-btn>
                    <v-btn :value="respons.FULL" flat color="primary">
                        <v-icon>fas fa-arrows-alt-h</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </v-footer>
        </v-navigation-drawer>
        <v-content fluid
                   app>
            <Iframe :iframe="iframe" :loading="loading.status===load.WAITING" :width="toggle"
                    v-if="loading.content_loaded"></Iframe>
        </v-content>
    </v-app>
    <!--&lt;!&ndash;<vz-edit-menu></vz-edit-menu>&ndash;&gt;-->
</template>
<style lang="scss">
    .editor-toggle {
        border: 1px solid var(--primary);
        .v-btn-toggle {
            width: 100%;
            display: flex;
            .v-btn {
                flex: 1;
                height: 50px;
            }
        }
    }

    .editor-menu {
        border: 1px solid var(--secondary);
    }

    .editor-menu {
        &__header {
            padding-top: 12px;
            padding-bottom: 12px;
            background-color: var(--info);
            .theme--light.v-text-field--solo .v-input__slot{
                background-color:transparent;
            }
        }
    }
</style>
<script>
	import {mapGetters} from 'vuex';
	import Iframe from '~/components/editor/Iframe.vue';
	import {LOAD, RESPONSIVE} from '~/constants';

	export default {
		computed: {
			toggle: {
				get() {
					return this.$store.getters['editor/mobile_toggle'];
				},
				set(value) {
					this.$store.commit('editor/SET_MOBILE_TOGGLE', value);
				}
			},
			...mapGetters({
				iframe: 'editor/iframe',
				menu: 'editor/menu',
				loading: 'load/loading'
			})
		},
		data: ()=>({
			load: LOAD,
			respons: RESPONSIVE,
			drawer: null,
			items: ['Foo', 'Bar', 'Fizz', 'Buzz']
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
