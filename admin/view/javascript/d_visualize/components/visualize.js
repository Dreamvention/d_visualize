Vue.component('visualize', {
	template: '#t-visualize',
	computed: {
		status: function () {
			return this.$store.getters.status;
		},
		loading_first: function () {
			return this.$store.getters.loading_first;
		},
		loading: function () {
			return this.$store.getters.loading;
		}
	},
	methods: {
		change_status: function () {
			this.$store.dispatch('CHANGE_STATUS');
		},
		save_stay: function () {
			this.$store.dispatch('SAVE_CONTENT');
		},
		save: function () {
			this.$store.dispatch('SAVE_CONTENT', {
				callback: function () {
					window.locaion = this.$o('action.cancel');
				}
			});
		}
	}
});