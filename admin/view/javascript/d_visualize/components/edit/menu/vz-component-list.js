Vue.component('vz-component-list', {
	template: '#vz-component-list',
	computed: {
		components() {
				return this.$store.getters.editable_components;
		},
	},
	methods: {
	}
});