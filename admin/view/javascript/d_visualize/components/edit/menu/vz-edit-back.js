Vue.component('vz-edit-back', {
	template: '#vz-edit-back',
	computed: {
		close() {
			return this.$store.getters.route.path === '/edit';
		},
		vd_layout() {
			return this.$store.getters.route.path === '/edit/vdh' || this.$store.getters.route.path === '/edit/vdf';
		},
		edit_history() {
			return this.$store.getters.edit_history;
		}
	},
	methods: {
		back(e) {
			if (this.vd_layout){
				this.$store.dispatch('LEAVE_VISUAL');
			}
			if (this.close) {
				this.$router.push(this.edit_history[0]);
			} else {
				this.$router.push(this.edit_history[this.edit_history.length-2]);
				this.$store.dispatch('POP_EDIT_HISTORY');
			}

		}
	}
});