Vue.component('d-switcher', {
    template: '#t-switcher',
    props: {
        name: {
            type: String,
            default() {
                return ''
            }
        },
        value: {
            type: String,
            default() {
                return ''
            }
        },
        size: {
            type: String,
            default() {
                return 'normal'
            }
        }
    },
    mounted: function () {
        var config_switch = {
            'onColor': 'success',
            'onText': this.$t('common.text_yes'),
            'offText': this.$t('common.text_no'),
        };
        if (this.size != 'mini') {
            config_switch.labelText = this.$t('common.text_enabled')
        }
        $(this.$vnode.elm).bootstrapSwitch(config_switch);
        $(this.$vnode.elm).on('switchChange.bootstrapSwitch', function (e, state) {
            this.$emit('change', {target: {name: this.name, value: state}})
        }.bind(this));
    },
    computed: {}
})