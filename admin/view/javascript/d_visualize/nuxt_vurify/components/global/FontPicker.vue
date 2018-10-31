<template>
    <div class="font-picker">
        <slot name="input">
            <div class="font-picker__input">
                <i class="fa fa-search"></i>
                <input v-model="valueSearch"/>
            </div>
        </slot>
        <div v-for="font in fonts">
            <div class="font-list__item" :style='
            `font-family:${font.family}, sans ,sans-serif;`' @click="selectFont(font.family,font.files[font.variants[0]])">
                <span class="font-list__item__font-holder">{{font.family}}</span>
                <div class="font-list__item__checker-box" v-if="value===font.family">
                    <slot name="selector">
                        <i class="fa fa-check"></i>
                    </slot>
                </div>
            </div>
        </div>
        <slot name="load_more" v-if="limit<=fonts.length">
            <button @click="loadMore">More</button>
        </slot>
    </div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: "FontPicker",
		props: {
			'apiKey': {
				type: String,
				default() {
					return 'AIzaSyCy0FnCzrko_81PVe2Y3DdnkQ7UJo7zgs8';
				}
			},
			'value': {
				type: String,
				default() {
					return '';
				}
			},
			'fontList': {
				type: Array,
				default() {
					return [];
				}
			},
		},
		data() {
			return {
				valueSearch: '',
				limit: 20,
				font_list: [],
			};
		},
		computed: {
			fonts() {
				let fonts = this.font_list
					.filter(font=>font.family.toLocaleLowerCase()
						.match(`.*${this.valueSearch}.*`))
					.sort((a, b)=>{
							return a.family > b.family ? 1 : a.family < b.family ? -1 : 0;
						}
					).slice(0, this.limit);
				this.apendStylesFontFace(fonts);
				return fonts;
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			async init() {
				if (this.fontList.length <= 0) {
					let {data: {items: items}} = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${this.apiKey}`);
					this.font_list = items;
				}
			},
			apendStylesFontFace(list) {
				let css = '/* start */ \n';
				for (let font of list) {
					let font_face = `@font-face {
                    font-family: '${font.family}';
                    font-style: normal;
                    font-weight: 400;
                    src: local('${font.family}'),url('${font.files[font.variants[0]]}') format('truetype');
                }\n`;
					css += font_face;
				}
				var sheetToBeRemoved = document.getElementById('font-picker-face');
				if (sheetToBeRemoved) {
					var sheetParent = sheetToBeRemoved.parentNode;
					sheetParent.removeChild(sheetToBeRemoved);
				}
				var head = document.head || document.getElementsByTagName('head')[0],
					style = document.createElement('style');

				style.id = 'font-picker-face';
				style.type = 'text/css';
				if (style.styleSheet) {
					// This is required for IE8 and below.
					style.styleSheet.cssText = css;
				} else {
					style.appendChild(document.createTextNode(css));
				}
				head.appendChild(style);
			},
			loadMore() {
				this.limit += 20;
			},
			selectFont(value,url) {
				this.$emit('input', value);
				this.$emit('font-url', url);
			}
		}
	};
</script>

<style lang="scss">/* start */
.font-picker {
    max-height: 400px;
    overflow: auto;
    padding: 20px;
    &__input {
        padding: 3px;
        border: 1px solid gray;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .fa {
            margin-right: 5px;
        }
        input {
            line-height: 20px;
            outline: none;
            width: 100%;
        }
    }
}

.font-list__item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    &:hover {
    }
}
</style>