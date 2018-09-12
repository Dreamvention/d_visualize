Vue.component('vz-edit-theme', {
	template: '#vz-edit-theme',
	computed: {
		setting: function () {
			return this.$store.getters.setting;
		},
	},
	methods: {
        iframeLoad(){

		}
	},
	beforeMount() {
		$('body').addClass('edit')
	},
	beforeDestroy(){
        $('body').removeClass('edit');
	}
});