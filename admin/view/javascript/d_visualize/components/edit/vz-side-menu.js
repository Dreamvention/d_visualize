Vue.component('vz-side-menu', {
	template: '#vz-side-menu',
	computed: {
		active_template() {
			return this.$store.getters.active_template;
		},
	},
	methods: {
	}
});