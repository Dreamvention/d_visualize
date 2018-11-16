<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.entry_colors')}}</h2>
        </template>
        <div v-for="(settings,color_key) in settings" class="color-box">
            <div class="color-box__text">
                {{$t(settings.text)}}
            </div>
            <div class="color-box__item">
                <div class="color-box__color-icon" @click="showPicker(color_key,values[color_key],settings,$event)"
                     :style="'background-color: '+ values[color_key]| sanitaze_css"></div>
                <span>{{values[color_key]|sanitaze_css}}</span>
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
                transition="scale-transition"
        >
            <chrome-picker :value="picker.color" @input="updatePicker"/>
        </v-menu>
    </ComponentContainer>
</template>
<script>
	import {mapGetters} from 'vuex';
	import {Sketch} from 'vue-color';
	import moment from 'moment';

	export default {
		name: "color",
		computed: {
			values() {
				return this.$store.getters['template/active_skin_holder']('color');
			},
			settings() {
				return this.$store.getters['template/active_skin_holder_variables']('color');
			},
			...mapGetters({
				template: 'template/active_template',
			})
		},
		data() {
			return {
				picker: {
					color: 'rgba(0,0,0,.2)',
                    x: 0,
					y: 0,
                    key: '',
					showMenu: false
				},
				last_change_picker: moment().valueOf()
			};
		},
		filters: {
			sanitaze_css(value) {
				if (value.indexOf('!default') !== -1) {
					return value.substr(0, value.indexOf('!default'));
				} else {
					return value;
				}

			}
		},
		components: {
			'chrome-picker': Sketch,
		},
		methods: {
			showPicker(key, value, settings, e) {
				e.preventDefault();
				this.picker.key = key;
				this.picker.color = value;
				this.picker.x = e.clientX;
				this.picker.y = e.clientY;
				this.picker.showMenu = false;
				this.$nextTick(() => {
					this.picker.showMenu = true
				})
			},
			updatePicker(value) {
				this.last_change_picker = moment().valueOf()
				_.debounce(()=>{
					if (moment().valueOf() - this.last_change_picker>50){
						// this.picker.color = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${value.rgba.a});`;
						this.picker.color = value.hex.toLowerCase();
						this.$store.dispatch('template/SET_SKIN_VARIABLE', {
							template_id: this.template.setting.codename,
							skin: this.template.setting.active_skin,
							holder: 'color',
							key: this.picker.key,
							value: this.picker.color,
						});
                    }
				}, 50)();
			}
		}
	};
</script>

<style lang="scss">
    .color-box {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        &__text {
            min-width: 140px;
        }
        &__item {
            min-width: 160px;
            border: 1px solid var(--info);
            padding: 5px;
            width: auto;
            display: inline-flex;
            align-items: center;
            span {
                margin-left: 10px;
            }
        }
        &__color-icon {
            margin-left: 10px;
            cursor: pointer;
            border: 1px solid var(--secondary);
            display: inline-block;
            width: 30px;
            height: 30px;
        }
    }
</style>