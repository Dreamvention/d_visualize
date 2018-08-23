Vue.component('template-thumb', {
	template: '#t-template-thumb',
	props: {
		item: {
			type: Object,
			default() {
				return {
					img: '../image/no_image.png',
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
			console.log(e.currentTarget.attributes.index)
			this.$store.dispatch('CHANGE_TEMPLATE',e.currentTarget.attributes);

		}
	}
});