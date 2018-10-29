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
                :nudge-width="200"
                :position-x="picker.x"
                :position-y="picker.y"
                absolute
                offset-y
        >
            <chrome-picker :value="picker.color" v-show="picker.showMenu"/>
        </v-menu>
    </ComponentContainer>
</template>
<script>
	import {mapGetters} from 'vuex';
	import {Photoshop,Sketch,Chrome,Material} from 'vue-color';

	export default {
		name: "colors",
		computed: {
			skin_colors() {
				return this.template.skines[this.template.setting.active_skin].colors;
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
				}
			};
		},
		components: {
			'chrome-picker': Sketch,
		},
		methods: {
			showPicker(key, value,e) {
				e.preventDefault();
				this.picker.color = value;
				this.picker.x = e.clientX;
				this.picker.y = e.clientY;
				this.picker.showMenu = false;
				this.$nextTick(() => {
					this.picker.showMenu = true
				})
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
            min-width: 160px;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
        }
        &__color-icon {
            cursor: pointer;
            border: 1px solid var(--secondary);
            display: inline-block;
            width: 30px;
            height: 30px;
        }
    }
</style>