Vue.component('visualize', {
	template: '#t-visualize',
	data: function () {
		return {
			message: '15px',
			classes: 'xx    ',
		};
	},
	computed: {
		moder: function () {
			if (this.message == '12px') {
				return 'moders';
			} else {
				return 'moders2';

			}
		},
	},
	methods: {
		createElement: function () {
		}
	}
});