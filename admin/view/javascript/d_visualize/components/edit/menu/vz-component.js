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
			if (this.component.skin === active_template_codename) {
				return this.component.skin;
			} else {
				return active_template_codename;
			}
		},
		hasComponentKey() {
			return _.contains(this.componentKey, this.templateVariations);
		},
		templateVariations() {
			let variations = _.keys(this.available_components[this.componentId]);
			return _.reject(variations, (k)=>{
				return k == this.componentKey;
			});
		},
	},
	methods: {
		update(e, options) {
			this.$store.dispatch('UPDATE_COMPONENT', {
				active_template_id: this.$store.getters.setting.active_template,
				component_id: this.componentId,
				component_skin: options.value
			});
			// this.$store.dispatch('UPDATE_COMPONENT_CURRENT', {});
		}
	},
	beforeMount() {
		if (this.$store.getters.components[this.componentId])
			this.$store.dispatch('CHANGE_CURRENT_COMPONENT', this.$store.getters.components[this.componentId]);
	}
});