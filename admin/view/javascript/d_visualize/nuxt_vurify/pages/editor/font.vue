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
            <template v-if="setting.type === 'slider'">
                <v-slider
                        :label="values[font_key]+''"
                        inverse-label
                        :min="setting.min"
                        :max="setting.max"
                        :step="setting.step"
                        :value="parseFloat(values[font_key])"
                        @change="changeVariable(font_key,$event)"
                ></v-slider>
            </template>
            <template v-else-if="setting.type === 'font-family'">
                <div class="font-box">
                    <div class="font-box__family" :style='`font-family:${values[font_key]}, sans ,sans-serif;`'>
                        {{values[font_key]}}
                    </div>
                    <v-btn block
                           color="info"
                           class="my-0 font-box__change"
                           @click="showPicker(font_key,values[font_key],setting,$event)">
                        {{$t('common.change')}}
                    </v-btn>
                </div>

            </template>
            <div v-else-if="setting.type === 'toggle'">
                <div class="toggler">
                    <v-btn-toggle
                            :value="values[font_key]"
                            @change="changeVariable(font_key,$event)"
                            class="transparent"
                            multiple>
                        <template v-for="toggle in setting.values">
                            <v-tooltip right>
                                <v-btn slot="activator" :value="toggle.value" color="primary">
                                    <v-icon>{{toggle.icon}}</v-icon>
                                </v-btn>
                                <span v-html="$t(toggle.text)"></span>
                            </v-tooltip>
                        </template>
                    </v-btn-toggle>
                </div>
            </div>
            <div v-else>
                Cant load config setting
            </div>
        </div>

        <v-menu
                v-model="picker.showMenu"
                :close-on-content-click="false"
                :position-x="picker.x"
                :position-y="picker.y"
                absolute
                offset-y
                nudge-left="50"
                nudge-bottom="10"
                transition="scale-transition">
            <FontPicker :value="picker.value" @input="changeVariable">
                <template slot="load_more">
                    <v-btn block color="primary">{{$t('common.load_more')}}</v-btn>
                </template>
                <template slot="not_found">
                    {{$t('font.not_found')}}
                </template>
            </FontPicker>
        </v-menu>
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
				picker: {
					key: '',
					value: '',
					showMenu: false,
					x: 0,
					y: 0
				},
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
	        changeToggle(font_key, $event) {
		        console.log($event);
	        },
	        changeVariable(font_key, $event) {
		        let key = font_key;
		        let value = $event;
		        if (this.settings[font_key] && this.settings[font_key].suffix) {
			        value += this.settings[font_key].suffix;
		        }
		        console.log(value)
		        if (!this.settings[font_key]) {
			        key = this.picker.key;
			        this.picker.value = font_key;
			        value = font_key;
		        }
		        this.$store.dispatch('template/SET_SKIN_VARIABLE', {
			        template_id: this.template.setting.codename,
			        skin: this.template.setting.active_skin,
			        holder: 'font',
			        key: key,
			        value: value,
		        });
	        },
	        showPicker(key, value, settings, e) {
		        e.preventDefault();
		        this.picker.key = key;
		        this.picker.value = value;
		        this.picker.x = e.clientX;
		        this.picker.y = e.clientY;
		        this.picker.showMenu = !this.picker.showMenu;
	        },
        }
	};
</script>

<style lang="scss">
    .font-var {
        margin-bottom: 10px;
        .subheading {
            display: inline-block;
            margin-bottom: 5px;
        }
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

    .font-box {
        border: 1px solid var(--secondary);
        &__family {
            text-align: center;
            font-size: 16px;
            border-bottom: 1px solid var(--secondary);
            padding-top: 20px;
            padding-bottom: 20px;
        }
    }
</style>