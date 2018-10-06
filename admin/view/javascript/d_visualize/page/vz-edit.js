Vue.component('vz-edit', {
    template: '#vz-edit',
    computed: {
        menu() {
            return this.$store.getters.menu;
        },
        route_class() {
            if (this.$store.getters.route.params.id) {
                return this.$store.getters.route.path
                    .replace(this.$store.getters.route.params.id, '')
                    .replace(/\//g, '-')
                    .slice(0, -1)
                    .slice(1, -1)
            }
        }
    },
    beforeMount() {
        // this.checkMenu(this.$route);
        this.$store.dispatch('ENTER_EDIT');
        this.$store.dispatch('LOADING_START');
    },
    mounted() {
        this.$store.dispatch('LOADING_END');
    },
    beforeDestroy() {
        this.$store.dispatch('LEAVE_EDIT');
        this.$store.dispatch('LOADING_END');
    }
});