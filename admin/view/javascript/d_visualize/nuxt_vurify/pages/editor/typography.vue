<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.entry_typography')}}</h2>
        </template>
        <p class="display-1">Typography</p>
        <!--<v-expansion-panel popout>-->
            <!--<v-expansion-panel-content-->
                    <!--v-for="(item,i) in 5"-->
                    <!--:key="i"-->
            <!--&gt;-->
                <!--<div slot="header">Item</div>-->
                <!--<v-card>-->
                    <!--<v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>-->
                <!--</v-card>-->
            <!--</v-expansion-panel-content>-->
        <!--</v-expansion-panel>-->
        <v-subheader>Body text size</v-subheader>
        <v-slider
                v-model="size_base"
                always-dirty
                thumb-label="always"
                :min="settings['size-base'].min"
                :max="settings['size-base'].max"
                :step="settings['size-base'].step"
        >
            <template
                    slot="thumb-label"
                    slot-scope="props"
            >
          <span>
              {{font['size-base']}}
          </span>
            </template>
        </v-slider>
        <v-subheader>Base line height</v-subheader>
        <v-slider
                v-model="line_height"
                always-dirty
                thumb-label="always"
                :min="settings['line-height'].min"
                :max="settings['line-height'].max"
                :step="settings['line-height'].step"
        >
            <template
                    slot="thumb-label"
                    slot-scope="props"
            >
          <span>
              {{font['line-height']}}
          </span>
            </template>
        </v-slider>
        <v-subheader>Header text size</v-subheader>
        <v-slider
                v-model="headings_size_base"
                always-dirty
                thumb-label="always"
                :min="settings['headings-size-base'].min"
                :max="settings['headings-size-base'].max"
        >
            <template
                    slot="thumb-label"
                    slot-scope="props"
            >
          <span>
              {{font['headings-size-base']}}
          </span>
            </template>
        </v-slider>
        <v-subheader>Header line height</v-subheader>
        <v-slider
                v-model="headings_line_height"
                always-dirty
                thumb-label="always"
                :min="settings['headings-line-height'].min"
                :max="settings['headings-line-height'].max"
                :step="settings['headings-line-height'].step"

        >
            <template
                    slot="thumb-label"
                    slot-scope="props"
            >
          <span>
              {{font['headings-line-height']}}
          </span>
            </template>
        </v-slider>
        <v-subheader>Header font style</v-subheader>
        <v-btn-toggle
                v-model="toggle_multiple"
                class="transparent"
                multiple>
            <v-tooltip bottom>
                <v-btn slot="activator" value="bold" color="primary">
                    <v-icon>format_bold</v-icon>
                </v-btn>
                <span><b>BOLD</b></span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn slot="activator" value="italic" color="primary">
                    <v-icon>format_italic</v-icon>
                </v-btn>
                <span><i>italic</i></span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn slot="activator" value="underline" color="primary">
                    <v-icon>format_underlined</v-icon>
                </v-btn>
                <span style="text-decoration: underline">underline</span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn slot="activator" value="capitalize" color="primary">
                    <v-icon>text_fields</v-icon>
                </v-btn>
                <span>Capitalize Text</span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn slot="activator" value="uppercase" color="primary">
                    <v-icon>title</v-icon>
                </v-btn>
                <span><i>ALL CAPITALIZE</i></span>
            </v-tooltip>
        </v-btn-toggle>
        <v-subheader>Body font</v-subheader>
        <v-menu
                v-model="family_menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x>
            <v-btn
                    slot="activator"
            >
                {{family}}
            </v-btn>

            <v-card>
                <FontPicker v-model='family'></FontPicker>
                <v-card-actions>
                    <v-btn flat @click="family_menu = false">Cancel</v-btn>
                    <v-btn color="primary" flat @click="family_menu = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
        <!--<v-subheader>Header font</v-subheader>-->
        <!--<FontPicker v-model='header_font'></FontPicker>-->

        <!--<v-checkbox-->
        <!--:label="`Checkbox 1: ${checkbox.toString()}`"-->
        <!--v-model="checkbox"-->
        <!--&gt;</v-checkbox>-->

    </ComponentContainer>
</template>

<script>
	import {mapGetters} from 'vuex';
	import moment from 'moment';

	export default {
		name: "typography",
        data(){
			return{
				toggle_multiple: ['bold', 'italic'],
				last_change_picker: moment().valueOf()
			}
        },
		computed: {
			settings() {
				return this.$store.getters['template/active_skin_holder_settings']('font');
            },
			size_base: {
				get() {
					return parseInt(this.$store.getters['template/active_skin_typography']['size-base']);
				},
				set(val) {
					this.last_change_picker = moment().valueOf();
					// _.debounce(()=>{
					// 	if (moment().valueOf() - this.last_change_picker>50) {
					this.$store.dispatch('template/SET_SKIN_VARIABLE', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						holder: 'font',
						key: 'size-base',
						value: val + this.settings['size-base'].suffix,
					});
					// }
					// },50, true)();
				}
			},
			family: {
				get() {
					return this.$store.getters['template/active_skin_typography']['family'];
				},
				set(val) {
					this.$store.dispatch('template/SET_SKIN_VARIABLE', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						holder: 'font',
						key: 'family',
						value: val,
					});
				}
			},
			line_height: {
				get() {
					return parseInt(this.$store.getters['template/active_skin_typography']['line-height']);
				},
				set(val) {
					this.$store.dispatch('template/SET_SKIN_VARIABLE', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						holder: 'font',
						key: 'line-height',
						value: val,
					});
				}
			},
			headings_family: {
				get() {
					return parseInt(this.$store.getters['template/active_skin_typography']['headings-family']);
				},
				set(val) {
					this.$store.dispatch('template/SET_SKIN_VARIABLE', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						holder: 'font',
						key: 'headings-family',
						value: val,
					});
				}
			},
			headings_size_base: {
				get() {
					return parseInt(this.$store.getters['template/active_skin_typography']['headings-size-base']);
				},
				set(val) {
					this.$store.dispatch('template/SET_SKIN_VARIABLE', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						holder: 'font',
						key: 'headings-size-base',
						value: val + 'px',
					});
				}
			},
			headings_line_height: {
				get() {
					return parseInt(this.$store.getters['template/active_skin_typography']['headings-line-height']);
				},
				set(val) {
					this.$store.dispatch('template/SET_SKIN_VARIABLE', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						holder: 'font',
						key: 'headings-line-height',
						value: val,
					});
				}
			},
			headings_letter_spacing: {
				get() {
					return parseInt(this.$store.getters['template/active_skin_typography']['headings-letter-spacing']);
				},
				set(val) {
					this.$store.dispatch('template/SET_SKIN_VARIABLE', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						holder: 'font',
						key: 'headings-letter-spacing',
						value: val,
					});
				}
			},
			headings_text_transform: {
				get() {
					return parseInt(this.$store.getters['template/active_skin_typography']['headings-text-transform']);
				},
				set(val) {
					this.$store.dispatch('template/SET_SKIN_VARIABLE', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						holder: 'font',
						key: 'headings-text-transform',
						value: val,
					});
				}
			},
			...mapGetters({
				template: 'template/active_template',
				font: 'template/active_skin_typography',
			})
		},
		filters: {
			sanitize_number(value) {
				return parseInt(value);
			}
		},
        methods:{
	        increase(){
	        	console.log('inc')
            },
	        decrease(){
	        	console.log('decrease')
            }
        }
	};
</script>

<style scoped>

</style>