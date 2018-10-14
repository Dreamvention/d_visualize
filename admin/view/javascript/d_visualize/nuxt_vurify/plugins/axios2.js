import {getUrlOpencart} from '~/utils';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default ({$axios, store, redirect}) => {
    if (process.server) {
        return;
    }
    console.log('ass')
    // Request interceptor
    $axios.onRequest(request => {
        console.log('req start')
        // store.commit('load/LOADING_START')
        if (!process.env.isDev) {
            request.baseURL = window.location.origin + window.location.pathname
        }
        let url = getUrlOpencart(request.baseURL, process.env.isDev);
        url.route = request.url;
        if (process.env.isDev) {
            url.user_token = process.env.user_token;
        }
        request.baseURL = url.makeUrl();
        request.url = '';
        console.log(request.baseURL)
        return request;
    });
    $axios.onResponse(response => {
        console.log('resp end')
        // store.commit('load/LOADING_END');
    });
    $axios.onRequestError(err => {
        if (err) {
            console.log('error on request')
            // store.commit('error.onRequest',err)
        }
    });
    $axios.onResponseError(err => {
        store.commit('load/LOADING_FAIL');
        if (err.code === 500) {
            console.log('error on response')
            // store.commit('error/onResponse', err)
        }
    });

}
