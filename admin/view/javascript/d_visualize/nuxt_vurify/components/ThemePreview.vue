<template>
    <div class="theme-preview">
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
        <div class="vz-theme-preview-title">
            {{template.db_saved?template.title:template.setting.title}}
        </div>
        <div class="vz-theme-preview-saved" v-if="template.db_saved">
            {{$t('template.last_saved_on')}} {{template.date_modified |formatDate}}
        </div>
        <v-btn>
            {{$t('template.customize')}}
        </v-btn>
        <v-menu
                transition="slide-y-transition"
                offset-y
                bottom>
            <v-btn
                    slot="activator"
                    color="primary"
                    dark>
                {{$t('template.actions')}}
            </v-btn>
            <v-list>
                <v-list-tile
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
                        @click="dialog=!dialog"
                        dense>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{$t('template.rename')}}
                        </v-list-tile-title>
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
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{$t('template.rename_form')}}</span>
                </v-card-title>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Title" required  :value='template.title' @input="renameChange"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">{{$t('common.button_cancel')}}
                    </v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">{{$t('common.button_save')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    export default {
        name: "theme-preview",
        props: ['template', 'status'],
        data(){
          return{
              dialog:false,
              title:'ss',
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
            renameChange (e) {
                this.$emit('change-title', e)
            }
        }
    }
</script>

<style scoped>

</style>