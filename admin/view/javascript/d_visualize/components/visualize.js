Vue.component('visualize', {
	template: '#t-visualize',
	computed: {
		loading: function () {
			return this.$store.getters.loading;
		}
	},
	data() {
		return {
			last_action: Index.WAITING
		};
	},
	methods: {},
	updated() {},
	beforeUpdate() {
		if (this.last_action !== this.loading.status) { // change from one state to other
			if (this.loading.status === Index.LOADING) {
				setTimeout(()=>{
					this.$refs.topProgress.start();
				}, 100);
			} else if (this.loading.status === Index.WAITING ||this.loading.status === Index.SUCCESS) {
				setTimeout(()=>{
					this.$refs.topProgress.done();
				}, 200);
			} else if (this.loading.status === Index.FAIL) {
				setTimeout(()=>{
					this.$refs.topProgress.fail();
				}, 200);
			}
		}
		this.last_action = this.loading.status;
		// this.last_action = this.loading.status;
		// 	if (this.$refs.topProgress) {
		// 		this.$refs.topProgress.start();
		// 	}
		// } else {
		// 	if (this.$refs.topProgress) {
		// 		this.$refs.topProgress.done();
		// 	}
		// }
	}
});