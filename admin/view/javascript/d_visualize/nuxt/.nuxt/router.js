import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _49250e73 = () => import('..\\pages\\welcome.vue' /* webpackChunkName: "pages_welcome" */).then(m => m.default || m)
const _4aad2c2a = () => import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */).then(m => m.default || m)
const _03521f60 = () => import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages_settings_index" */).then(m => m.default || m)
const _fa960206 = () => import('..\\pages\\settings\\password.vue' /* webpackChunkName: "pages_settings_password" */).then(m => m.default || m)
const _42cf616c = () => import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages_auth_register" */).then(m => m.default || m)
const _16b7df5c = () => import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages_auth_login" */).then(m => m.default || m)
const _70bfd737 = () => import('..\\pages\\settings\\profile.vue' /* webpackChunkName: "pages_settings_profile" */).then(m => m.default || m)
const _5776d66c = () => import('..\\pages\\auth\\password\\email.vue' /* webpackChunkName: "pages_auth_password_email" */).then(m => m.default || m)
const _62fb5606 = () => import('..\\pages\\auth\\password\\reset.vue' /* webpackChunkName: "pages_auth_password_reset" */).then(m => m.default || m)
const _10e06e23 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'hash',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/welcome",
			component: _49250e73,
			name: "welcome"
		},
		{
			path: "/inspire",
			component: _4aad2c2a,
			name: "inspire"
		},
		{
			path: "/settings",
			component: _03521f60,
			name: "settings"
		},
		{
			path: "/settings/password",
			component: _fa960206,
			name: "settings-password"
		},
		{
			path: "/auth/register",
			component: _42cf616c,
			name: "auth-register"
		},
		{
			path: "/auth/login",
			component: _16b7df5c,
			name: "auth-login"
		},
		{
			path: "/settings/profile",
			component: _70bfd737,
			name: "settings-profile"
		},
		{
			path: "/auth/password/email",
			component: _5776d66c,
			name: "auth-password-email"
		},
		{
			path: "/auth/password/reset",
			component: _62fb5606,
			name: "auth-password-reset"
		},
		{
			path: "/",
			component: _10e06e23,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
