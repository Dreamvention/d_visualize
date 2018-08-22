Vue.component('home', {
	template: '#t-home',
	computed: {
		templates: function () {
			return this.$store.getters.available_templates;
		},
		activeTemplate: function () {
			return this.$store.getters.active_template;
		}
	},
});