<template>
    <v-app id="editor" v-if="loading.content_loaded && iframe" :class="{'loading':loading.on_progress}">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
                mobile-break-point="768"
                width="320"
                class="editor-menu"
        >
            <v-layout class="editor-menu__header">
                <v-btn nuxt to="/" flat icon color="accent">
                    <v-icon small>fas fa-times</v-icon>

                </v-btn>
                <v-autocomplete
                        flat
                        height="auto"
                        solo
                        hide-details
                        append-icon="fas fa-caret-down"
                        full-width
                        :value="current_page"
                        :items="iframe_pages"
                        :item-text="(e)=>this.$t(e.text)"
                ></v-autocomplete>
                <v-btn color="success" @click="console.log('enable and save')"
                > {{$t('common.button_save')}}
                </v-btn>
            </v-layout>
            <v-layout class="editor-menu__header--nav">
                <v-btn class="flex" flat nuxt to="/editor" exact color="primary">{{$t('editor.section')}}</v-btn>
                <v-btn class="flex" flat nuxt to="/editor/theme_set" exact color="primary">{{$t('editor.theme_set')}}
                </v-btn>
            </v-layout>
            <v-layout column full-height>
                <nuxt-child></nuxt-child>
            </v-layout>
            <v-footer absolute class="editor-toggle" height="auto">
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
</template>
<style lang="scss">
    .editor-menu {
        &__header {
            padding-top: 14px;
            padding-bottom: 14px;
            border-bottom: 1px solid var(--secondary);

            .v-toolbar__content {
                padding-left: 0;
                padding-right: 0;
            }
            &--nav {
                .v-btn {
                    margin: 0;
                    height: 74px;
                    color: #000 !important;
                    &--active {
                        color: white !important;
                        &:before {
                            opacity: 1;
                            background: var(--primary);
                        }
                    }
                }
            }
            background-color: var(--info);
            .theme--light.v-text-field--solo .v-input__slot{
                background-color:transparent;
            }
        }
    }

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
				iframe_pages: 'editor/iframe_pages',
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
			itemsText(e) {
				return;
			},
			toggle_show() {

			}
		}
	};
</script>
