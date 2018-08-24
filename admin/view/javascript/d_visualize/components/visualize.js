Vue.component('visualize', {
	template: '#t-visualize',
	computed: {
		status: function () {
			return this.$store.getters.status;
		},
        setting: function () {
			return this.$store.getters.setting;
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
        change_auto_save: function (e) {
			this.$store.dispatch('CHANGE_AUTO_SAVE',e);
		},
		save_stay: function () {
			this.$store.dispatch('SAVE_CONTENT');
		},
		save: function () {
			this.$store.dispatch('SAVE_CONTENT', {
				callback: function () {
					window.location = app.$o('action.cancel');
				}
			});
		}
	}
});