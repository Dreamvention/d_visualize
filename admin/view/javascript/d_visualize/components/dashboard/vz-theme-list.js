Vue.component('vz-theme-list', {
    template: '#vz-theme-list',
    computed: {
        templates() {
            return this.$store.getters.templates;
        },
    },
    methods: {
        handleChange: function (e) {
        },
        popup: function (e) {
        },
    }
});