import Vue from 'vue';
var VueTruncate = require('vue-truncate-filter')

// import moment from 'moment';
export default ({$moment})=>{

	Vue.use(VueTruncate)

	Vue.filter('image', function (value) {
		if (!value) return '';
		value = value.toString();
		if (process.env.isDev) {
			return process.env.DevServer + 'view/image/d_visualize/' + value;
		} else {
			return 'view/image/d_visualize/' + value;
		}
	});
		Vue.filter('formatDate', function (value) {
			if (value) {
				return $moment(String(value)).format('MMMM Do, h:mm:ss a');
			}
		});
	Vue.filter('decode', function (html) {
		let decoder = document.createElement('div')
		decoder.innerHTML = html;
		return decoder.textContent
	});
}
