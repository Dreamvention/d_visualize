Vue.component('vz-theme-list', {
    template: '#vz-theme-list',
    computed: {
        templates() {
            return this.$store.getters.available_templates;
        },
    },
    methods: {
        handleChange: function (e) {
        },
        popup: function (e) {
        },
    }
});