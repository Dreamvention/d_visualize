Vue.component('vz-edit-vdh', {
	template: '#vz-edit-vdh',
	computed: {},
	methods: {},
	watch: {
		$route(to, from) {
			console.log('watchvdh')
			// this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT',
			// 	[
			// 		{href: '/edit/vdh', text: 'edit.vdh'},
			// 		{href: '/edit/vdf', text: 'edit.vdf'}
			// 	]);
		}
	},
	beforeMount() {
		this.$store.dispatch('LOAD_VISUAL_HEADER', this.$o('action.vdh'));
	}
});