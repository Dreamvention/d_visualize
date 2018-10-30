<template>
    <div class="font-picker">
        <slot name="input">
            <i class="fa fa-search"></i>
            <input name="" id="font-picker-input" v-model="valueSearch" placeholder=""/>
        </slot>
        <div v-for="font in fonts">
            <p :style='
            `font-family:${font.family}, sans ,sans-serif;
            font-style:normal;
            color:black;
            font-weight:normal;
            `' @click="selectFont(font.family)">{{font.family}}</p>
            <slot name="selector" v-if="value===font.family"> - selected</slot>
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
			selectFont(value) {
				console.log(value);
				this.$emit('input', value);
			}
		}
	};
</script>

<style>/* start */
@font-face {
    font-family: 'ABeeZee';
    font-style: normal;
    font-weight: 400;
    src: local('ABeeZee'),url('http://fonts.gstatic.com/s/abeezee/v11/esDR31xSG-6AGleN6tI.ttf') format('truetype');
}
@font-face {
    font-family: 'Abel';
    font-style: normal;
    font-weight: 400;
    src: local('Abel'),url('http://fonts.gstatic.com/s/abel/v8/MwQ5bhbm2POE6Vg.ttf') format('truetype');
}
@font-face {
    font-family: 'Abhaya Libre';
    font-style: normal;
    font-weight: 400;
    src: local('Abhaya Libre'),url('http://fonts.gstatic.com/s/abhayalibre/v3/e3tmeuGtX-Co5MNzeAOqinEgew.ttf') format('truetype');
}
@font-face {
    font-family: 'Abril Fatface';
    font-style: normal;
    font-weight: 400;
    src: local('Abril Fatface'),url('http://fonts.gstatic.com/s/abrilfatface/v9/zOL64pLDlL1D99S8g8PtiKchm-A.ttf') format('truetype');
}
@font-face {
    font-family: 'Aclonica';
    font-style: normal;
    font-weight: 400;
    src: local('Aclonica'),url('http://fonts.gstatic.com/s/aclonica/v8/K2FyfZJVlfNNSEBXGb7T.ttf') format('truetype');
}
@font-face {
    font-family: 'Acme';
    font-style: normal;
    font-weight: 400;
    src: local('Acme'),url('http://fonts.gstatic.com/s/acme/v7/RrQfboBx-C5_bx0.ttf') format('truetype');
}
@font-face {
    font-family: 'Actor';
    font-style: normal;
    font-weight: 400;
    src: local('Actor'),url('http://fonts.gstatic.com/s/actor/v7/wEOzEBbCkc5cO3ek.ttf') format('truetype');
}
@font-face {
    font-family: 'Adamina';
    font-style: normal;
    font-weight: 400;
    src: local('Adamina'),url('http://fonts.gstatic.com/s/adamina/v11/j8_r6-DH1bjoc-dwu-o.ttf') format('truetype');
}
@font-face {
    font-family: 'Advent Pro';
    font-style: normal;
    font-weight: 400;
    src: local('Advent Pro'),url('http://fonts.gstatic.com/s/adventpro/v7/V8mCoQfxVT4Dvddr_yOwjVmtLQ.ttf') format('truetype');
}
@font-face {
    font-family: 'Aguafina Script';
    font-style: normal;
    font-weight: 400;
    src: local('Aguafina Script'),url('http://fonts.gstatic.com/s/aguafinascript/v6/If2QXTv_ZzSxGIO30LemWEOmt1bHqg.ttf') format('truetype');
}
@font-face {
    font-family: 'Akronim';
    font-style: normal;
    font-weight: 400;
    src: local('Akronim'),url('http://fonts.gstatic.com/s/akronim/v7/fdN-9sqWtWZZlHRp-gA.ttf') format('truetype');
}
@font-face {
    font-family: 'Aladin';
    font-style: normal;
    font-weight: 400;
    src: local('Aladin'),url('http://fonts.gstatic.com/s/aladin/v6/ZgNSjPJFPrvJV5f16Q.ttf') format('truetype');
}
@font-face {
    font-family: 'Aldrich';
    font-style: normal;
    font-weight: 400;
    src: local('Aldrich'),url('http://fonts.gstatic.com/s/aldrich/v8/MCoTzAn-1s3IGyJMZaA.ttf') format('truetype');
}
@font-face {
    font-family: 'Alef';
    font-style: normal;
    font-weight: 400;
    src: local('Alef'),url('http://fonts.gstatic.com/s/alef/v9/FeVfS0NQpLYgrjI.ttf') format('truetype');
}
@font-face {
    font-family: 'Alegreya';
    font-style: normal;
    font-weight: 400;
    src: local('Alegreya'),url('http://fonts.gstatic.com/s/alegreya/v11/4UaBrEBBsBhlBjvfkRLm.ttf') format('truetype');
}
@font-face {
    font-family: 'Alegreya SC';
    font-style: normal;
    font-weight: 400;
    src: local('Alegreya SC'),url('http://fonts.gstatic.com/s/alegreyasc/v9/taiOGmRtCJ62-O0HhNEa-a6o.ttf') format('truetype');
}
@font-face {
    font-family: 'Alegreya Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Alegreya Sans'),url('http://fonts.gstatic.com/s/alegreyasans/v8/5aUt9_-1phKLFgshYDvh6Vwt5TltuA.ttf') format('truetype');
}
@font-face {
    font-family: 'Alegreya Sans SC';
    font-style: normal;
    font-weight: 400;
    src: local('Alegreya Sans SC'),url('http://fonts.gstatic.com/s/alegreyasanssc/v7/mtGn4-RGJqfMvt7P8FUr0Q1j-Hf1Dipl8g.ttf') format('truetype');
}
@font-face {
    font-family: 'Alex Brush';
    font-style: normal;
    font-weight: 400;
    src: local('Alex Brush'),url('http://fonts.gstatic.com/s/alexbrush/v9/SZc83FzrJKuqFbwMKk6EtUI.ttf') format('truetype');
}
@font-face {
    font-family: 'Alfa Slab One';
    font-style: normal;
    font-weight: 400;
    src: local('Alfa Slab One'),url('http://fonts.gstatic.com/s/alfaslabone/v7/6NUQ8FmMKwSEKjnm5-4v-4Jh6dU.ttf') format('truetype');
}
@font-face {
    font-family: 'Alice';
    font-style: normal;
    font-weight: 400;
    src: local('Alice'),url('http://fonts.gstatic.com/s/alice/v9/OpNCnoEEmtHa6FcJ.ttf') format('truetype');
}
@font-face {
    font-family: 'Alike';
    font-style: normal;
    font-weight: 400;
    src: local('Alike'),url('http://fonts.gstatic.com/s/alike/v10/HI_EiYEYI6BIoEjB.ttf') format('truetype');
}
@font-face {
    font-family: 'Alike Angular';
    font-style: normal;
    font-weight: 400;
    src: local('Alike Angular'),url('http://fonts.gstatic.com/s/alikeangular/v8/3qTrojWunjGQtEBlIcwMbSoI3kM.ttf') format('truetype');
}
@font-face {
    font-family: 'Allan';
    font-style: normal;
    font-weight: 400;
    src: local('Allan'),url('http://fonts.gstatic.com/s/allan/v10/ea8XadU7WuTxEtb2.ttf') format('truetype');
}
@font-face {
    font-family: 'Allerta';
    font-style: normal;
    font-weight: 400;
    src: local('Allerta'),url('http://fonts.gstatic.com/s/allerta/v8/TwMO-IAHRlkbx940UnE.ttf') format('truetype');
}
@font-face {
    font-family: 'Allerta Stencil';
    font-style: normal;
    font-weight: 400;
    src: local('Allerta Stencil'),url('http://fonts.gstatic.com/s/allertastencil/v8/HTx0L209KT-LmIE9N7OR6eiycOeF-w.ttf') format('truetype');
}
@font-face {
    font-family: 'Allura';
    font-style: normal;
    font-weight: 400;
    src: local('Allura'),url('http://fonts.gstatic.com/s/allura/v6/9oRPNYsQpS4zjuAPjA.ttf') format('truetype');
}
@font-face {
    font-family: 'Almendra';
    font-style: normal;
    font-weight: 400;
    src: local('Almendra'),url('http://fonts.gstatic.com/s/almendra/v10/H4ckBXKAlMnTn0CskyY6.ttf') format('truetype');
}
@font-face {
    font-family: 'Almendra Display';
    font-style: normal;
    font-weight: 400;
    src: local('Almendra Display'),url('http://fonts.gstatic.com/s/almendradisplay/v8/0FlPVOGWl1Sb4O3tETtADHRRlZhzXS8.ttf') format('truetype');
}
@font-face {
    font-family: 'Almendra SC';
    font-style: normal;
    font-weight: 400;
    src: local('Almendra SC'),url('http://fonts.gstatic.com/s/almendrasc/v8/Iure6Yx284eebowr7hbyTZZJ.ttf') format('truetype');
}
@font-face {
    font-family: 'Amarante';
    font-style: normal;
    font-weight: 400;
    src: local('Amarante'),url('http://fonts.gstatic.com/s/amarante/v5/xMQXuF1KTa6EvGx9bq-3.ttf') format('truetype');
}
@font-face {
    font-family: 'Amaranth';
    font-style: normal;
    font-weight: 400;
    src: local('Amaranth'),url('http://fonts.gstatic.com/s/amaranth/v8/KtkuALODe433f0j1zPnC.ttf') format('truetype');
}
@font-face {
    font-family: 'Amatic SC';
    font-style: normal;
    font-weight: 400;
    src: local('Amatic SC'),url('http://fonts.gstatic.com/s/amaticsc/v11/TUZyzwprpvBS1izr_vO0DQ.ttf') format('truetype');
}
@font-face {
    font-family: 'Amethysta';
    font-style: normal;
    font-weight: 400;
    src: local('Amethysta'),url('http://fonts.gstatic.com/s/amethysta/v6/rP2Fp2K15kgb_F3ibfWIGA.ttf') format('truetype');
}</style>