Vue.component('vz-theme-thumb', {
    template: '#vz-theme-thumb',
    props: {
        item: {
            type: Object,
            default() {
                return {
                    img: this.$o('img.no_image'),
                    title: 'default',
                    description: 'default',
                    codename: 'default',
                };
            }
        },
    },
    computed: {
        activeThumb: function () {
            return this.item.codename == this.$store.getters.active_template;
        },
    },
    methods: {

        handleChange: function (e) {
            this.$store.dispatch('CHANGE_TEMPLATE', e.currentTarget.attributes.index);
        }
    }
});