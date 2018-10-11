import {getUrlOpencart} from '~/utils';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default ({$axios, store})=>{
	if (process.server) {
		return;
	}
		// Request interceptor
		$axios.interceptors.request.use(request=>{
			console.log(request)
			// request.baseURL =request.baseURL + process.env.appUrl ? process.env.appUrl : window.location.href;
			// // request.headers.common['Access-Control-Allow-Origin'] = '*';
			// if (store.getters['auth/admin_url']) {
			// 	request.baseURL = store.getters['auth/admin_url'];
			// 	console.log(request.baseURL);
			// }
			// let url = getUrlOpencart(request.baseURL);
			// url.route = request.url;
			// request.baseURL = url.makeUrl();
			// request.url = '';
			// // request.headers.common['Cookies'] = `OCSESSID=${store.getters['auth/OCSESSID']}`;
			// console.log(request.baseURL)
			// const token = store.getters['auth/token'];
			// if (token) {
			// 	request.headers.common['Authorization'] = `Bearer ${token}`;
			// }
			//
			// const locale = store.getters['lang/locale'];
			// if (locale) {
			// 	request.headers.common['Accept-Language'] = locale;
			// }
			// console.log(request);
			return request;
		});

	// Response interceptor
	// $axios.interceptors.response.use(response => response, error => {
	//   console.log('error')
	//   // const { status } = error.response || {}
	//
	//   // if (status >= 500) {
	//   //   swal({
	//   //     type: 'error',
	//   //     title: app.i18n.t('error_alert_title'),
	//   //     text: app.i18n.t('error_alert_text'),
	//   //     reverseButtons: true,
	//   //     confirmButtonText: app.i18n.t('ok'),
	//   //     cancelButtonText: app.i18n.t('cancel')
	//   //   })
	//   // }
	//
	//   // if (status === 401 && store.getters['auth/check']) {
	//   //   swal({
	//   //     type: 'warning',
	//   //     title: app.i18n.t('token_expired_alert_title'),
	//   //     text: app.i18n.t('token_expired_alert_text'),
	//   //     reverseButtons: true,
	//   //     confirmButtonText: app.i18n.t('ok'),
	//   //     cancelButtonText: app.i18n.t('cancel')
	//   //   }).then(() => {
	//   //     store.commit('auth/LOGOUT')
	//   //
	//   //     redirect({ name: 'login' })
	//   //   })
	//   // }
	//
	//   return Promise.reject(error)
	// })
}
