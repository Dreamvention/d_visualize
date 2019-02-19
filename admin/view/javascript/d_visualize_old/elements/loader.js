Vue.component('d-loader', {
	template: '#t-loader',
	props: {
        size: {
			type: String,
			default () {
				return 'normal'
			}
		}
	},
	computed:{
		auto_save:function () {
			return this.$store.getters.setting.auto_save
        },
		loading:function () {
			return this.$store.getters.loading;
		}
	}
})