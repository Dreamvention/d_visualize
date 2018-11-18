<template>
    <div class="available-themes">
        <v-container grid-list-lg fluid>
            <v-layout row reverse wrap available-themes__item>
                <v-flex
                        v-for="template, key in templates"
                        :key="template.codename"
                        lg4
                        md6
                        sm6
                        xs12>
                    <v-hover>
                        <v-card
                                slot-scope="{ hover }"
                                class="mx-auto"
                                color="grey lighten-3"
                                max-width="600"
                        >

                            <v-img
                                    :aspect-ratio="16/9"
                                    :src="template.image"
                            >
                                <v-expand-transition >
                                    <div
                                            v-if="hover"
                                            class="d-flex transition-slow-in-fast-out darken-2 v-card--reveal display-3 white--text"
                                            :class="template_status(template.tester_status_id).color"
                                            style="height: 100%;"
                                    >
                                        <div class="text-center" v-if="template.commercial ">
                                            {{template.price['recurring_price_format']}}
                                        </div>
                                        <div v-else class="text-center">
                                            {{$t('marketplace.free')}}
                                        </div>
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <v-card-text
                                    class="pt-4"
                                    style="position: relative;"
                            >
                                <v-btn
                                        absolute
                                        :color="template_status(template.tester_status_id).color"
                                        fab
                                        large
                                        right
                                        top
                                        @click="dialog_template=template;dialog=true"

                                >
                                    <v-icon>far fa-eye</v-icon>
                                </v-btn>
                                {{template.tester_status_id}}
                                <div class="display-2 font-weight-light primary--text mb-2">{{template.name}}</div>
                                <div class="font-weight-light title mb-2"> {{template.description_short}}</div>
                                <v-chip color="info" >
                                    {{template.version}}
                                </v-chip>
                                <v-chip :color="template_status(template.tester_status_id).color" text-color="white">
                                    {{$t(template_status(template.tester_status_id).text)}}
                                </v-chip>

                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-flex>
                <ThemePopUp v-if="dialog_template"
                            :template="dialog_template"
                            @changeTheme="changeTheme"
                            @close="dialog=false"
                            :dialog='dialog'
                            :active="active"
                ></ThemePopUp>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import ThemePopUp from '~/components/marketplace/ThemePopUp';

    export default {
        name: "available-themes",
        props: ['templates', 'local_templates', 'active'],
        data() {
            return {
                dialog: false,
                dialog_template: null
            };
        },
        computed: {},
        components: {
            ThemePopUp
        },
        methods: {
            changeTheme(value) {
                this.$store.dispatch('setting/CHANGE_ACTIVE_TEMPLATE', value)
                this.dialog=false
            },
            template_status(tester_status_id) {

                switch (tester_status_id) {
                    case 0:
                        return {
                            color: 'red',
                            text: 'marketplace.testing'
                        };
                    case 1:
                        return {
                            color: 'info',
                            text: 'marketplace.testing'
                        };
                    case 2:
                        return {
                            color: 'info',
                            text: 'marketplace.submitted'
                        };
                    case 3:
                        return {
                            color: 'red',
                            text: 'marketplace.error'
                        };
                    case 4:
                        return {
                            color: 'warning',
                            text: 'marketplace.testing'
                        };
                    case 5:
                        return {
                            color: 'success',
                            text: 'marketplace.passed'
                        };
                    case 6:
                        return {
                            color: 'red',
                            text: 'marketplace.rejected'
                        };
                    default:
                        return {
                            color: 'red',
                            text: 'marketplace.rejected'
                        };
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        max-height: 50px;
        width: 100%;
    }

    .available-themes__item {
        overflow: hidden;
        &__img:hover {
            transition: all .4s ease-in-out;
            transform: scale(1.2);
        }
    }

    .available-themes__btns {
        display: flex;
        justify-content: flex-end;
    }
</style>