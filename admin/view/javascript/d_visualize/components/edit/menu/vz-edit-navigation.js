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
            this.$store.dispatch('PUSH_NAVIGATION_HISTORY', path);
            this.$router.push(path);
        },
        checkMenu(to, from) {
            if (to.path === '/edit') {
                let navigation = [];
                navigation.push({href: '/edit/vdh', text: 'edit.vdh'});
                navigation = navigation.concat(Object.keys(this.components).map((c) => {
                        return {href: '/edit/components/' + c, text: 'edit.entry_' + c};
                    })
                );
                navigation.push({href: '/edit/vdf', text: 'edit.vdf'});
                this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', navigation);
            }
            if (to.path === '/edit/vdh' || to.path === '/edit/vdh') {
                this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', []);
            }

            if (to.matched.find(e => {
                return e.path === '/edit/components/:id';
            })) {
                this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', []);
                // this.$store.dispatch('CHANGE_CURRENT_COMPONENT', this.components[to.params.id]);
            }
        }
    },
    mounted() {
    }
});