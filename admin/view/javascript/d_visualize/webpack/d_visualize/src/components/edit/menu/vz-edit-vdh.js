Vue.component('vz-edit-vdh', {
	template: '#vz-edit-vdh',
	computed: {},
	methods: {},
	beforeMount() {
		this.$store.dispatch('LOAD_VISUAL_HEADER', this.$o('action.vdh'));
	}
});