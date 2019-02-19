Vue.component('vz-edit-vdf', {
	template: '#vz-edit-vdf',
	computed: {
	},
	methods: {},
	beforeMount() {
		this.$store.dispatch('LOAD_VISUAL_FOOTER',this.$o('action.vdf'));

	},
	beforeDestroy() {

	}
});