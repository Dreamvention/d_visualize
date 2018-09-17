Vue.component('vz-theme-preview', {
    template: '#vz-theme-preview',
    computed: {
        active_template() {
            return this.$store.getters.active_template;
        },
        switch_text() {
            return this.$store.getters.status ?  this.$t('common.entry_deactivate'):this.$t('common.entry_activate') ;
        },
    },
    methods: {
        popup: function (e) {
        },
        change_status: function () {
            this.$store.dispatch('CHANGE_STATUS');
        },

    }
});