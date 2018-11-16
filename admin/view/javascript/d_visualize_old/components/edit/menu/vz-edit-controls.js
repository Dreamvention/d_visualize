Vue.component('vz-edit-controls', {
	template: '#vz-edit-controls',
	props: {},
	computed: {
		menu() {
			return this.$store.getters.menu;
		}
	},
	methods: {
		toggle_show() {
			if (this.menu.hidden) {
				this.$store.dispatch('SHOW_MENU');
			} else {
				this.$store.dispatch('HIDE_MENU');
			}
		},
		changeIfrmeSize(e, ee) {
			$('#iframe').animate(
				{width: e},
				{
					duration: 500,
				});
		}
	},
	mounted() {
	}
});