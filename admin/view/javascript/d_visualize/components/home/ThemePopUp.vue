<template>
    <div class="theme-pop-up">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-btn slot="activator" color="primary" dark>{{$t('template.explore')}}</v-btn>
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title color="white">
                        {{template.db_saved?template.title:template.setting.title}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click.native="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-container>
                    <v-layout row wrap mb-3>
                        <v-flex md5>
                            <ThemePreviewImage :template="template"></ThemePreviewImage>
                            <v-btn color="light-blue" dark v-if="template.live_demo" value="left">
                                {{$t('template.live_demo')}}
                            </v-btn>
                            <v-btn @click="dialog_use_this = true" color="teal accent-3" dark
                                   v-if="active!=template.setting.codename"
                                   value="center">
                                {{$t('template.use_this')}}
                            </v-btn>
                            <v-btn disabled color="secondary" v-else>
                                {{$t('template.use_this')}}
                            </v-btn>
                            <v-checkbox
                                    v-model="replace_content"
                                    :label="$t('template.replace_content')"
                                    color="primary"
                                    hide-details
                                    v-if="template.content_available"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex md7 pl-5>
                            <div class="display-4">
                                {{template.title?template.title:template.setting.title}}
                            </div>
                            <div class="tags mt-2">
                                <v-chip  v-if="template.tag" v-for="t in template.tag" :key="t">
                                    {{t}}
                                </v-chip>
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
                            <v-card  flat tile class="d-flex mr-4" >
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
        <v-dialog max-width="600px" persistent v-model="dialog_use_this">
            <v-card>
                <v-card-title>
                    <div class="display-2 ">{{$t('template.instalation_heading')}}</div>
                </v-card-title>
                <v-card-text>
                    <div class="heading ">{{$t('template.instalation_hint')}}</div>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-checkbox
                                    :label="$t('template.instalation_haeder')"
                                    color="primary"
                                    hide-details
                                    v-if="template.vdh"
                                    v-model="replace_header"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs12>
                            <v-checkbox
                                    :label="$t('template.instalation_footer')"
                                    color="primary"
                                    hide-details
                                    v-if="template.vdf"
                                    v-model="replace_footer"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs12>
                            <v-checkbox
                                    :label="$t('template.instalation_replace_catalog')"
                                    color="primary"
                                    hide-details
                                    v-model="replace_content"
                            ></v-checkbox>
                        </v-flex>
                    </v-layout>
                    <v-chip
                            color="red"
                            text-color="white"
                    >{{$t('template.instalation_warn')}}
                    </v-chip>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog_use_this = false; dialog= false" color="blue darken-1" flat>
                        {{$t('template.instalation_cancel')}}
                    </v-btn>
                    <v-btn @click='changeTheme' color="blue darken-1" flat>
                        {{$t('template.instalation_aprove')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
	import ThemePreviewImage from '~/components/home/ThemePreviewImage';

	export default {
		name: "ThemePopUp",
		props: ['template','active'],
		data() {
			return {
				dialog: false,
				notifications: false,
				sound: false,
				widgets: false,
				replace_header: false,
				replace_footer: false,
				replace_content: false,
				dialog_use_this: false
			};
		},
		components: {
			ThemePreviewImage
		},
        methods:{
	        changeTheme(){
		        console.log('change')

		        this.$emit('changeTheme', {
			        codename: this.template.setting.codename,
                    header:this.replace_header,
                    footer:this.replace_footer,
                    content:this.replace_content
		        });
		        this.dialog = false
		        this.dialog_use_this = false;
            },
	        decoder (html) {
		        let decoder = document.createElement('div')
		        decoder.innerHTML = html
		        return decoder.textContent
	        }

        }

	};
</script>

<style scoped>

</style>