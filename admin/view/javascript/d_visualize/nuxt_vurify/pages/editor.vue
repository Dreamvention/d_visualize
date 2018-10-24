<template>
    <v-app id="editor" v-if="loading.content_loaded" :class="{'loading':loading.on_progress}">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
                mobile-break-point="768"
                width="320"
                class="editor-menu"
        >
            <v-layout column fill-height>
                <div class="editor-menu__header">
                    <v-btn nuxt to="/" flat icon color="accent">
                        <v-icon small>fas fa-times</v-icon>
                    </v-btn>
                    <v-autocomplete
                            flat
                            height="auto"
                            solo
                            hide-details
                            full-width
                            :value="current_page"
                            :items="iframe_pages"
                            :item-text="(e)=>this.$t(e.text)"
                    ></v-autocomplete>
                    <v-btn color="success" @click="console.log('enable and save')"
                    > {{$t('common.button_save')}}
                    </v-btn>
                </div>
                <div class="editor-menu__holder">
                    <Loader :loading="loading.status===load.LOADING"></Loader>
                    <nuxt-child></nuxt-child>
                </div>
                <v-footer  class="editor-menu__toggle" height="auto">
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
            </v-layout>

        </v-navigation-drawer>
        <v-content fluid
                   app>
            <Iframe :iframe="iframe" :loading="loading.status===load.LOADING" :width="toggle"
                    v-if="loading.content_loaded"></Iframe>
        </v-content>
    </v-app>
    <div v-else>
        <Loader :loading="!loading.content_loaded"></Loader>
    </div>
</template>
<style lang="scss">
    .editor-menu {
        &__header {
            display: flex;
            flex: 0 0 auto;
            padding-top: 14px;
            padding-bottom: 14px;
            border-bottom: 1px solid var(--secondary);
            background-color: var(--info);
            .v-toolbar__content {
                padding-left: 0;
                padding-right: 0;
            }
            .theme--light.v-text-field--solo .v-input__slot{
                background-color:transparent;
            }
        }
        &__holder {
            flex: 1 1 auto;
            margin-bottom: 1px;
            .loading & div {
                opacity: .85;
            }
            .loader {
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -32px;
                margin-top: -32px;
                z-index: 2;
            }
        }
        &__toggle {
            border: 1px solid var(--primary);
            .v-btn-toggle {
                width: 100%;
                display: flex;
                .v-btn {
                    flex: 1;
                    height: 50px;
                    &--active {
                        color: white !important;
                        &:before {
                            opacity: 1;
                            background: var(--primary);
                        }
                        &:hover {
                            &:before {
                                opacity: 1;
                                background: var(--primary);
                            }
                        }
                    }
                }
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
				current_page: 'editor/current_page',
				iframe_pages: 'template/available_pages',
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
			await store.dispatch('setting/GET_SETTING');
			await store.dispatch('template/GET_TEMPLATES');
			await store.dispatch('template/GET_COMPONENTS');
			await store.dispatch('editor/GET_EDITOR_IFRAME');
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
			itemsText(e) {
				return;
			},
			toggle_show() {

			}
		}
	};
</script>
