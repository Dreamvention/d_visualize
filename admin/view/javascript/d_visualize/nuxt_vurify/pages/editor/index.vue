<template>
    <div class="sections">
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
        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		name: "index",
		computed: {
			...mapGetters({
				menu: 'editor/menu',
			})
		}
	};
</script>

<style lang="scss">
    .sections {
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
                .v-icon{
                    font-size: 18px;
                }
            }
            .v-btn__content {
                justify-content: space-between;
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