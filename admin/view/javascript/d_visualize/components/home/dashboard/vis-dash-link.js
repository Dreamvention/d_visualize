Vue.component('vis-dash-link', {
	template: '#vis-dash-link',
	props: {
		thumbnail: {
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
		to: {
			type: String,
			default() {
				return 'dashboard';
			}
		},
		target: {
			type: String,
			default() {
				return '_blank';
			}
		},
		text: {
			type: String,
			default() {
				return '_blank';
			}
		},
	},
	computed: {},
	methods: {
		handleChange: function (e) {
		}
	}
});