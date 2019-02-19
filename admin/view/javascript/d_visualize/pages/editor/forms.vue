<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.entry_forms')}}</h2>
        </template>
        <div v-for="(setting,forms_key) in settings"
             :key="forms_key"
             class="forms-var">

                <span class="subheading">{{$t(setting.text)}}</span>
            <template v-if="setting.type === 'slider'">
                <v-slider
                        :label="values[forms_key]"
                        inverse-label
                        :min="setting.min"
                        :max="setting.max"
                        :step="setting.step"
                        :value="parseFloat(values[forms_key])"
                        @change="changeVariable(forms_key,$event)"
                ></v-slider>
            </template>
            <template v-else-if="setting.type ==='forms-family'">
                <div class="forms-box">
                    <div class="forms-box__family" :style='`forms-family:${values[forms_key]}, sans ,sans-serif;`'>
                        {{values[forms_key]}}
                    </div>
                    <v-btn block
                           color="info"
                           class="my-0 forms-box__change"
                           @click="showPicker(forms_key,values[forms_key],setting,$event)">
                        {{$t('common.change')}}
                    </v-btn>
                </div>

            </template>
            <div v-else-if="setting.type === 'toggle'">
                <div class="toggler">
                    <v-btn-toggle
                            :value="values[forms_key]"
                            @change="changeVariable(forms_key,$event)"
                            class="transparent"
                    >
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
            <div v-else-if="setting.type === 'checkbox'">
                <v-switch
                        :input-value="values[forms_key]"
                        @change="changeVariable(forms_key,$event)"
                ></v-switch>
            </div>
            <div v-else>
                {{setting.type}}
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
                    {{$t('forms.not_found')}}
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
	import FontPicker from "~//components/global/FontPicker";

	export default {
		name: "typography",
		components: {FontPicker},
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
				return this.$store.getters['template/active_skin_holder']('forms');
			},
			settings() {
				return this.$store.getters['template/active_skin_holder_variables']('forms');
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
	        changeToggle(forms_key, $event) {
		        console.log($event);
	        },
	        changeVariable(forms_key, $event) {
		        let key = forms_key;
		        let value = $event;
		        if (this.settings[forms_key] && this.settings[forms_key].suffix) {
			        value += this.settings[forms_key].suffix;
		        }
		        if (!this.settings[forms_key]) {
			        key = this.picker.key;
			        this.picker.value = forms_key;
			        value = forms_key;
		        }
		        this.$store.dispatch('template/SET_SKIN_VARIABLE', {
			        template_id: this.template.setting.codename,
			        skin: this.template.setting.active_skin,
			        holder: 'forms',
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
    .forms-var {
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

    .forms-box {
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