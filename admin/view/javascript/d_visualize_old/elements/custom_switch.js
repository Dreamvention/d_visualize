Vue.component('custom_switch', {
    template: '#t-custom_switch',
    props: {
        value: {
            type: String,
            default() {
                return true;
            }
        },
        icon: {
            type: String,
            default() {
                return 'fa-calendar'
            }
        },
        help_toggle: {
            type: String,
            default() {
                return 'help'
            }
        }
    },
    methods: {
        click: function(e){
            this.$emit('click', e);
        }
    }
,
})