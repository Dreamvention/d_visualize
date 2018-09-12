Vue.component('viz-dashboard', {
	template: '#viz-dashboard',
	computed: {
		status: function () {
			return this.$store.getters.status;
		},
		loading_first: function () {
			return this.$store.getters.loading_first;
		},
		setting: function () {
			return this.$store.getters.setting;
		},
		active_template: function () {
			return this.$store.getters.active_template;
		},
	},
	methods: {
		change_status: function () {
			this.$store.dispatch('CHANGE_STATUS');
		},
		change_auto_save: function (e) {
			this.$store.dispatch('CHANGE_AUTO_SAVE',e);
		},
	}
});