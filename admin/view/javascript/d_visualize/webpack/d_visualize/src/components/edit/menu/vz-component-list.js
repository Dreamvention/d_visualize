Vue.component('vz-component-list', {
	template: '#vz-component-list',
	computed: {
		active_template() {
			return this.$store.getters.active_template;
		},
		components() {
			return this.$store.getters.editable_components;
		},
	},
	methods: {}
});