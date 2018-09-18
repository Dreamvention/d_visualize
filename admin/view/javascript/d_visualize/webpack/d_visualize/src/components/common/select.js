Vue.component('d-select', {
    template: '#t-select',
    props: {
        name: {
            type: String,
            default () {
                return ''
            }
        },
        value: {
            type: String,
            default () {
                return ''
            }
        },
        options: {
            type: Object,
            default () {
                return {}
            }
        },
        none: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    computed: {},
    methods: {
        handleChange: function(e){
            this.$emit('change', e);
        }
    }
})