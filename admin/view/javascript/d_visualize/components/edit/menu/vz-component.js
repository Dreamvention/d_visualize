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
        availableComponents() {
            return this.$store.getters.available_components;
        },
        componentKey() {
            if (!this.component.skin) {
                console.log(this.component)
            }
            let skin = this.availableComponents[this.componentId][this.component.skin] ? this.component.skin : 'default'
            let active_template_codename = this.$store.getters.active_template.setting.active_skin;
            return skin;
            // if (this.component.skin === active_template_codename) {
            // 	return this.component.skin;
            // } else {
            // 	return active_template_codename;
            // }
        },
        hasComponentKey() {
            return _.contains(this.componentKey, this.templateVariations);
        },
        templateVariations() {
            let variations = _.keys(this.availableComponents[this.componentId]);
            return variations
            // return _.reject(variations, (k)=>{
            // 	return k == this.$store.getters.active_template.setting.active_skin;
            // });
        },
    },
    methods: {
        update(e, options) {
            // no need to update if there no available component exist.
            // at this case set default skin because it have to be
            let skin = this.availableComponents[this.componentId][options.value] ? options.value : 'default'
            this.$store.dispatch('UPDATE_COMPONENT', {
                active_template_id: this.$store.getters.setting.active_template,
                component_id: this.componentId,
                component_skin: skin
            })

        }
    },
});