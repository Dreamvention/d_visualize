Vue.component('vz-edit-navigation', {
	template: '#vz-edit-navigation',
	computed: {
		edit_history() {
			return this.$store.getters.edit_history;
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