<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.entry_colors')}}</h2>
        </template>
        <p class="display-1">Colors</p>
        <div v-for="(value,color_key) in skin_colors" class="color-box">
            <div class="colors-box__item">
                {{color_key}}
                <div class="colors-box__color-icon" @click="showPicker(color_key,value,$event)"
                     :style="'background-color:'+ value">
                </div>
            </div>
        </div>
        <v-menu
                v-model="picker.showMenu"
                :close-on-content-click="false"
                :position-x="picker.x"
                :position-y="picker.y"
                absolute
                offset-y
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
		name: "colors",
		computed: {
			...mapGetters({
				template: 'template/active_template',
				skin_colors: 'template/active_skin_colors',
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
		components: {
			'chrome-picker': Sketch,
		},
		methods: {
			showPicker(key, value,e) {
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
				_.once(_.throttle(()=>{
					this.picker.color = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${value.rgba.a});`;
					this.$store.dispatch('template/CHANGE_SKIN_COLOR', {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						color_key: this.picker.key,
						color_value: this.picker.color,
					});
				}, 1000))();
			}
		}
	};
</script>

<style lang="scss">
    .colors-box {
        &__item {
            border: 1px solid var(--info);
            padding: 5px;
            margin-bottom: 20px;
            width: auto;
            min-width: 180px;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
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