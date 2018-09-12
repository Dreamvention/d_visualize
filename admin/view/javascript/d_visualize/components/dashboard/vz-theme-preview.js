Vue.component('vz-theme-preview', {
    template: '#vz-theme-preview',
    computed: {
        active_template_preview() {
            let prew = _.find(this.available_templates, (v) => {
                return this.active_template === v.codename;
            })
            return !prew ? {img: ''} : prew;
        },
        available_templates() {
            return this.$store.getters.available_templates;
        },
        active_template() {
            return this.$store.getters.active_template;
        },
        switch_text() {
            return this.$store.getters.status ?  this.$t('common.entry_deactivate'):this.$t('common.entry_activate') ;
        },
    },
    methods: {
        handleChange: function (e) {
        },
        popup: function (e) {
        },
        change_status: function () {
            this.$store.dispatch('CHANGE_STATUS');
        },

    }
});