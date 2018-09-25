Vue.component('vz-edit-theme', {
	template: '#vz-edit-theme',
	computed: {
		setting: function () {
			return this.$store.getters.setting;
		},
		//currently loaded url on iframe vdh,vdf link change this src
		iframe_src() {
			return this.$store.getters.iframe_src;
		},
		// added history to know where vd start his iframe to get back
		iframe_history() {
			return this.$store.getters.iframe_history;
		},
		menu() {
			return this.$store.getters.menu;
		},
		components() {
			return this.$store.getters.components;
		},
	},
	methods: {
		iframeLoad(e) {
			this.$store.dispatch('PUSH_IFRAME_HISTORY', $.extend(true, {}, $('iframe')[0].contentWindow.location));
		},
		checkMenu(to, from) {
			if (to.path === '/edit') {
				this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT',
					[
						{href: '/edit/components', text: 'edit.entry_components'},
						{href: '/edit/vdh', text: 'edit.vdh'},
						{href: '/edit/vdf', text: 'edit.vdf'}
					]);
			}
			if (to.path === '/edit/vdh' || to.path === '/edit/vdh') {
				this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', []);
			}
			if (to.path === '/edit/components') {
				this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT',
					Object.keys(this.components).map((c)=>{
						return {href: '/edit/components/' + c, text: 'edit.entry_components_' + c};
					})
				);
			}
			if (to.matched.find(e=>{
				return e.path == '/edit/components/:id';
			})) {
				this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', []);
				this.$store.dispatch('CHANGE_CURRENT_COMPONENT', this.components[to.params.id]);
			}
		}
	},
	watch: {
		$route(to, from) {
			this.checkMenu(to, from);
		}
	},
	beforeMount() {
		this.checkMenu(this.$route);
		this.$store.dispatch('ENTER_EDIT');
	},
	beforeDestroy() {
		this.$store.dispatch('LEAVE_EDIT');
	}
});