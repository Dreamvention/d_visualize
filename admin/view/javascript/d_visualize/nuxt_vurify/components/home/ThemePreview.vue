<template>
    <v-card>
        <v-layout>
            <v-flex>
                <h4 class="display-1">
                    {{template.db_saved?template.title:template.setting.title}}
                </h4>
                <p class="body-2" v-if="template.db_saved">
                    {{$t('template.last_saved_on')}} {{template.date_modified |formatDate}}
                </p>
            </v-flex>
            <v-flex>
                <v-btn color="primary">
                    {{$t('template.customize')}}
                </v-btn>
                <v-menu transition="slide-y-transition"
                        offset-y
                        bottom>
                    <v-btn slot="activator">
                        {{$t('template.actions')}}
                        <v-icon>{{ true ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>

                    </v-btn>
                    <v-list class="theme-action-menu-list">
                        <v-list-tile
                                class="theme-action-menu-list--status"
                                :class="status ? 'active' : ''"
                                @click="change_status"
                                dense>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{status?
                                    $t('template.entry_deactivate'):$t('template.entry_activate')}}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <a :href="$store.getters['opencart/opData'].base_url" target="_blank">
                            <v-list-tile
                                    @click=""
                                    dense>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{$t('template.preview')}}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </a>
                        <v-list-tile
                                @click="rename_dialog=!rename_dialog"
                                dense>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{$t('template.rename')}}
                                </v-list-tile-title>
                                <v-dialog v-model="rename_dialog" persistent max-width="500px">
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">{{$t('template.rename_form')}}</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-layout wrap>
                                                <v-flex xs12>
                                                    <v-text-field :label="$t('template.rename_form_description')"
                                                                  required
                                                                  clearable
                                                                  :value='template.title'
                                                                  @input="rename_chage_input">
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" flat @click.native="cancel_title_rename">
                                                {{$t('common.button_cancel')}}
                                            </v-btn>
                                            <v-btn color="blue darken-1" flat @click.native="save_title_rename">
                                                {{$t('common.button_save')}}
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                                @click="download"
                                dense>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{$t('template.download')}}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                    </v-list>
                </v-menu>
            </v-flex>
        </v-layout>
        <div class="vz-theme-preview-images" @click="popup">
            <div class="vz-theme-preview__img">
                <img class="vz-theme-preview__img__frame" :src="'desktop_frame.png'|image" alt="desktop-frame"/>
                <div class="vz-theme-preview__img__overlay">
                    <img :src="template.img_desktop" alt="img_desktop"/>
                </div>
            </div>
            <div class="vz-theme-preview__img  vz-theme-preview__img--mobile">
                <img class="vz-theme-preview__img__frame" :src="'mobile_frame.png'|image"
                     alt="mobile-frame"/>
                <div class="vz-theme-preview__img__overlay">
                    <img :src="template.img_mobile" alt="img_mobile"/>
                </div>
            </div>
        </div>
    </v-card>
</template>
<script>
    export default {
        name: "theme-preview",
        props: ['template', 'status'],
        data() {
            return {
                rename_dialog: false,
                rename_input: ''
            }
        },
        methods: {
            popup() {

            },
            change_status(e) {
                this.$emit('change-status', e)
            },
            download(e) {

            },
            save_title_rename(e) {
                this.$emit('change-title', this.rename_input);
                this.rename_dialog = !this.rename_dialog;
            },
            cancel_title_rename(e) {
                this.rename_input = this.template.title;
                this.rename_dialog = !this.rename_dialog;
            },
            rename_chage_input(val) {
                this.rename_input = val
            }
        }
    }
</script>
<style scoped lang="scss">
    .theme-action-menu-list {
        &--status {
            &.active {
                background-color: #ff8f00;
                color: white;
            }
        }
    }

    .v-card {
        padding: 25px 20px 0px;
    }

    .vz-theme-preview-images {
        margin-top: 20px;
    }
</style>