Vue.component('viz-edit-theme', {
	template: '#viz-edit-theme',
	computed: {
		setting: function () {
			return this.$store.getters.setting;
		},
	},
	methods: {},
	beforeMount() {
		$('header,#column-left,footer').css('display','none')
		console.log('Nothing gets called before me!')
	},
	beforeDestroy(){
		$('header,#column-left,footer').css('display','block')
	}
});