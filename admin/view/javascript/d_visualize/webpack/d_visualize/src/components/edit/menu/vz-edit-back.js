Vue.component('vz-edit-back', {
	template: '#vz-edit-back',
	props: {},
	computed: {
		close() {
			console.log(this.$router.history.current.path)
			return this.$router.history.current.path === '/edit';
		}
	},
	methods: {}
});