Vue.component('viz-dashboard', {
	template: '#viz-dashboard',
	computed: {
		status: function () {
			return this.$store.getters.status;
		},
		loading: function () {
			console.log(this.$store.getters.loading);
			return this.$store.getters.loading;
		},
		setting: function () {
			return this.$store.getters.setting;
		},
	},
	methods: {
		change_auto_save: function (e) {
			this.$store.dispatch('CHANGE_AUTO_SAVE', e);
		},
	},
	beforeMount() {
		this.$store.dispatch('LOADING_START');
	},
	mounted() {
		this.$store.dispatch('LOADING_END');
	},
});