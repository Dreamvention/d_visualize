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
		iframe_history(){
			return this.$store.getters.iframe_history;
		}
	},
	methods: {
		iframeLoad(e) {
			this.iframe_history.push($.extend(true,{},$('iframe')[0].contentWindow.location))
		}
	},
	beforeMount() {
		this.$store.dispatch('ENTER_EDIT');
	},
	beforeDestroy() {
		this.$store.dispatch('LEAVE_EDIT');
	}
});