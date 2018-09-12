Vue.component('visualize', {
	template: '#t-visualize',
	computed: {
		loading: function () {
			return this.$store.getters.loading;
		}
	},
	methods: {

	}
});