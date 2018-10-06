Vue.component('vz-edit-navigation', {
    template: '#vz-edit-navigation',
    computed: {
        menu() {
            return this.$store.getters.menu;
        },
    },
    data() {
        return {items: []};
    },

    methods: {
        to(path) {
            this.$store.dispatch('PUSH_NAVIGATION_HISTORY', this.$store.getters.route);
            this.$router.push(path);
        },
    },
    mounted() {
    }
});