Vue.component('vz-component', {
	template: '#vz-component',
	computed: {
		component: {
			get() {
				return this.$store.getters.component;
			}
		},
		componentTemplate: {
			get() {
				return this.$store.getters.component.template;
			},
			set(value) {
				console.log(value);
			}
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
		templateVariations() {
			if (this.component) {
				return _.map(this.available_components[this.componentId], (c, c_key)=>{
					return {key: c_key, template: c.template};
				});
			}
		},
		stylesheetVariations() {
			if (this.component) {
				return _.map(this.available_components[this.componentId], (c, c_key)=>{
					return {key: c_key, stylesheet: c.stylesheet};
				});
			}
		},
	},
	methods: {
		updateMessage(e) {
			console.log(e);
			// this.$store.commit('updateMessage', e.target.value)
		},
		chageTemplate(e) {
			console.log($(e.target).val());
		},
		update(e, options) {
			console.log($(options.data.component))
			var new_component = $.extend(true, {}, this.component, options.data.component);
			console.log(new_component.stylesheet)
			this.$store.commit('UPDATE_COMPONENT', {
				active_template_id: this.$store.getters.setting.active_template,
				component_id: this.componentId,
				component: new_component
			});

		}
	}
});