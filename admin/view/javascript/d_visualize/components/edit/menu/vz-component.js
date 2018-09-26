Vue.component('vz-component', {
	template: '#vz-component',
	computed: {
		component() {
			return this.$store.getters.component;
		},
		componentId() {
			return this.$store.state.route.params.id;
		},
		componentName() {
			return this.$t('edit.entry_' + this.$store.state.route.params.id);
		},
		available_components() {
			return this.$store.getters.available_components;
		},
		componentKey() {
			let active_template_codename = this.$store.getters.active_template.setting.active_skin;
			if (this.component.skin) {
				return this.component.skin;
			} else {
				return active_template_codename;
			}
		},
		templateVariations() {
			console.log(this.available_components)
			return _.keys(this.available_components[this.componentId]);
		},
	},
	methods: {
		update(e, options) {
			this.$store.commit('UPDATE_COMPONENT', {
				active_template_id: this.$store.getters.setting.active_template,
				component_id: this.componentId,
				component_skin: options.value
			});

		}
	},
	beforeMount() {
		if (this.$store.getters.components[this.componentId])
			this.$store.dispatch('CHANGE_CURRENT_COMPONENT', this.$store.getters.components[this.componentId]);
	}
});