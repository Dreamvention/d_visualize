Vue.component('viz-home', {
	template: '#viz-home',
	computed: {
		setting: function () {
			return this.$store.getters.setting;
		},
		loading_first: function () {
			return this.$store.getters.loading_first;
		}
	},
	methods: {
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