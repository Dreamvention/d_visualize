<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.entry_font')}}</h2>
        </template>
        <div v-for="(setting,font_key) in settings"
             :key="font_key"
             class="font-var"
        >
            <span class="subheading">{{$t(setting.text)}}</span>
            <div v-if="setting.type === 'slider'">
                <v-slider
                        :label="values[font_key]"
                        inverse-label
                        :min="setting.min"
                        :max="setting.max"
                        :step="setting.step"
                        :value="parseFloat(values[font_key])"
                        @change="changeVariable(font_key,setting,$event)"
                ></v-slider>
            </div>
            <div v-else-if="setting.type === 'font-family'">
                <v-menu
                        v-model="family_menu"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x>
                    <v-btn slot="activator">
                        {{$t(setting.text)}}
                    </v-btn>
                    <v-card>
                        <FontPicker :input="values[font_key]" @value="changeVariable(font_key,setting,$event)"></FontPicker>
                        <v-card-actions>
                            <v-btn flat @click="family_menu = false">Cancel</v-btn>
                            <v-btn color="primary" flat @click="family_menu = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </div>
            <div v-else-if="setting.type === 'C'">
                C
            </div>
            <div v-else>
                Not A/B/C
            </div>
        </div>
        <!--&gt;-->
        <!--<template-->
        <!--slot="thumb-label"-->
        <!--slot-scope="props"-->
        <!--&gt;-->
        <!--<span>-->
        <!--{{font['headings-line-height']}}-->
        <!--</span>-->
        <!--</template>-->
        <!--</v-slider>-->
        <!--<v-subheader>Header font style</v-subheader>-->
        <!--<v-btn-toggle-->
        <!--v-model="toggle_multiple"-->
        <!--class="transparent"-->
        <!--multiple>-->
        <!--<v-tooltip bottom>-->
        <!--<v-btn slot="activator" value="bold" color="primary">-->
        <!--<v-icon>format_bold</v-icon>-->
        <!--</v-btn>-->
        <!--<span><b>BOLD</b></span>-->
        <!--</v-tooltip>-->
        <!--<v-tooltip bottom>-->
        <!--<v-btn slot="activator" value="italic" color="primary">-->
        <!--<v-icon>format_italic</v-icon>-->
        <!--</v-btn>-->
        <!--<span><i>italic</i></span>-->
        <!--</v-tooltip>-->
        <!--<v-tooltip bottom>-->
        <!--<v-btn slot="activator" value="underline" color="primary">-->
        <!--<v-icon>format_underlined</v-icon>-->
        <!--</v-btn>-->
        <!--<span style="text-decoration: underline">underline</span>-->
        <!--</v-tooltip>-->
        <!--<v-tooltip bottom>-->
        <!--<v-btn slot="activator" value="capitalize" color="primary">-->
        <!--<v-icon>text_fields</v-icon>-->
        <!--</v-btn>-->
        <!--<span>Capitalize Text</span>-->
        <!--</v-tooltip>-->
        <!--<v-tooltip bottom>-->
        <!--<v-btn slot="activator" value="uppercase" color="primary">-->
        <!--<v-icon>title</v-icon>-->
        <!--</v-btn>-->
        <!--<span><i>UPPERCASE</i></span>-->
        <!--</v-tooltip>-->
        <!--</v-btn-toggle>-->
        <!--<v-subheader>Body font</v-subheader>-->

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
				family_menu:false,
				toggle_multiple: ['bold', 'italic'],
				last_change_picker: moment().valueOf()
			}
        },
		computed: {
			values() {
				return this.$store.getters['template/active_skin_holder']('font');
			},
			settings() {
				return this.$store.getters['template/active_skin_holder_variables']('font');
			},
			...mapGetters({
				template: 'template/active_template',
			})
		},
		filters: {
			sanitize_number(value) {
				return parseInt(value);
			}
		},
        methods:{
	        changeVariable(key, setting, $event) {
		        this.last_change_picker = moment().valueOf();
		        // _.debounce(()=>{
		        // 	if (moment().valueOf() - this.last_change_picker>50) {
		        this.$store.dispatch('template/SET_SKIN_VARIABLE', {
			        template_id: this.template.setting.codename,
			        skin: this.template.setting.active_skin,
			        holder: 'font',
			        key: key,
			        value: `${$event}${setting.suffix ? setting.suffix : ''}`,
		        });
		        // }
		        // },50, true)();
		        console.log('change');
            },
        }
	};
</script>

<style lang="scss">
    .font-var {
        .v-input--slider {
            margin-top: 0;
        }
        .v-slider__track, .v-slider__track-fill, .v-slider__track__container {
            height: 5px;
            border-radius: 20px;
            max-width: 240px;
        }
        .v-slider__thumb {
            z-index: 1;
            position: relative;
            &:before {
                position: absolute;
                z-index: 2;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                content: "";
                display: block;
                background-color: #fff;
                opacity: .6;
                width: 36px;
                height: 36px;
                border-radius: 100%;
                border: 1px solid var(--primary);
            }
            &:after {
                position: absolute;
                z-index: 2;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                content: "";
                display: block;
                background-color: #fff;
                width: 10px;
                height: 10px;
                border-radius: 100%;
            }
        }
    }
</style>