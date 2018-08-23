Vue.component('d-loader', {
	template: '#t-loader',
	props: {
		name: {
			type: String,
			default () {
				return ''
			}
		},
		value: {
			type: String,
			default () {
				return ''
			}
		}
	},
	computed:{
		loading:function () {
			return this.$store.getters.loading;
		}
	}
})