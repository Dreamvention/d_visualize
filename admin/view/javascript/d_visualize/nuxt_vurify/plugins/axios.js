import {getUrlOpencart} from '~/utils';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default ({$axios, store}) => {
    if (process.server) {
        return;
    }
    // Request interceptor
    $axios.interceptors.request.use(request => {
        if (!process.env.isDev){
            request.baseURL = window.location.origin + window.location.pathname
        }
        let url = getUrlOpencart(request.baseURL,process.env.isDev);
        url.route = request.url;
        /* DEV only on 302 */
        if (process.env.isDev){
            url.user_token = 'user_token=' + process.env.user_token;
        }
        request.baseURL = url.makeUrl();
        request.url = '';
        return request;
    });
}
