<template>
    <div class="theme-pop-up">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-btn slot="activator" color="primary" dark>{{$t('template.explore')}}</v-btn>
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title color="white"> {{template.setting.title}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click.native="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-container>
                    <v-layout row wrap>
                        <v-flex md5>
                            <ThemePreviewImage :template="template"></ThemePreviewImage>
                            <!--<v-btn value="left" color="light-blue" dark d-none>-->
                            <!--{{$t('template.live_demo')}}-->
                            <!--</v-btn>-->
                            <v-btn value="center" color="teal accent-3" dark>
                                {{$t('template.use_this')}}
                            </v-btn>
                            <v-checkbox
                                    v-model="replace_content"
                                    :label="$t('template.replace_content')"
                                    color="primary"
                                    hide-details
                            ></v-checkbox>
                        </v-flex>
                        <v-flex md7>
                            <h1 class="display-4">
                                {{template.title?template.title:template.setting.title}}
                            </h1>
                            <p class="subheading"
                               v-html="template.description?template.description:template.setting.description">
                            </p>
                        </v-flex>
                    </v-layout>
                </v-container>
                <!--<v-list three-line subheader>-->
                <!--<v-subheader>User Controls</v-subheader>-->
                <!--<v-list-tile avatar>-->
                <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Content filtering</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Set the content filtering level to restrict apps that can be-->
                <!--downloaded-->
                <!--</v-list-tile-sub-title>-->
                <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--<v-list-tile avatar>-->
                <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Password</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Require password for purchase or use password to restrict purchase-->
                <!--</v-list-tile-sub-title>-->
                <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--</v-list>-->
                <!--<v-divider></v-divider>-->
                <!--<v-list three-line subheader>-->
                <!--<v-subheader>{{codename}}</v-subheader>-->
                <!--<v-list-tile avatar>-->
                <!--<v-list-tile-action>-->
                <!--<v-checkbox v-model="notifications"></v-checkbox>-->
                <!--</v-list-tile-action>-->
                <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Notifications</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded-->
                <!--</v-list-tile-sub-title>-->
                <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--<v-list-tile avatar>-->
                <!--<v-list-tile-action>-->
                <!--<v-checkbox v-model="sound"></v-checkbox>-->
                <!--</v-list-tile-action>-->
                <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Sound</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply-->
                <!--</v-list-tile-sub-title>-->
                <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--<v-list-tile avatar>-->
                <!--<v-list-tile-action>-->
                <!--<v-checkbox v-model="widgets"></v-checkbox>-->
                <!--</v-list-tile-action>-->
                <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Auto-add widgets</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>-->
                <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--</v-list>-->

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
		props: ['codename'],
		data() {
			return {
				dialog: false,
				notifications: false,
				sound: false,
				widgets: false,
				replace_content: false
			};
		},
		computed: {
			template() {
				return this.templates[this.codename];
			},
			...mapGetters({
				'templates': 'template/templates'
			})
		},
		components: {
			ThemePreviewImage
		}

	};
</script>

<style scoped>

</style>