Vue.component('vz-edit-page-select', {
	template: '#vz-edit-page-select',
	computed: {
		currentPage() {
			return this.$store.getters.current_page;
		},
		availablePages() {
			return this.$store.getters.available_page;
		}
	},
	methods: {
		// update(e, options) {
		// 	// no need to update if there no available component exist.
		// 	// at this case set default skin because it have to be
		// 	let skin = this.availableComponents[this.componentId][options.value] ? options.value : 'default';
		// 	this.$store.dispatch('UPDATE_COMPONENT', {
		// 		active_template_id: this.$store.getters.setting.active_template,
		// 		component_id: this.componentId,
		// 		component_skin: skin
		// 	});
		//
		// }
	},
});