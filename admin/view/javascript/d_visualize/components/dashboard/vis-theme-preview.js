Vue.component('vis-theme-preview', {
	template: '#vis-theme-preview',
	computed: {
		active_template_preview() {
			let prew =  _.find(this.available_templates,(v)=>{
				return this.active_template===v.codename;
			})
			return !prew?{img:''}:prew;
		},
		available_templates() {
			return this.$store.getters.available_templates;
		},
		active_template() {
			return this.$store.getters.active_template;
		},
	},
	methods: {
		handleChange: function (e) {
		},
		popup: function (e) {
		},
	}
});