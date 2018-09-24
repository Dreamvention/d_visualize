Vue.component('vz-edit-navigation', {
	template: '#vz-edit-navigation',
	computed: {
		menu() {
			return this.$store.getters.menu;
		}
	},
	methods: {
		to(path) {
			this.$store.dispatch('PUSH_EDIT_HISTORY', path);
			this.$router.push(path);
		}
	},
	mounted() {
	}
});