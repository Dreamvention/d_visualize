<template>
    <div class="sections">
        <div class="sections__list">
            <v-btn class="sections__list-item sections__list-item--header" block nuxt exact
                   to="editor/header">
                {{$t('edit.vdh')}}
                <v-icon>fas fa-chevron-right</v-icon>
            </v-btn>
            <v-list class="py-0">
            <template v-for="(item, index) in items">
                <v-btn class="sections__list-item" block nuxt exact to="editor/header">
                    {{$t('common.header')}}
                    <v-icon>fas fa-chevron-right</v-icon>
                </v-btn>
            </template>
        </v-list>
            <v-btn class="sections__list-item sections__list-item--footer" block nuxt exact
                   to="editor/footer">
                {{$t('edit.vdf')}}
                <v-icon>fas fa-chevron-right</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
	import VDHeader from '~/components/editor/VDHeader';

	export default {
		name: "index",
        components:{
	        VDHeader
        },
		data () {
			return {
				items: [
					{
						title: 'Header',
						to: ''
					},
					{
						title: 'Summer BBQ ',
					},
					{
						title: 'Footer',
					}
				]
			}
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