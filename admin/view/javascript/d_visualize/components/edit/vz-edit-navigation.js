Vue.component('vz-edit-navigation', {
    template: '#vz-edit-navigation',
    computed: {
        menu() {
            return this.$store.getters.menu;
        },
    },
    data() {
        return {items: [1, 2, 3, 4, 5, 6, 7, 8, 9]};
    },
    methods: {
        to(path) {
            this.$store.dispatch('PUSH_EDIT_HISTORY', path);
            this.$router.push(path);
        },
        shuffle: function () {
            this.items = _.shuffle(this.items)
        }
    },
    mounted() {
    }
});