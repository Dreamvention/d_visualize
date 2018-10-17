/**
 * Get cookie from request.
 *
 * @param  {Object} req
 * @param  {String} key
 * @return {String|undefined}
 * Retriew information from url which load from opencart
 * token= asjdfkasdf
 */
var URL = require('url-parse');
import _ from 'lodash';

export function getUrlOpencart(url, isDev) {
    if (!isDev) {
            url = url+ window.location.search;
    }
    var parsed_url = new URL(url);
    parsed_url.route = parsed_url.query.replace('?', '').split('&').find(
        c => c.trim().startsWith(`route=`)
    );
    parsed_url.user_token = parsed_url.query.replace('?', '').split('&').find(
        c => c.trim().startsWith(`user_token=`)
    );
    parsed_url.makeUrl = function () {
        parsed_url.query = 'route=' + parsed_url.route + '&' + parsed_url.user_token;
        if (isDev ) {
            return `${parsed_url.origin}${parsed_url.pathname}api/?${parsed_url.query}`;
        } else {
            return `${parsed_url.origin}${parsed_url.pathname}?${parsed_url.query}`;
        }
    };
    return parsed_url;
}

export function getDataOpencart(data, header) {
	let res = '';
	_.each(data, (val, key)=>{
		val = JSON.stringify(val);
		res += `${key}=${val}&`;
	});
	return res;
}

export function cookieFromRequest(req, key) {
    if (!req.headers.cookie) {
        return;
    }

    const cookie = req.headers.cookie.split(';').find(
        c => c.trim().startsWith(`${key}=`)
    );

    if (cookie) {
        return cookie.split('=')[1];
    }
}

/**
 * https://router.vuejs.org/en/advanced/scroll-behavior.html
 */
export function scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    }

    let position = {};

    if (to.matched.length < 2) {
        position = {x: 0, y: 0};
    } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
        position = {x: 0, y: 0};
    }
    if (to.hash) {
        position = {selector: to.hash};
    }

    return position;
}
