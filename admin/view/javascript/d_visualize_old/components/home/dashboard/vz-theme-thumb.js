Vue.component('vz-theme-thumb', {
    template: '#vz-theme-thumb',
    props: {
        item: {
            type: Object,
            default() {
                return {
                    img: this.$o('img.no_image'),
                    setting: '',
                    source: '',
                };
            }
        },
    },
    computed: {
        activeThumb: function () {
            return this.item.setting.codename == this.$store.getters.setting.active_template;
        },
    },
    methods: {
        handleChange: function (e) {
            this.$store.dispatch('CHANGE_TEMPLATE', e.currentTarget.attributes.index);
        }
    }
});