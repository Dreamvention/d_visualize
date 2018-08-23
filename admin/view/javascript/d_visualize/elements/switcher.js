Vue.component('d-switcher', {
	template: '#t-switcher',
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
		}
	},
	mounted: function(){
		$(this.$vnode.elm).bootstrapSwitch({
			'onColor': 'success',
			'onText': this.$t('common.text_yes'),
			'offText': this.$t('common.text_no'),
			'labelText': this.$t('common.text_enabled')
		});
		$(this.$vnode.elm).on('switchChange.bootstrapSwitch', function(e, state) {
			this.$emit('change', {target: {name: this.name, value: state}})
		}.bind(this));
	},
	computed: {}
})