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
		update(e, options) {
			console.log(options)
			// no need to update if there no available component exist.
			// at this case set default skin because it have to be
			// this.$store.dispatch('CURRENT_PAGE', options);

		}
	},
});