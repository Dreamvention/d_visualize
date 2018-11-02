<template>
    <div class="font-picker">
        <div class="font-picker__input">
            <slot name="input">
                <v-text-field
                        v-model="valueSearch"
                        hide-details
                        :label="$t('common.search')"
                        append-icon="search"
                ></v-text-field>

            </slot>
        </div>

        <div v-for="font in fonts">
            <div class="font-list__item" :style='
            `font-family:${font.family}, sans ,sans-serif;`' @click="selectFont(font.family,font.files[font.variants[0]])">
                <span class="font-list__item__font-holder">{{font.family}}</span>
                <div class="font-list__item__checker-box" v-show="value===font.family">
                    <slot name="selector">
                        <v-icon small>check</v-icon>
                    </slot>
                </div>
            </div>
        </div>
        <div v-if="fonts.length <= 0">
                <div class="font-picker__not-found heading">
                    <slot name="not_found">
                        Not found
                    </slot>
                </div>
        </div>
        <div class="font-picker__load-more" @click="loadMore" v-if="limit<=fonts.length">
            <slot name="load_more">
                <button>More</button>
            </slot>
        </div>

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
						.match(`.*${this.valueSearch.toLocaleLowerCase()}.*`))
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
				console.log(list);
				let css = '/* start */ \n';
				for (let font of list) {
					let font_face = `@font-face {
                    font-family: '${font.family}';
                    font-style: normal;
                    font-weight: 400;
                    src: local('${font.family}'),url('${font.files[font.variants[0]].replace('http://', 'https://')}') format('truetype');
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
				this.$emit('font_url', {value: value, ulr: url});
			}
		}
	};
</script>

<style lang="scss">/* start */
.font-picker {
    max-height: 400px;
    overflow: auto;
    background-color: #fff;
    font-size: 18px;
    &__load-more,&__not-found{
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 5px;
    }
    &__input {
        padding-top: 10px;
        .v-input__slot{
            padding-left: 20px;
            padding-right: 20px;
        }
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
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    transition: all .2s;
    &:hover {
        background-color: var(--info);
        .font-list__item__checker-box{
            display: block !important;
            background-color: var(--info);
            .theme--light.v-icon{
                color: #000;
            }
        }
    }
}

.font-list__item__checker-box {
    background-color: var(--primary);
    width: 25px;
    height: 25px;
    position: relative;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    .theme--light.v-icon {
        color: #fff;
        position: absolute;
        bottom: 0;
        margin-left: 4px;
        margin-bottom: 4px;
    }
    border-radius: 100%;
}
</style>