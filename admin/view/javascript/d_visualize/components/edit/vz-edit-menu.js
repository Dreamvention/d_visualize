Vue.component('vz-edit-menu', {
	template: '#vz-edit-menu',
	computed: {
		active_template() {
			return this.$store.getters.active_template;
		},
		edit_history() {
			return this.$store.getters.edit_history;
		}
	},
	methods: {
		saveTemplate(){
			this.$store.dispatch('SAVE_TEMPLATE')
		}
	}
});