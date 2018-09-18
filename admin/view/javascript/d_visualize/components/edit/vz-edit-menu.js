Vue.component('vz-edit-menu', {
	template: '#vz-edit-menu',
	computed: {
		active_template() {
			return this.$store.getters.active_template;
		},

	},
	methods: {
	}
});