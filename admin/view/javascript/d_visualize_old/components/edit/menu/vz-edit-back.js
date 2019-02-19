Vue.component('vz-edit-back', {
    template: '#vz-edit-back',
    computed: {
        close() {
            return this.$store.getters.route.path === '/edit';
        },
        vd_layout() {
            return this.$store.getters.route.path === '/edit/vdh' || this.$store.getters.route.path === '/edit/vdf';
        },
        history() {
            return this.$store.getters.menu.navigation_history;
        }
    },
    methods: {
        back(e) {
            if (this.vd_layout) {
                this.$store.dispatch('LEAVE_VISUAL');
            }
            let history_url = this.history.pop();
            if (!history_url || this.close) {
                this.$router.push('/');
            } else {
                this.$router.push(history_url.path);
            }
        }
    }
});