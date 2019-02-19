Vue.component('vz-theme-preview', {
    template: '#vz-theme-preview',
    computed: {
        active_template() {
            return this.$store.getters.active_template;
        },
        status() {
            return this.$store.getters.status;
        },
    },
    data() {
        return {
            show_actions: false
        }
    },
    methods: {
        popup: function (e) {
        },
        change_status: function () {
            this.$store.dispatch('CHANGE_STATUS');
        },

    }
});