<template>
    <div class="theme-pop-up">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title color="white">
                        {{template.db_saved?template.title:template.setting.title}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click.native="$emit('close')">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-container>
                    <v-layout row wrap mb-3>
                        <v-flex md5>
                            <ThemePreviewImage :template="template"></ThemePreviewImage>
                            <v-btn value="left" color="light-blue" dark d-none :to="template.demo_url">
                                {{$t('template.live_demo')}}
                            </v-btn>
                            <v-btn value="center" color="teal accent-3" dark @click="changeTheme">
                                {{$t('template.use_this')}}
                            </v-btn>
                            <v-checkbox
                                    style="display: block"
                                    v-model="replace_content"
                                    :label="$t('template.replace_content')"
                                    color="primary"
                                    hide-details
                            ></v-checkbox>
                        </v-flex>
                        <v-flex md7 pl-5>
                            <div class="display-4">
                                {{template.title?template.title:template.setting.title}}
                                {{template.current_version}}
                            </div>
                            <div class="d-flex">
                                <v-flex class="tags mt-2">
                                    <v-chip v-if="template.tag" v-for="t in template.tag" :key="t">
                                        {{t}}
                                    </v-chip>
                                </v-flex>
                                <v-flex v-if="template.developer">
                                    <v-tooltip bottom>
                                        <v-avatar
                                                slot="activator"
                                                color="grey lighten-4"
                                        >
                                            <v-img :src="template.developer.image"></v-img>
                                        </v-avatar>
                                        <span>{{ template.developer.name }}</span>
                                    </v-tooltip>
                                </v-flex>
                            </div>

                            <div v-html="decoder(template.setting.description)"></div>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex md12>
                            <div class="display-4 mb-2">
                                {{$t('template.addition_images')}}
                            </div>
                        </v-flex>
                        <v-flex
                                v-for="preview in template.preview.processed_images"
                                :key="preview"
                                xs4
                                d-flex
                        >
                            <v-card flat tile class="d-flex mr-4">
                                <v-img class="pa-2"
                                       contain
                                       :src="preview"
                                >
                                    <v-layout
                                            slot="placeholder"
                                            fill-height
                                            align-center
                                            justify-center
                                            ma-0
                                    >
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-layout>
                                </v-img>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>

            </v-card>

        </v-dialog>
        <!--<template slot="activator"></template>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import ThemePreviewImage from '~/components/home/ThemePreviewImage';

    export default {
        name: "ThemePopUp",
        props: ['template', 'active', 'dialog'],
        data() {
            return {
                notifications: false,
                sound: false,
                widgets: false,
                replace_content: false
            };
        },
        computed: {
            // template() {
            // 	return this.templates[this.codename];
            // },
            // ...mapGetters({
            // 	'templates': 'template/templates'
            // })
        },
        components: {
            ThemePreviewImage
        },
        methods: {
            changeTheme() {
                this.$emit('changeTheme', this.codename);
            },
            decoder(html) {
                let decoder = document.createElement('div')
                decoder.innerHTML = html
                return decoder.textContent
            }

        }

    };
</script>

<style scoped>

</style>