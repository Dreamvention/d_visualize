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
                <div class="editor-menu__wrap">
                    <div class="editor-menu__header">
                        <a class="editor-menu__header__link" v-if="!isDev" :href="opData.action.home_page">
                            <v-btn flat icon color="accent">
                                <v-icon small>fas fa-times</v-icon>
                            </v-btn>
                        </a>
                        <v-btn v-else nuxt to="/home" flat icon color="accent">
                            <v-icon small>fas fa-times</v-icon>
                        </v-btn>
                        <v-autocomplete
                                flat
                                v-if="iframe_pages"
                                height="auto"
                                solo
                                hide-details
                                disabled
                                full-width
                                :value="current_page"
                                :items="iframe_pages_lang"
                        ></v-autocomplete>
                        <v-btn color="success" @click="saveTemplate">
                            {{$t('common.button_save')}}
                        </v-btn>
                    </div>
                    <div class="editor-menu__sections sections">
                        <v-tabs
                                v-model="active"
                                grow
                                height="70"
                                hide-slider
                                mandatory
                                class="sections__nav">
                            <v-tab
                                    :key="0">
                                {{$t('editor.section')}}
                            </v-tab>
                            <v-tab-item
                                    :key="0"
                            >
                                <div class="sections__list">
                                    <v-btn class="sections__list-item sections__list-item--header" block nuxt exact
                                           to="editor/vdh">
                                        {{$t('editor.vdh')}}
                                        <v-icon>fas fa-chevron-right</v-icon>
                                    </v-btn>
                                    <v-list class="py-0" v-if="menu.navigation.common.length">
                                        <v-subheader> {{$t('editor.common_components')}}
                                        </v-subheader>
                                        <template v-for="(item, index) in menu.navigation.common">
                                            <v-btn class="sections__list-item" block nuxt exact :to="item.href">
                                                {{$t(item.text)}}
                                                <v-icon>fas fa-chevron-right</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-list>
                                    <v-list class="py-0" v-if="menu.navigation.current_page.length">
                                        <v-subheader> {{$t('editor.current_page_components')}}
                                        </v-subheader>
                                        <template v-for="(item, index) in menu.navigation.current_page">
                                            <v-btn class="sections__list-item" block nuxt exact :to="item.href">
                                                {{$t(item.text)}}
                                                <v-icon>fas fa-chevron-right</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-list>
                                    <v-btn class="sections__list-item sections__list-item--footer" block nuxt exact
                                           to="editor/vdf">
                                        {{$t('editor.vdf')}}
                                        <v-icon>fas fa-chevron-right</v-icon>
                                    </v-btn>
                                    <v-btn class="sections__list-item sections__list-item--custom" block nuxt exact
                                           to="editor/custom">
                                        {{$t('editor.custom')}}
                                        <v-icon>fas fa-chevron-right</v-icon>
                                    </v-btn>
                                </div>
                            </v-tab-item>
                            <v-tab
                                    :key="1">
                                {{$t('editor.theme_set')}}
                            </v-tab>
                            <v-tab-item
                                    :key="1">
                                <div class="sections__theme">
                                    <div class="sections__list">
                                        <v-btn class="sections__list-item" block nuxt exact to="/editor/skin">
                                            <v-icon>fas fa-paint-brush</v-icon>
                                            {{$t('editor.entry_skin')}}
                                            <v-icon>fas fa-chevron-right</v-icon>
                                        </v-btn>
                                        <v-list class="py-0">
                                            <template v-for="(item, index) in theme_navigation">
                                                <v-btn class="sections__list-item" block nuxt exact :to="item.href">
                                                    <v-icon v-if="item.icon">{{item.icon}}</v-icon>
                                                    {{$t(item.text)}}
                                                    <v-icon>fas fa-chevron-right</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-list>
                                    </div>
                                </div>
                            </v-tab-item>
                        </v-tabs>
                    </div>
                    <Loader :loading="loading.status===load.LOADING"></Loader>
                    <nuxt-child :key="$route.params.id"/>
                </div>
                <v-footer class="editor-menu__toggle" height="auto">
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
            <Iframe :iframe="iframe"
                    :loading="loading.status===load.LOADING"
                    :width="toggle"
                    ></Iframe>
        </v-content>
    </v-app>
    <div v-else>
        <Loader :loading="!loading.content_loaded"></Loader>
    </div>
</template>
<script>
	import {mapGetters} from 'vuex';
	import Iframe from '~/components/editor/Iframe.vue';
	import {LOAD, RESPONSIVE} from '~/constants';

	export default {
		computed: {
			active: {
				get() {
					return this.$store.getters['editor/menu'].active_tab;
				},
				set(value) {
					this.$store.commit('editor/CHANGE_ACTIVE_TAB', value);
				}
			},
			toggle: {
				get() {
					return this.$store.getters['editor/mobile_toggle'];
				},
				set(value) {
					this.$store.commit('editor/SET_MOBILE_TOGGLE', value);
				}
			},
            theme_navigation(){
	            return _.reduce(this.$store.getters['template/active_template_skin'].settings,(memory,element,key)=>{
                    if (element.navigation){
	                    let link = _.extend({},element.navigation);
	                    link.href=`/editor/${key}`;
	                    memory[key] = link;
                    }
	            	return memory;
                },{})
            },
			iframe_pages_lang() {
				let lang = _.map(this.iframe_pages, (e, key)=>{
					e.text = this.$t(e.text);
					return e;
				});
				return lang;
			},
			...mapGetters({
				iframe: 'editor/iframe',
				current_page: 'editor/current_page',
				iframe_pages: 'template/available_pages',
				loading: 'load/loading',
				menu: 'editor/menu',
				active_template_skin: 'template/active_template_skin',
				opData: 'opencart/opData'
			})
		},
		data() {
			return {
				isDev: process.env.isDev,
			load: LOAD,
			respons: RESPONSIVE,
			drawer: null,
			}
		},
		async fetch({store}) {
			store.commit('load/LOADING_START');
			await store.dispatch('opencart/GET_OPDATA');
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
				title: 'Visualize editor'
			};
		},
		methods: {
			async saveTemplate() {
				this.$store.commit('load/LOADING_START');
				await this.$store.dispatch('template/SAVE', this.$store.getters['template/active_template']);
				this.$store.commit('load/LOADING_END');

			},
		}
	};
</script>
<style lang="scss">
    .editor-menu {
        &__wrap {
            position: relative;
            flex: 1 1 auto;
            margin-bottom: 1px;
            .loading & div {
                opacity: 1;
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
            .theme--light.v-text-field--solo .v-input__slot {
                background-color: transparent;
            }
            &__link{
                text-decoration: none;
            }
        }
        &__toggle {
            border: 1px solid var(--primary);
            height: 50px !important;
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

    .sections {
        &__nav {
            .v-tabs__item--active {
                color: white;
                background-color: var(--primary);
            }
        }
        &__list {
            padding-top: 0;
            padding-bottom: 0;
            border-top: 1px solid var(--secondary);
            border-bottom: 1px solid var(--secondary);
        }
        &__list-item {
            &.v-btn {
                padding-left: 40px;
                margin: 0;
                text-transform: none;
                height: 50px;
                &:before {
                    background-color: #fff;
                    opacity: 1;
                }
                &--active, &:hover {
                    color: var(--primary);
                    &:before {
                        background-color: #fff;
                        opacity: 1;
                    }
                }
                .v-icon {
                    font-size: 18px;
                }
            }
            .v-btn__content {
                justify-content: flex-start;
                .fas{
                    margin-right: 20px;
                }
                .fa-chevron-right{
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                }

            }
            &--header, &--footer {
                &.v-btn {
                    height: 70px;
                }
            }
        }
        &__list-item--footer {
            border-top: 1px solid var(--secondary);
        }
        &__list-item--header {
            border-bottom: 1px solid var(--secondary);
        }

    }

</style>
