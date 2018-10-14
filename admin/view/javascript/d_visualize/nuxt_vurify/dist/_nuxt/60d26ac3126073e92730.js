(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOAD; });
var LOAD = {
  LOADING: 'loading',
  WAITING: 'waiting',
  SUCCESS: 'success',
  FAIL: 'fail'
};
var COMPONENT_SETTINGS = {
  TYPE_CHECKBOX: 'checkbox',
  TYPE_SELECT: 'select'
};
var ACTION = {
  LOAD_STATE: 'loadState'
};

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getUrlOpencart; });
/* unused harmony export cookieFromRequest */
/* unused harmony export scrollBehavior */
/* harmony import */ var core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(299);
/* harmony import */ var core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_starts_with__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63);
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_regexp_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(88);
/* harmony import */ var core_js_modules_es6_regexp_search__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_search__WEBPACK_IMPORTED_MODULE_4__);






/**
 * Get cookie from request.
 *
 * @param  {Object} req
 * @param  {String} key
 * @return {String|undefined}
 * Retriew information from url which load from opencart
 * token= asjdfkasdf
 */
var URL = __webpack_require__(300);

function getUrlOpencart(url, isDev) {
  if (!isDev) {
    url = url + window.location.search;
  }

  var parsed_url = new URL(url);
  parsed_url.route = parsed_url.query.replace('?', '').split('&').find(function (c) {
    return c.trim().startsWith("route=");
  });
  parsed_url.user_token = parsed_url.query.replace('?', '').split('&').find(function (c) {
    return c.trim().startsWith("user_token=");
  });

  parsed_url.makeUrl = function () {
    parsed_url.query = 'route=' + parsed_url.route + '&' + parsed_url.user_token;

    if (isDev) {
      return "".concat(parsed_url.origin).concat(parsed_url.pathname, "api/?").concat(parsed_url.query);
    } else {
      return "".concat(parsed_url.origin).concat(parsed_url.pathname, "?").concat(parsed_url.query);
    }
  };

  return parsed_url;
}
function cookieFromRequest(req, key) {
  if (!req.headers.cookie) {
    return;
  }

  var cookie = req.headers.cookie.split(';').find(function (c) {
    return c.trim().startsWith("".concat(key, "="));
  });

  if (cookie) {
    return cookie.split('=')[1];
  }
}
/**
 * https://router.vuejs.org/en/advanced/scroll-behavior.html
 */

function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }

  var position = {};

  if (to.matched.length < 2) {
    position = {
      x: 0,
      y: 0
    };
  } else if (to.matched.some(function (r) {
    return r.components.default.options.scrollToTop;
  })) {
    position = {
      x: 0,
      y: 0
    };
  }

  if (to.hash) {
    position = {
      selector: to.hash
    };
  }

  return position;
}

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(304);


/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./locale.js": 258
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 257;

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

// import { loadMessages } from '~/plugins/i18n'
//
// export default async ({ store ,$axios}) => {
//   if (process.server) {
//     const locale = store.getters['lang/locale']
//     if (locale) {
//       $axios.defaults.headers.common['Accept-Language'] = locale
//     }
//   }
//
//   await loadMessages(store.getters['lang/locale'])
// }

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemePreview_vue_vue_type_style_index_0_id_6137c810_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemePreview_vue_vue_type_style_index_0_id_6137c810_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemePreview_vue_vue_type_style_index_0_id_6137c810_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemePreview_vue_vue_type_style_index_0_id_6137c810_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./auth.js": 273,
	"./index.js": 274,
	"./lang.js": 275,
	"./load.js": 276,
	"./opencart.js": 277,
	"./setting.js": 279,
	"./template.js": 280
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 272;

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
// state
var state = function state() {
  return {};
}; // getters

var getters = {}; // mutations

var mutations = {}; // actions

var actions = {};

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);


var actions = {
  nuxtClientInit: function () {
    var _nuxtClientInit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var dispatch, commit;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref.dispatch, commit = _ref.commit;
              commit('load/LOADING_START');
              _context.next = 4;
              return dispatch('opencart/GET_OPDATA');

            case 4:
              _context.next = 6;
              return dispatch('setting/GET_SETTING');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function nuxtClientInit(_x) {
      return _nuxtClientInit.apply(this, arguments);
    };
  }()
};

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
// state
var state = function state() {
  return {
    locale: 'en'
  };
}; // getters

var getters = {
  locale: function locale(state) {
    return state.locale;
  }
}; // mutations

var mutations = {}; // actions

var actions = {};

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);

 // state

var state = function state() {
  return {
    loading: {
      status: _constants__WEBPACK_IMPORTED_MODULE_0__[/* LOAD */ "a"].WAITING,
      on_progress: false,
      content_loaded: false,
      loader_stack: 0
    }
  };
}; // getters

var getters = {
  loading: function loading(state) {
    return state.loading;
  }
}; // mutations

var mutations = {
  LOADING_START: function LOADING_START(state, payload) {
    vue__WEBPACK_IMPORTED_MODULE_1__["default"].set(state, 'loading', $.extend({}, state.loading, {
      status: _constants__WEBPACK_IMPORTED_MODULE_0__[/* LOAD */ "a"].LOADING,
      on_progress: true,
      loader_stack: state.loading.loader_stack + 1
    }));
  },
  LOADING_END: function LOADING_END(state, payload) {
    if (state.loading.loader_stack > 0) {
      // set only when some one set start stack
      var loading = $.extend({}, state.loading, {
        on_progress: false,
        content_loaded: true,
        loader_stack: state.loading.loader_stack - 1
      });

      if (loading.loader_stack === 0) {
        //wait queue of loading
        loading.status = _constants__WEBPACK_IMPORTED_MODULE_0__[/* LOAD */ "a"].WAITING;
      } else {
        loading.status = _constants__WEBPACK_IMPORTED_MODULE_0__[/* LOAD */ "a"].LOADING;
      }

      vue__WEBPACK_IMPORTED_MODULE_1__["default"].set(state, 'loading', loading);
    }
  },
  LOADING_SUCCESS: function LOADING_SUCCESS(state, payload) {
    vue__WEBPACK_IMPORTED_MODULE_1__["default"].set(state, 'loading', $.extend({}, state.loading, {
      status: _constants__WEBPACK_IMPORTED_MODULE_0__[/* LOAD */ "a"].SUCCESS,
      on_progress: false,
      content_loaded: true
    }));
  },
  LOADING_FAIL: function LOADING_FAIL(state, payload) {
    vue__WEBPACK_IMPORTED_MODULE_1__["default"].set(state, 'loading', $.extend({}, state.loading, {
      status: _constants__WEBPACK_IMPORTED_MODULE_0__[/* LOAD */ "a"].FAIL,
      on_progress: false,
      content_loaded: false
    }));
  }
}; // actions

var actions = {};

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(278);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);


// state

var state = function state() {
  return {
    opData: {
      title: false,
      header: false,
      footer: false,
      base_url: null
    }
  };
}; // getters

var getters = {
  opData: function opData(state) {
    return state.opData;
  }
}; // mutations

var mutations = {
  SET_OP_DATA: function SET_OP_DATA(state, opData) {
    state.opData = opData;
  }
}; // actions

var actions = {
  GET_OPDATA: function () {
    var _GET_OPDATA = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var commit, _ref2, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return this.$axios.get('extension/d_visualize/opencart');

            case 3:
              _ref2 = _context.sent;
              data = _ref2.data;
              commit('SET_OP_DATA', data);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function GET_OPDATA(_x) {
      return _GET_OPDATA.apply(this, arguments);
    };
  }()
};

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);


// state
var state = function state() {
  return {
    all_setting: null,
    status: null
  };
}; // getters

var getters = {
  all_setting: function all_setting(state) {
    return state.all_setting;
  },
  status: function status(state) {
    return state.status;
  }
}; // mutations

var mutations = {
  SET_SETTING: function SET_SETTING(state, payload) {
    state.all_setting = payload;
  },
  SET_STATUS: function SET_STATUS(state, payload) {
    state.status = payload;
  }
}; // actions

var actions = {
  GET_SETTING: function () {
    var _GET_SETTING = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var commit, _ref2, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return this.$axios.get('extension/d_visualize/setting');

            case 3:
              _ref2 = _context.sent;
              data = _ref2.data;
              commit('SET_SETTING', data.setting);
              commit('SET_STATUS', data.status);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function GET_SETTING(_x) {
      return _GET_SETTING.apply(this, arguments);
    };
  }()
};

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "state", function() { return state; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);


// state
var state = function state() {
  return {
    templates: null
  };
}; // getters

var getters = {
  templates: function templates(state) {
    return state.templates;
  },
  active_template: function active_template(state, getters, rootState, rootGetters) {
    //for some reasons nuxt make a call if there is rootState which is needed
    if (rootState.setting.all_setting) {
      return getters.templates[rootState.setting.all_setting.active_template];
    }
  }
}; // mutations

var mutations = {
  SET_TEMPLATES: function SET_TEMPLATES(state, payload) {
    state.templates = payload;
  }
}; // actions

var actions = {
  GET_TEMPLATES: function () {
    var _GET_TEMPLATES = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var commit, _ref2, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return this.$axios.get('extension/d_visualize/template/all');

            case 3:
              _ref2 = _context.sent;
              data = _ref2.data;
              commit('SET_TEMPLATES', data);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function GET_TEMPLATES(_x) {
      return _GET_TEMPLATES.apply(this, arguments);
    };
  }()
};

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 97,
	"./af.js": 97,
	"./ar": 98,
	"./ar-dz": 99,
	"./ar-dz.js": 99,
	"./ar-kw": 100,
	"./ar-kw.js": 100,
	"./ar-ly": 101,
	"./ar-ly.js": 101,
	"./ar-ma": 102,
	"./ar-ma.js": 102,
	"./ar-sa": 103,
	"./ar-sa.js": 103,
	"./ar-tn": 104,
	"./ar-tn.js": 104,
	"./ar.js": 98,
	"./az": 105,
	"./az.js": 105,
	"./be": 106,
	"./be.js": 106,
	"./bg": 107,
	"./bg.js": 107,
	"./bm": 108,
	"./bm.js": 108,
	"./bn": 109,
	"./bn.js": 109,
	"./bo": 110,
	"./bo.js": 110,
	"./br": 111,
	"./br.js": 111,
	"./bs": 112,
	"./bs.js": 112,
	"./ca": 113,
	"./ca.js": 113,
	"./cs": 114,
	"./cs.js": 114,
	"./cv": 115,
	"./cv.js": 115,
	"./cy": 116,
	"./cy.js": 116,
	"./da": 117,
	"./da.js": 117,
	"./de": 118,
	"./de-at": 119,
	"./de-at.js": 119,
	"./de-ch": 120,
	"./de-ch.js": 120,
	"./de.js": 118,
	"./dv": 121,
	"./dv.js": 121,
	"./el": 122,
	"./el.js": 122,
	"./en-au": 123,
	"./en-au.js": 123,
	"./en-ca": 124,
	"./en-ca.js": 124,
	"./en-gb": 125,
	"./en-gb.js": 125,
	"./en-ie": 126,
	"./en-ie.js": 126,
	"./en-il": 127,
	"./en-il.js": 127,
	"./en-nz": 128,
	"./en-nz.js": 128,
	"./eo": 129,
	"./eo.js": 129,
	"./es": 130,
	"./es-do": 131,
	"./es-do.js": 131,
	"./es-us": 132,
	"./es-us.js": 132,
	"./es.js": 130,
	"./et": 133,
	"./et.js": 133,
	"./eu": 134,
	"./eu.js": 134,
	"./fa": 135,
	"./fa.js": 135,
	"./fi": 136,
	"./fi.js": 136,
	"./fo": 137,
	"./fo.js": 137,
	"./fr": 138,
	"./fr-ca": 139,
	"./fr-ca.js": 139,
	"./fr-ch": 140,
	"./fr-ch.js": 140,
	"./fr.js": 138,
	"./fy": 141,
	"./fy.js": 141,
	"./gd": 142,
	"./gd.js": 142,
	"./gl": 143,
	"./gl.js": 143,
	"./gom-latn": 144,
	"./gom-latn.js": 144,
	"./gu": 145,
	"./gu.js": 145,
	"./he": 146,
	"./he.js": 146,
	"./hi": 147,
	"./hi.js": 147,
	"./hr": 148,
	"./hr.js": 148,
	"./hu": 149,
	"./hu.js": 149,
	"./hy-am": 150,
	"./hy-am.js": 150,
	"./id": 151,
	"./id.js": 151,
	"./is": 152,
	"./is.js": 152,
	"./it": 153,
	"./it.js": 153,
	"./ja": 154,
	"./ja.js": 154,
	"./jv": 155,
	"./jv.js": 155,
	"./ka": 156,
	"./ka.js": 156,
	"./kk": 157,
	"./kk.js": 157,
	"./km": 158,
	"./km.js": 158,
	"./kn": 159,
	"./kn.js": 159,
	"./ko": 160,
	"./ko.js": 160,
	"./ky": 161,
	"./ky.js": 161,
	"./lb": 162,
	"./lb.js": 162,
	"./lo": 163,
	"./lo.js": 163,
	"./lt": 164,
	"./lt.js": 164,
	"./lv": 165,
	"./lv.js": 165,
	"./me": 166,
	"./me.js": 166,
	"./mi": 167,
	"./mi.js": 167,
	"./mk": 168,
	"./mk.js": 168,
	"./ml": 169,
	"./ml.js": 169,
	"./mn": 170,
	"./mn.js": 170,
	"./mr": 171,
	"./mr.js": 171,
	"./ms": 172,
	"./ms-my": 173,
	"./ms-my.js": 173,
	"./ms.js": 172,
	"./mt": 174,
	"./mt.js": 174,
	"./my": 175,
	"./my.js": 175,
	"./nb": 176,
	"./nb.js": 176,
	"./ne": 177,
	"./ne.js": 177,
	"./nl": 178,
	"./nl-be": 179,
	"./nl-be.js": 179,
	"./nl.js": 178,
	"./nn": 180,
	"./nn.js": 180,
	"./pa-in": 181,
	"./pa-in.js": 181,
	"./pl": 182,
	"./pl.js": 182,
	"./pt": 183,
	"./pt-br": 184,
	"./pt-br.js": 184,
	"./pt.js": 183,
	"./ro": 185,
	"./ro.js": 185,
	"./ru": 186,
	"./ru.js": 186,
	"./sd": 187,
	"./sd.js": 187,
	"./se": 188,
	"./se.js": 188,
	"./si": 189,
	"./si.js": 189,
	"./sk": 190,
	"./sk.js": 190,
	"./sl": 191,
	"./sl.js": 191,
	"./sq": 192,
	"./sq.js": 192,
	"./sr": 193,
	"./sr-cyrl": 194,
	"./sr-cyrl.js": 194,
	"./sr.js": 193,
	"./ss": 195,
	"./ss.js": 195,
	"./sv": 196,
	"./sv.js": 196,
	"./sw": 197,
	"./sw.js": 197,
	"./ta": 198,
	"./ta.js": 198,
	"./te": 199,
	"./te.js": 199,
	"./tet": 200,
	"./tet.js": 200,
	"./tg": 201,
	"./tg.js": 201,
	"./th": 202,
	"./th.js": 202,
	"./tl-ph": 203,
	"./tl-ph.js": 203,
	"./tlh": 204,
	"./tlh.js": 204,
	"./tr": 205,
	"./tr.js": 205,
	"./tzl": 206,
	"./tzl.js": 206,
	"./tzm": 207,
	"./tzm-latn": 208,
	"./tzm-latn.js": 208,
	"./tzm.js": 207,
	"./ug-cn": 209,
	"./ug-cn.js": 209,
	"./uk": 210,
	"./uk.js": 210,
	"./ur": 211,
	"./ur.js": 211,
	"./uz": 212,
	"./uz-latn": 213,
	"./uz-latn.js": 213,
	"./uz.js": 212,
	"./vi": 214,
	"./vi.js": 214,
	"./x-pseudo": 215,
	"./x-pseudo.js": 215,
	"./yo": 216,
	"./yo.js": 216,
	"./zh-cn": 217,
	"./zh-cn.js": 217,
	"./zh-hk": 218,
	"./zh-hk.js": 218,
	"./zh-tw": 219,
	"./zh-tw.js": 219
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 303;

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__(57);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(20);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__(237);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(2);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__(80);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.date.to-string.js
var es6_date_to_string = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__(242);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__(254);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__(45);

// CONCATENATED MODULE: ./.nuxt/middleware.js





var files = __webpack_require__(257);

var filenames = files.keys();

function getModule(filename) {
  var file = files(filename);
  return file.default ? file.default : file;
}

var middleware = {}; // Generate the middleware

var middleware_iteratorNormalCompletion = true;
var middleware_didIteratorError = false;
var middleware_iteratorError = undefined;

try {
  for (var middleware_iterator = filenames[Symbol.iterator](), middleware_step; !(middleware_iteratorNormalCompletion = (middleware_step = middleware_iterator.next()).done); middleware_iteratorNormalCompletion = true) {
    var filename = middleware_step.value;
    var middleware_name = filename.replace(/^\.\//, '').replace(/\.(mjs|js)$/, '');
    middleware[middleware_name] = getModule(filename);
  }
} catch (err) {
  middleware_didIteratorError = true;
  middleware_iteratorError = err;
} finally {
  try {
    if (!middleware_iteratorNormalCompletion && middleware_iterator.return != null) {
      middleware_iterator.return();
    }
  } finally {
    if (middleware_didIteratorError) {
      throw middleware_iteratorError;
    }
  }
}

/* harmony default export */ var _nuxt_middleware = (middleware);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread.js
var objectSpread = __webpack_require__(28);
var objectSpread_default = /*#__PURE__*/__webpack_require__.n(objectSpread);

// EXTERNAL MODULE: ./node_modules/vue-meta/lib/vue-meta.js
var vue_meta = __webpack_require__(220);
var vue_meta_default = /*#__PURE__*/__webpack_require__.n(vue_meta);

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__(66);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/edit.vue?vue&type=template&id=0dc635d3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',[_c('v-flex',{attrs:{"text-xs-center":""}},[_c('blockquote',{staticClass:"blockquote"},[_vm._v("\n      “First, solve the problem. Then, write the code.”\n      "),_c('footer',[_c('small',[_c('em',[_vm._v("—John Johnson")])])])])])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/edit.vue?vue&type=template&id=0dc635d3&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./pages/edit.vue

var script = {}


/* normalize component */

var edit_component = Object(componentNormalizer["a" /* default */])(
  script,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

edit_component.options.__file = "edit.vue"
/* harmony default export */ var edit = (edit_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=0c36fbf1&
var lib_vue_loader_options_pagesvue_type_template_id_0c36fbf1_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.template)?_c('div',{staticClass:"home"},[_c('h2',[_vm._v(_vm._s(_vm.$t('common.current_theme')))]),_vm._v(" "),_c('p',[_vm._v(" "+_vm._s(_vm.$t('common.current_theme_description')))]),_vm._v(" "),_c('a',{attrs:{"href":_vm.$store.getters['opencart/opData'].base_url,"target":"_blank"}},[_vm._v(_vm._s(_vm.$t('common.preview')))]),_vm._v(" "),_c('theme-preview',{attrs:{"template":_vm.template,"status":_vm.status}})],1):_vm._e()}
var lib_vue_loader_options_pagesvue_type_template_id_0c36fbf1_staticRenderFns = []


// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=0c36fbf1&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/ThemePreview.vue?vue&type=template&id=6137c810&scoped=true&
var ThemePreviewvue_type_template_id_6137c810_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"theme-preview"},[_c('div',{staticClass:"vz-theme-preview-images",on:{"click":_vm.popup}},[_c('div',{staticClass:"vz-theme-preview__img"},[_c('img',{staticClass:"vz-theme-preview__img__frame",attrs:{"src":_vm._f("image")('desktop_frame.png'),"alt":"desktop-frame"}}),_vm._v(" "),_c('div',{staticClass:"vz-theme-preview__img__overlay"},[_c('img',{attrs:{"src":_vm.template.img_desktop,"alt":"img_desktop"}})])]),_vm._v(" "),_c('div',{staticClass:"vz-theme-preview__img  vz-theme-preview__img--mobile"},[_c('img',{staticClass:"vz-theme-preview__img__frame",attrs:{"src":_vm._f("image")('mobile_frame.png'),"alt":"mobile-frame"}}),_vm._v(" "),_c('div',{staticClass:"vz-theme-preview__img__overlay"},[_c('img',{attrs:{"src":_vm.template.img_mobile,"alt":"img_mobile"}})])])]),_vm._v(" "),_c('div',{staticClass:"vz-theme-preview-title"},[_vm._v("\n        "+_vm._s(_vm.template.db_saved?_vm.template.title:_vm.template.setting.title)+"\n    ")]),_vm._v(" "),(_vm.template.db_saved)?_c('div',{staticClass:"vz-theme-preview-saved"},[_vm._v("\n        "+_vm._s(_vm.$t('template.last_saved_on'))+" "+_vm._s(_vm._f("formatDate")(_vm.template.date_modified))+"\n    ")]):_vm._e(),_vm._v(" "),_c('v-btn',[_vm._v("\n        "+_vm._s(_vm.$t('template.customize'))+"\n    ")]),_vm._v(" "),_c('v-menu',{attrs:{"transition":"slide-y-transition","offset-y":"","bottom":""}},[_c('v-btn',{attrs:{"slot":"activator","color":"primary","dark":""},slot:"activator"},[_vm._v("\n            "+_vm._s(_vm.$t('template.actions'))+"\n        ")]),_vm._v(" "),_c('v-list',[_c('v-list-tile',{attrs:{"dense":""},on:{"click":_vm.change_status}},[_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v("\n                        "+_vm._s(_vm.status?
                        _vm.$t('template.entry_deactivate'):_vm.$t('template.entry_activate'))+"\n                    ")])],1)],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('a',{attrs:{"href":_vm.$store.getters['opencart/opData'].base_url,"target":"_blank"}},[_c('v-list-tile',{attrs:{"dense":""},on:{"click":function($event){}}},[_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v("\n                            "+_vm._s(_vm.$t('template.preview'))+"\n                        ")])],1)],1)],1),_vm._v(" "),_c('v-list-tile',{attrs:{"dense":""},on:{"click":function($event){_vm.dialog=!_vm.dialog}}},[_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v("\n                        "+_vm._s(_vm.$t('template.rename'))+"\n                    ")])],1)],1),_vm._v(" "),_c('v-list-tile',{attrs:{"dense":""},on:{"click":_vm.download}},[_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v("\n                        "+_vm._s(_vm.$t('template.download'))+"\n                    ")])],1)],1)],1)],1),_vm._v(" "),_c('v-dialog',{attrs:{"persistent":"","max-width":"500px"},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v(_vm._s(_vm.$t('template.rename_form')))])]),_vm._v(" "),_c('v-card-text',[_c('v-layout',{attrs:{"wrap":""}},[_c('v-flex',{attrs:{"xs12":""}},[_c('v-text-field',{attrs:{"label":"Title","required":"","value":_vm.template.title},on:{"input":_vm.renameChange}})],1)],1)],1),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"blue darken-1","flat":""},nativeOn:{"click":function($event){_vm.dialog = false}}},[_vm._v(_vm._s(_vm.$t('common.button_cancel'))+"\n                ")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"blue darken-1","flat":""},nativeOn:{"click":function($event){_vm.dialog = false}}},[_vm._v(_vm._s(_vm.$t('common.button_save'))+"\n                ")])],1)],1)],1)],1)}
var ThemePreviewvue_type_template_id_6137c810_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./components/ThemePreview.vue?vue&type=template&id=6137c810&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ThemePreview.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ThemePreviewvue_type_script_lang_js_ = ({
  name: "theme-preview",
  props: ['template', 'status'],
  data: function data() {
    return {
      dialog: false,
      title: 'ss'
    };
  },
  methods: {
    popup: function popup() {},
    change_status: function change_status(e) {
      this.$emit('change-status', e);
    },
    download: function download(e) {},
    renameChange: function renameChange(e) {
      this.$emit('change-title', e);
    }
  }
});
// CONCATENATED MODULE: ./components/ThemePreview.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ThemePreviewvue_type_script_lang_js_ = (ThemePreviewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./components/ThemePreview.vue?vue&type=style&index=0&id=6137c810&scoped=true&lang=css&
var ThemePreviewvue_type_style_index_0_id_6137c810_scoped_true_lang_css_ = __webpack_require__(260);

// CONCATENATED MODULE: ./components/ThemePreview.vue






/* normalize component */

var ThemePreview_component = Object(componentNormalizer["a" /* default */])(
  components_ThemePreviewvue_type_script_lang_js_,
  ThemePreviewvue_type_template_id_6137c810_scoped_true_render,
  ThemePreviewvue_type_template_id_6137c810_scoped_true_staticRenderFns,
  false,
  null,
  "6137c810",
  null
  
)

ThemePreview_component.options.__file = "ThemePreview.vue"
/* harmony default export */ var ThemePreview = (ThemePreview_component.exports);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(19);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//


/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_js_ = ({
  layout: 'opencart',
  fetch: function () {
    var _fetch = asyncToGenerator_default()(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var store;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              store = _ref.store;
              _context.next = 3;
              return store.dispatch('template/GET_TEMPLATES');

            case 3:
              store.commit('load/LOADING_END');

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function fetch(_x) {
      return _fetch.apply(this, arguments);
    };
  }(),
  computed: Object(vuex_esm["b" /* mapGetters */])({
    template: 'template/active_template',
    status: 'setting/status'
  }),
  components: {
    ThemePreview: ThemePreview
  }
});
// CONCATENATED MODULE: ./pages/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pagesvue_type_script_lang_js_ = (lib_vue_loader_options_pagesvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./pages/index.vue





/* normalize component */

var pages_component = Object(componentNormalizer["a" /* default */])(
  pagesvue_type_script_lang_js_,
  lib_vue_loader_options_pagesvue_type_template_id_0c36fbf1_render,
  lib_vue_loader_options_pagesvue_type_template_id_0c36fbf1_staticRenderFns,
  false,
  null,
  null,
  null
  
)

pages_component.options.__file = "index.vue"
/* harmony default export */ var pages = (pages_component.exports);
// CONCATENATED MODULE: ./.nuxt/router.js




vue_runtime_esm["default"].use(vue_router_esm["a" /* default */]);

if (true) {
  window.history.scrollRestoration = 'manual';
}

var scrollBehavior = function scrollBehavior(to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  var position = false; // if no children detected

  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = {
      x: 0,
      y: 0
    };
  } else if (to.matched.some(function (r) {
    return r.components.default.options.scrollToTop;
  })) {
    // if one of the children has scrollToTop option set to true
    position = {
      x: 0,
      y: 0
    };
  } // savedPosition is only available for popstate navigations (back button)


  if (savedPosition) {
    position = savedPosition;
  }

  return new Promise(function (resolve) {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', function () {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        var hash = to.hash; // CSS.escape() is not supported with IE and Edge.

        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1));
        }

        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = {
              selector: hash
            };
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).');
        }
      }

      resolve(position);
    });
  });
};

function createRouter() {
  return new vue_router_esm["a" /* default */]({
    mode: 'hash',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior: scrollBehavior,
    routes: [{
      path: "/edit",
      component: function component() {
        return edit.default || edit;
      },
      name: "edit"
    }, {
      path: "/",
      component: function component() {
        return pages.default || pages;
      },
      name: "index"
    }],
    fallback: false
  });
}
// EXTERNAL MODULE: ./node_modules/vue-no-ssr/dist/vue-no-ssr.common.js
var vue_no_ssr_common = __webpack_require__(221);
var vue_no_ssr_common_default = /*#__PURE__*/__webpack_require__.n(vue_no_ssr_common);

// CONCATENATED MODULE: ./.nuxt/components/no-ssr.js
/*
** From https://github.com/egoist/vue-no-ssr
** With the authorization of @egoist
*/

/* harmony default export */ var no_ssr = (vue_no_ssr_common_default.a);
// CONCATENATED MODULE: ./.nuxt/components/nuxt-child.js

/* harmony default export */ var nuxt_child = ({
  name: 'nuxt-child',
  functional: true,
  props: ['keepAlive'],
  render: function render(h, _ref) {
    var parent = _ref.parent,
        data = _ref.data,
        props = _ref.props;
    data.nuxtChild = true;
    var _parent = parent;
    var transitions = parent.$nuxt.nuxt.transitions;
    var defaultTransition = parent.$nuxt.nuxt.defaultTransition;
    var depth = 0;

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.nuxtChild) {
        depth++;
      }

      parent = parent.$parent;
    }

    data.nuxtChildDepth = depth;
    var transition = transitions[depth] || defaultTransition;
    var transitionProps = {};
    transitionsKeys.forEach(function (key) {
      if (typeof transition[key] !== 'undefined') {
        transitionProps[key] = transition[key];
      }
    });
    var listeners = {};
    listenersKeys.forEach(function (key) {
      if (typeof transition[key] === 'function') {
        listeners[key] = transition[key].bind(_parent);
      }
    }); // Add triggerScroll event on beforeEnter (fix #1376)

    var beforeEnter = listeners.beforeEnter;

    listeners.beforeEnter = function (el) {
      // Ensure to trigger scroll event after calling scrollBehavior
      window.$nuxt.$nextTick(function () {
        window.$nuxt.$emit('triggerScroll');
      });
      if (beforeEnter) return beforeEnter.call(_parent, el);
    };

    var routerView = [h('router-view', data)];

    if (typeof props.keepAlive !== 'undefined') {
      routerView = [h('keep-alive', routerView)];
    }

    return h('transition', {
      props: transitionProps,
      on: listeners
    }, routerView);
  }
});
var transitionsKeys = ['name', 'mode', 'appear', 'css', 'type', 'duration', 'enterClass', 'leaveClass', 'appearClass', 'enterActiveClass', 'enterActiveClass', 'leaveActiveClass', 'appearActiveClass', 'enterToClass', 'leaveToClass', 'appearToClass'];
var listenersKeys = ['beforeEnter', 'enter', 'afterEnter', 'enterCancelled', 'beforeLeave', 'leave', 'afterLeave', 'leaveCancelled', 'beforeAppear', 'appear', 'afterAppear', 'appearCancelled'];
// CONCATENATED MODULE: ./.nuxt/components/nuxt-link.js
/* harmony default export */ var nuxt_link = ({
  name: 'nuxt-link',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    return h('router-link', data, children);
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-error.vue?vue&type=template&id=376a6cef&
var nuxt_errorvue_type_template_id_376a6cef_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"__nuxt-error-page"},[_c('div',{staticClass:"error"},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"90","height":"90","fill":"#DBE1EC","viewBox":"0 0 48 48"}},[_c('path',{attrs:{"d":"M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"}})]),_vm._v(" "),_c('div',{staticClass:"title"},[_vm._v(_vm._s(_vm.message))]),_vm._v(" "),(_vm.statusCode === 404)?_c('p',{staticClass:"description"},[_c('nuxt-link',{staticClass:"error-link",attrs:{"to":"/"}},[_vm._v("Back to the home page")])],1):_c('p',{staticClass:"description"},[_vm._v("An error occurred while rendering the page. Check developer tools console for details.")]),_vm._v(" "),_vm._m(0)])])}
var nuxt_errorvue_type_template_id_376a6cef_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"logo"},[_c('a',{attrs:{"href":"https://nuxtjs.org","target":"_blank","rel":"noopener"}},[_vm._v("Nuxt.js")])])}]


// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue?vue&type=template&id=376a6cef&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-error.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var nuxt_errorvue_type_script_lang_js_ = ({
  name: 'nuxt-error',
  props: ['error'],
  head: function head() {
    return {
      title: this.message,
      meta: [{
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      }]
    };
  },
  computed: {
    statusCode: function statusCode() {
      return this.error && this.error.statusCode || 500;
    },
    message: function message() {
      return this.error.message || "Error";
    }
  }
});
// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_nuxt_errorvue_type_script_lang_js_ = (nuxt_errorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./.nuxt/components/nuxt-error.vue?vue&type=style&index=0&lang=css&
var nuxt_errorvue_type_style_index_0_lang_css_ = __webpack_require__(261);

// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue






/* normalize component */

var nuxt_error_component = Object(componentNormalizer["a" /* default */])(
  components_nuxt_errorvue_type_script_lang_js_,
  nuxt_errorvue_type_template_id_376a6cef_render,
  nuxt_errorvue_type_template_id_376a6cef_staticRenderFns,
  false,
  null,
  null,
  null
  
)

nuxt_error_component.options.__file = "nuxt-error.vue"
/* harmony default export */ var nuxt_error = (nuxt_error_component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.repeat.js
var es6_string_repeat = __webpack_require__(262);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__(264);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.search.js
var es6_regexp_search = __webpack_require__(88);

// CONCATENATED MODULE: ./.nuxt/utils.js

















var noopData = function noopData() {
  return {};
}; // window.onNuxtReady(() => console.log('Ready')) hook
// Useful for jsdom testing or plugins (https://github.com/tmpvar/jsdom#dealing-with-asynchronous-script-loading)


if (true) {
  window._nuxtReadyCbs = [];

  window.onNuxtReady = function (cb) {
    window._nuxtReadyCbs.push(cb);
  };
}

function empty() {}
function globalHandleError(error) {
  if (vue_runtime_esm["default"].config.errorHandler) {
    vue_runtime_esm["default"].config.errorHandler(error);
  }
}
function applyAsyncData(Component, asyncData) {
  var ComponentData = Component.options.data || noopData; // Prevent calling this method for each request on SSR context

  if (!asyncData && Component.options.hasAsyncData) {
    return;
  }

  Component.options.hasAsyncData = true;

  Component.options.data = function () {
    var data = ComponentData.call(this);

    if (this.$ssrContext) {
      asyncData = this.$ssrContext.asyncData[Component.cid];
    }

    return objectSpread_default()({}, data, asyncData);
  };

  if (Component._Ctor && Component._Ctor.options) {
    Component._Ctor.options.data = Component.options.data;
  }
}
function sanitizeComponent(Component) {
  // If Component already sanitized
  if (Component.options && Component._Ctor === Component) {
    return Component;
  }

  if (!Component.options) {
    Component = vue_runtime_esm["default"].extend(Component); // fix issue #6

    Component._Ctor = Component;
  } else {
    Component._Ctor = Component;
    Component.extendOptions = Component.options;
  } // For debugging purpose


  if (!Component.options.name && Component.options.__file) {
    Component.options.name = Component.options.__file;
  }

  return Component;
}
function getMatchedComponents(route) {
  var matches = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
    return Object.keys(m.components).map(function (key) {
      matches && matches.push(index);
      return m.components[key];
    });
  }));
}
function getMatchedComponentsInstances(route) {
  var matches = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
    return Object.keys(m.instances).map(function (key) {
      matches && matches.push(index);
      return m.instances[key];
    });
  }));
}
function flatMapComponents(route, fn) {
  return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
    return Object.keys(m.components).reduce(function (promises, key) {
      if (m.components[key]) {
        promises.push(fn(m.components[key], m.instances[key], m, key, index));
      } else {
        delete m.components[key];
      }

      return promises;
    }, []);
  }));
}
function resolveRouteComponents(route) {
  return Promise.all(flatMapComponents(route,
  /*#__PURE__*/
  function () {
    var _ref = asyncToGenerator_default()(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(Component, _, match, key) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof Component === 'function' && !Component.options)) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return Component();

            case 3:
              Component = _context.sent;

            case 4:
              return _context.abrupt("return", match.components[key] = sanitizeComponent(Component));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }()));
}
function getRouteData(_x5) {
  return _getRouteData.apply(this, arguments);
}

function _getRouteData() {
  _getRouteData = asyncToGenerator_default()(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(route) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return resolveRouteComponents(route);

          case 2:
            return _context2.abrupt("return", objectSpread_default()({}, route, {
              meta: getMatchedComponents(route).map(function (Component) {
                return Component.options.meta || {};
              })
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getRouteData.apply(this, arguments);
}

function setContext(_x6, _x7) {
  return _setContext.apply(this, arguments);
}

function _setContext() {
  _setContext = asyncToGenerator_default()(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(app, context) {
    var route;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            route = context.to ? context.to : context.route; // If context not defined, create it

            if (!app.context) {
              app.context = {
                isStatic: true,
                isDev: true,
                isHMR: false,
                app: app,
                store: app.store,
                payload: context.payload,
                error: context.error,
                base: '/',
                env: {
                  "appUrl": "/302/d_visualize/admin/index.php?",
                  "appName": "Visualize",
                  "appLocale": "en",
                  "user_token": "potwnhcz2Zk3oHfzz4MLBQV1Vo40dZk9",
                  "isDev": true,
                  "githubAuth": false
                } // Only set once

              };
              if (context.req) app.context.req = context.req;
              if (context.res) app.context.res = context.res;

              app.context.redirect = function (status, path, query) {
                if (!status) {
                  return;
                } // Used in middleware


                app.context._redirected = true; // if only 1 or 2 arguments: redirect('/') or redirect('/', { foo: 'bar' })

                var pathType = typeof_default()(path);

                if (typeof status !== 'number' && (pathType === 'undefined' || pathType === 'object')) {
                  query = path || {};
                  path = status;
                  pathType = typeof_default()(path);
                  status = 302;
                }

                if (pathType === 'object') {
                  path = app.router.resolve(path).href;
                } // "/absolute/route", "./relative/route" or "../relative/route"


                if (/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)) {
                  app.context.next({
                    path: path,
                    query: query,
                    status: status
                  });
                } else {
                  path = formatUrl(path, query);

                  if (false) {}

                  if (true) {
                    // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
                    window.location.replace(path); // Throw a redirect error

                    throw new Error('ERR_REDIRECT');
                  }
                }
              };

              if (false) {}
              if (true) app.context.nuxtState = window.__NUXT__;
            } // Dynamic keys


            app.context.next = context.next;
            app.context._redirected = false;
            app.context._errored = false;
            app.context.isHMR = !!context.isHMR;

            if (!context.route) {
              _context3.next = 10;
              break;
            }

            _context3.next = 9;
            return getRouteData(context.route);

          case 9:
            app.context.route = _context3.sent;

          case 10:
            app.context.params = app.context.route.params || {};
            app.context.query = app.context.route.query || {};

            if (!context.from) {
              _context3.next = 16;
              break;
            }

            _context3.next = 15;
            return getRouteData(context.from);

          case 15:
            app.context.from = _context3.sent;

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _setContext.apply(this, arguments);
}

function middlewareSeries(promises, appContext) {
  if (!promises.length || appContext._redirected || appContext._errored) {
    return Promise.resolve();
  }

  return promisify(promises[0], appContext).then(function () {
    return middlewareSeries(promises.slice(1), appContext);
  });
}
function promisify(fn, context) {
  var promise;

  if (fn.length === 2) {
    // fn(context, callback)
    promise = new Promise(function (resolve) {
      fn(context, function (err, data) {
        if (err) {
          context.error(err);
        }

        data = data || {};
        resolve(data);
      });
    });
  } else {
    promise = fn(context);
  }

  if (!promise || !(promise instanceof Promise) && typeof promise.then !== 'function') {
    promise = Promise.resolve(promise);
  }

  return promise;
} // Imported from vue-router

function getLocation(base, mode) {
  var path = window.location.pathname;

  if (mode === 'hash') {
    return window.location.hash.replace(/^#\//, '');
  }

  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }

  return (path || '/') + window.location.search + window.location.hash;
}
function urlJoin() {
  return Array.prototype.slice.call(arguments).join('/').replace(/\/+/g, '/');
} // Imported from path-to-regexp

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */

function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
function getQueryDiff(toQuery, fromQuery) {
  var diff = {};

  var queries = objectSpread_default()({}, toQuery, fromQuery);

  for (var k in queries) {
    if (String(toQuery[k]) !== String(fromQuery[k])) {
      diff[k] = true;
    }
  }

  return diff;
}
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (typeof_default()(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}
/**
 * Format given url, append query to url query string
 *
 * @param  {string} url
 * @param  {string} query
 * @return {string}
 */


function formatUrl(url, query) {
  var protocol;
  var index = url.indexOf('://');

  if (index !== -1) {
    protocol = url.substring(0, index);
    url = url.substring(index + 3);
  } else if (url.indexOf('//') === 0) {
    url = url.substring(2);
  }

  var parts = url.split('/');
  var result = (protocol ? protocol + '://' : '//') + parts.shift();
  var path = parts.filter(Boolean).join('/');
  var hash;
  parts = path.split('#');

  if (parts.length === 2) {
    path = parts[0];
    hash = parts[1];
  }

  result += path ? '/' + path : '';

  if (query && JSON.stringify(query) !== '{}') {
    result += (url.split('?').length === 2 ? '&' : '?') + formatQuery(query);
  }

  result += hash ? '#' + hash : '';
  return result;
}
/**
 * Transform data object to query string
 *
 * @param  {object} query
 * @return {string}
 */


function formatQuery(query) {
  return Object.keys(query).sort().map(function (key) {
    var val = query[key];

    if (val == null) {
      return '';
    }

    if (Array.isArray(val)) {
      return val.slice().map(function (val2) {
        return [key, '=', val2].join('');
      }).join('&');
    }

    return key + '=' + val;
  }).filter(Boolean).join('&');
}
// CONCATENATED MODULE: ./.nuxt/components/nuxt.js




/* harmony default export */ var nuxt = ({
  name: 'nuxt',
  props: ['nuxtChildKey', 'keepAlive'],
  render: function render(h) {
    // If there is some error
    if (this.nuxt.err) {
      return h('nuxt-error', {
        props: {
          error: this.nuxt.err
        }
      });
    } // Directly return nuxt child


    return h('nuxt-child', {
      key: this.routerViewKey,
      props: this.$props
    });
  },
  beforeCreate: function beforeCreate() {
    vue_runtime_esm["default"].util.defineReactive(this, 'nuxt', this.$root.$options.nuxt);
  },
  computed: {
    routerViewKey: function routerViewKey() {
      // If nuxtChildKey prop is given or current route has children
      if (typeof this.nuxtChildKey !== 'undefined' || this.$route.matched.length > 1) {
        return this.nuxtChildKey || compile(this.$route.matched[0].path)(this.$route.params);
      }

      var Component = this.$route.matched[0] && this.$route.matched[0].components.default;

      if (Component && Component.options && Component.options.key) {
        return typeof Component.options.key === 'function' ? Component.options.key(this.$route) : Component.options.key;
      }

      return this.$route.path;
    }
  },
  components: {
    NuxtChild: nuxt_child,
    NuxtError: nuxt_error
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-loading.vue?vue&type=template&id=4111396e&
var nuxt_loadingvue_type_template_id_4111396e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"nuxt-progress",style:({
  'width': _vm.percent + '%',
  'height': _vm.height,
  'background-color': _vm.canSuccess ? _vm.color : _vm.failedColor,
  'opacity': _vm.show ? 1 : 0
})})}
var nuxt_loadingvue_type_template_id_4111396e_staticRenderFns = []


// CONCATENATED MODULE: ./.nuxt/components/nuxt-loading.vue?vue&type=template&id=4111396e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-loading.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//

/* harmony default export */ var nuxt_loadingvue_type_script_lang_js_ = ({
  name: 'nuxt-loading',
  data: function data() {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      throttle: 200,
      duration: 5000,
      height: '2px',
      color: '#6db3ff',
      failedColor: 'red'
    };
  },
  methods: {
    start: function start() {
      var _this = this;

      this.canSuccess = true;

      if (this._throttle) {
        clearTimeout(this._throttle);
      }

      if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
        this.percent = 0;
      }

      this._throttle = setTimeout(function () {
        _this.show = true;
        _this._cut = 10000 / Math.floor(_this.duration);
        _this._timer = setInterval(function () {
          _this.increase(_this._cut * Math.random());

          if (_this.percent > 95) {
            _this.finish();
          }
        }, 100);
      }, this.throttle);
      return this;
    },
    set: function set(num) {
      this.show = true;
      this.canSuccess = true;
      this.percent = Math.floor(num);
      return this;
    },
    get: function get() {
      return Math.floor(this.percent);
    },
    increase: function increase(num) {
      this.percent = this.percent + Math.floor(num);
      return this;
    },
    decrease: function decrease(num) {
      this.percent = this.percent - Math.floor(num);
      return this;
    },
    finish: function finish() {
      this.percent = 100;
      this.hide();
      return this;
    },
    pause: function pause() {
      clearInterval(this._timer);
      return this;
    },
    hide: function hide() {
      var _this2 = this;

      clearInterval(this._timer);
      this._timer = null;
      clearTimeout(this._throttle);
      this._throttle = null;
      setTimeout(function () {
        _this2.show = false;
        vue_runtime_esm["default"].nextTick(function () {
          setTimeout(function () {
            _this2.percent = 0;
          }, 200);
        });
      }, 500);
      return this;
    },
    fail: function fail() {
      this.canSuccess = false;
      return this;
    }
  }
});
// CONCATENATED MODULE: ./.nuxt/components/nuxt-loading.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_nuxt_loadingvue_type_script_lang_js_ = (nuxt_loadingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./.nuxt/components/nuxt-loading.vue?vue&type=style&index=0&lang=css&
var nuxt_loadingvue_type_style_index_0_lang_css_ = __webpack_require__(267);

// CONCATENATED MODULE: ./.nuxt/components/nuxt-loading.vue






/* normalize component */

var nuxt_loading_component = Object(componentNormalizer["a" /* default */])(
  components_nuxt_loadingvue_type_script_lang_js_,
  nuxt_loadingvue_type_template_id_4111396e_render,
  nuxt_loadingvue_type_template_id_4111396e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

nuxt_loading_component.options.__file = "nuxt-loading.vue"
/* harmony default export */ var nuxt_loading = (nuxt_loading_component.exports);
// EXTERNAL MODULE: ./assets/style/app.styl
var style_app = __webpack_require__(268);

// EXTERNAL MODULE: ./assets/sass/app.scss
var sass_app = __webpack_require__(269);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./layouts/default.vue?vue&type=template&id=562387be&
var defaultvue_type_template_id_562387be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nuxt')}
var defaultvue_type_template_id_562387be_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/default.vue?vue&type=template&id=562387be&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./layouts/default.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var defaultvue_type_script_lang_js_ = ({});
// CONCATENATED MODULE: ./layouts/default.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_defaultvue_type_script_lang_js_ = (defaultvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./layouts/default.vue





/* normalize component */

var default_component = Object(componentNormalizer["a" /* default */])(
  layouts_defaultvue_type_script_lang_js_,
  defaultvue_type_template_id_562387be_render,
  defaultvue_type_template_id_562387be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

default_component.options.__file = "default.vue"
/* harmony default export */ var layouts_default = (default_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./layouts/edit.vue?vue&type=template&id=188778f8&
var editvue_type_template_id_188778f8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app',[_c('v-navigation-drawer',{attrs:{"mini-variant":_vm.miniVariant,"clipped":_vm.clipped,"fixed":"","app":""},model:{value:(_vm.drawer),callback:function ($$v) {_vm.drawer=$$v},expression:"drawer"}},[_c('v-list',_vm._l((_vm.items),function(item,i){return _c('v-list-tile',{key:i,attrs:{"to":item.to,"router":"","exact":""}},[_c('v-list-tile-action',[_c('v-icon',{domProps:{"innerHTML":_vm._s(item.icon)}})],1),_vm._v(" "),_c('v-list-tile-content',[_c('v-list-tile-title',{domProps:{"textContent":_vm._s(item.title)}})],1)],1)}))],1),_vm._v(" "),_c('v-content',[_c('v-container',[_c('nuxt')],1)],1),_vm._v(" "),_c('v-navigation-drawer',{attrs:{"right":_vm.right,"temporary":"","fixed":""},model:{value:(_vm.rightDrawer),callback:function ($$v) {_vm.rightDrawer=$$v},expression:"rightDrawer"}},[_c('v-list',[_c('v-list-tile',{nativeOn:{"click":function($event){_vm.right = !_vm.right}}},[_c('v-list-tile-action',[_c('v-icon',{attrs:{"light":""}},[_vm._v("compare_arrows")])],1),_vm._v(" "),_c('v-list-tile-title',[_vm._v("Switch drawer (click me)")])],1)],1)],1),_vm._v(" "),_c('v-footer',{attrs:{"fixed":_vm.fixed,"app":""}},[_c('span',[_vm._v("© 2017")])])],1)}
var editvue_type_template_id_188778f8_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/edit.vue?vue&type=template&id=188778f8&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./layouts/edit.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var editvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'apps',
        title: 'home',
        to: '/'
      }, {
        icon: 'bubble_chart',
        title: 'Edit',
        to: '/edit'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    };
  }
});
// CONCATENATED MODULE: ./layouts/edit.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_editvue_type_script_lang_js_ = (editvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./layouts/edit.vue





/* normalize component */

var layouts_edit_component = Object(componentNormalizer["a" /* default */])(
  layouts_editvue_type_script_lang_js_,
  editvue_type_template_id_188778f8_render,
  editvue_type_template_id_188778f8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

layouts_edit_component.options.__file = "edit.vue"
/* harmony default export */ var layouts_edit = (layouts_edit_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./layouts/opencart.vue?vue&type=template&id=46916b96&
var opencartvue_type_template_id_46916b96_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"opencart"},[(_vm.opData)?_c('v-app',{attrs:{"id":"inspire"}},[_c('v-navigation-drawer',{attrs:{"fixed":"","clipped":"","app":"","mobile-break-point":"768","width":"270"},model:{value:(_vm.drawer),callback:function ($$v) {_vm.drawer=$$v},expression:"drawer"}},[_c('div',{staticClass:"opencart-column-left",domProps:{"innerHTML":_vm._s(_vm.opData.column_left)}})]),_vm._v(" "),_c('v-toolbar',{attrs:{"color":"transparent","card":"","clipped-left":"","app":"","fixed":""}},[_c('div',{staticClass:"opencart-header",domProps:{"innerHTML":_vm._s(_vm.opData.header)}})]),_vm._v(" "),_c('v-content',[(_vm.loading.content_loaded)?_c('div',{staticClass:"content",class:{'loading':_vm.loading.on_progress}},[_c('nuxt'),_vm._v(" "),(_vm.loading.status==_vm.load.FAIL)?_c('div',{staticClass:"no_data_found"},[_c('img',{attrs:{"src":_vm.$o('img.no_data_img'),"alt":"nodata"}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"opencart-footer",domProps:{"innerHTML":_vm._s(_vm.opData.footer)}})],1):_vm._e()])],1):_vm._e()],1)}
var opencartvue_type_template_id_46916b96_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/opencart.vue?vue&type=template&id=46916b96&

// EXTERNAL MODULE: ./constants/index.js
var constants = __webpack_require__(15);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./layouts/opencart.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var opencartvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      load: constants["a" /* LOAD */],
      drawer: null
    };
  },
  computed: Object(vuex_esm["b" /* mapGetters */])({
    opData: 'opencart/opData',
    loading: 'load/loading'
  }),
  head: function head() {
    return {
      title: this.opData.title
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.opData.header) {
      document.querySelector('#button-menu').addEventListener('click', function (e) {
        e.preventDefault();
        _this.drawer = !_this.drawer;
      });
    }
  }
});
// CONCATENATED MODULE: ./layouts/opencart.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_opencartvue_type_script_lang_js_ = (opencartvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./layouts/opencart.vue





/* normalize component */

var opencart_component = Object(componentNormalizer["a" /* default */])(
  layouts_opencartvue_type_script_lang_js_,
  opencartvue_type_template_id_46916b96_render,
  opencartvue_type_template_id_46916b96_staticRenderFns,
  false,
  null,
  null,
  null
  
)

opencart_component.options.__file = "opencart.vue"
/* harmony default export */ var opencart = (opencart_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./layouts/simple.vue?vue&type=template&id=2334e635&
var simplevue_type_template_id_2334e635_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nuxt')}
var simplevue_type_template_id_2334e635_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/simple.vue?vue&type=template&id=2334e635&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./layouts/simple.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var simplevue_type_script_lang_js_ = ({});
// CONCATENATED MODULE: ./layouts/simple.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_simplevue_type_script_lang_js_ = (simplevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./layouts/simple.vue





/* normalize component */

var simple_component = Object(componentNormalizer["a" /* default */])(
  layouts_simplevue_type_script_lang_js_,
  simplevue_type_template_id_2334e635_render,
  simplevue_type_template_id_2334e635_staticRenderFns,
  false,
  null,
  null,
  null
  
)

simple_component.options.__file = "simple.vue"
/* harmony default export */ var simple = (simple_component.exports);
// CONCATENATED MODULE: ./.nuxt/App.js








var layouts = {
  "_default": layouts_default,
  "_edit": layouts_edit,
  "_opencart": opencart,
  "_simple": simple
};
/* harmony default export */ var App = ({
  head: {
    "title": "Visualize",
    "titleTemplate": "%s - Visualize",
    "meta": [{
      "charset": "utf-8"
    }, {
      "name": "viewport",
      "content": "width=device-width, initial-scale=1"
    }, {
      "hid": "description",
      "name": "description",
      "content": "My stellar Nuxt.js project"
    }],
    "link": [{
      "rel": "icon",
      "type": "image/x-icon",
      "href": "/favicon.ico"
    }, {
      "rel": "stylesheet",
      "href": "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
    }],
    "script": [{
      "src": "https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise,Object.assign,Object.values,Array.prototype.find,Array.prototype.findIndex,Array.prototype.includes,String.prototype.includes,String.prototype.startsWith,String.prototype.endsWith"
    }, {
      "src": "https://code.jquery.com/jquery-2.2.4.min.js"
    }, {
      "src": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    }],
    "style": []
  },
  render: function render(h, props) {
    var loadingEl = h('nuxt-loading', {
      ref: 'loading'
    });
    var layoutEl = h(this.layout || 'nuxt');
    var templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl]);
    var transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [templateEl]);
    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [loadingEl, transitionEl]);
  },
  data: function data() {
    return {
      layout: null,
      layoutName: ''
    };
  },
  beforeCreate: function beforeCreate() {
    vue_runtime_esm["default"].util.defineReactive(this, 'nuxt', this.$options.nuxt);
  },
  created: function created() {
    // Add this.$nuxt in child instances
    vue_runtime_esm["default"].prototype.$nuxt = this; // add to window so we can listen when ready

    if (typeof window !== 'undefined') {
      window.$nuxt = this;
    } // Add $nuxt.error()


    this.error = this.nuxt.error;
  },
  mounted: function mounted() {
    this.$loading = this.$refs.loading;
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  methods: {
    errorChanged: function errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail();
        if (this.$loading.finish) this.$loading.finish();
      }
    },
    setLayout: function setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default';
      }

      this.layoutName = layout;
      this.layout = layouts['_' + layout];
      return this.layout;
    },
    loadLayout: function loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default';
      }

      return Promise.resolve(layouts['_' + layout]);
    }
  },
  components: {
    NuxtLoading: nuxt_loading
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__(270);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__(271);

// CONCATENATED MODULE: ./.nuxt/store.js












vue_runtime_esm["default"].use(vuex_esm["a" /* default */]);

var store_files = __webpack_require__(272);

var store_filenames = store_files.keys(); // Store

var storeData = {}; // Check if {dir.store}/index.js exists

var indexFilename = store_filenames.find(function (name) {
  return name.includes('./index.');
});

if (indexFilename) {
  storeData = store_getModule(indexFilename);
} // If store is not an exported method = modules store


if (typeof storeData !== 'function') {
  // Store modules
  if (!storeData.modules) {
    storeData.modules = {};
  }

  var store_iteratorNormalCompletion = true;
  var store_didIteratorError = false;
  var store_iteratorError = undefined;

  try {
    for (var store_iterator = store_filenames[Symbol.iterator](), store_step; !(store_iteratorNormalCompletion = (store_step = store_iterator.next()).done); store_iteratorNormalCompletion = true) {
      var store_filename = store_step.value;
      var store_name = store_filename.replace(/^\.\//, '').replace(/\.(mjs|js)$/, '');
      if (store_name === 'index') continue;
      var namePath = store_name.split(/\//);
      store_name = namePath[namePath.length - 1];

      if (['state', 'getters', 'actions', 'mutations'].includes(store_name)) {
        var _module = getModuleNamespace(storeData, namePath, true);

        appendModule(_module, store_filename, store_name);
        continue;
      } // If file is foo/index.js, it should be saved as foo


      var isIndex = store_name === 'index';

      if (isIndex) {
        namePath.pop();
      }

      var store_module = getModuleNamespace(storeData, namePath);
      var fileModule = store_getModule(store_filename);
      store_name = namePath.pop();
      store_module[store_name] = store_module[store_name] || {}; // if file is foo.js, existing properties take priority
      // because it's the least specific case

      if (!isIndex) {
        store_module[store_name] = Object.assign({}, fileModule, store_module[store_name]);
        store_module[store_name].namespaced = true;
        continue;
      } // if file is foo/index.js we want to overwrite properties from foo.js
      // but not from appended mods like foo/actions.js


      var appendedMods = {};

      if (store_module[store_name].appends) {
        appendedMods.appends = store_module[store_name].appends;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = store_module[store_name].appends[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var append = _step2.value;
            appendedMods[append] = store_module[store_name][append];
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      store_module[store_name] = Object.assign({}, store_module[store_name], fileModule, appendedMods);
      store_module[store_name].namespaced = true;
    }
  } catch (err) {
    store_didIteratorError = true;
    store_iteratorError = err;
  } finally {
    try {
      if (!store_iteratorNormalCompletion && store_iterator.return != null) {
        store_iterator.return();
      }
    } finally {
      if (store_didIteratorError) {
        throw store_iteratorError;
      }
    }
  }
} // createStore


var createStore = storeData instanceof Function ? storeData : function () {
  return new vuex_esm["a" /* default */].Store(Object.assign({
    strict: "production" !== 'production'
  }, storeData, {
    state: storeData.state instanceof Function ? storeData.state() : {}
  }));
}; // Dynamically require module

function store_getModule(filename) {
  var file = store_files(filename);
  var module = file.default || file;

  if (module.commit) {
    throw new Error('[nuxt] store/' + filename.replace('./', '') + ' should export a method which returns a Vuex instance.');
  }

  if (module.state && typeof module.state !== 'function') {
    throw new Error('[nuxt] state should be a function in store/' + filename.replace('./', ''));
  }

  return module;
}

function getModuleNamespace(storeData, namePath) {
  var forAppend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (namePath.length === 1) {
    if (forAppend) {
      return storeData;
    }

    return storeData.modules;
  }

  var namespace = namePath.shift();
  storeData.modules[namespace] = storeData.modules[namespace] || {};
  storeData.modules[namespace].namespaced = true;
  storeData.modules[namespace].modules = storeData.modules[namespace].modules || {};
  return getModuleNamespace(storeData.modules[namespace], namePath, forAppend);
}

function appendModule(module, filename, name) {
  var file = store_files(filename);
  module.appends = module.appends || [];
  module.appends.push(name);
  module[name] = file.default || file;
}
// EXTERNAL MODULE: ./node_modules/axios/index.js
var node_modules_axios = __webpack_require__(222);
var axios_default = /*#__PURE__*/__webpack_require__.n(node_modules_axios);

// CONCATENATED MODULE: ./.nuxt/axios.js





 // Axios.prototype cannot be modified

var axiosExtra = {
  setHeader: function setHeader(name, value) {
    var scopes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'common';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (Array.isArray(scopes) ? scopes : [scopes])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var scope = _step.value;

        if (!value) {
          delete this.defaults.headers[scope][name];
          return;
        }

        this.defaults.headers[scope][name] = value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  setToken: function setToken(token, type) {
    var scopes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'common';
    var value = !token ? null : (type ? type + ' ' : '') + token;
    this.setHeader('Authorization', value, scopes);
  },
  onRequest: function onRequest(fn) {
    this.interceptors.request.use(function (config) {
      return fn(config) || config;
    });
  },
  onResponse: function onResponse(fn) {
    this.interceptors.response.use(function (response) {
      return fn(response) || response;
    });
  },
  onRequestError: function onRequestError(fn) {
    this.interceptors.request.use(undefined, function (error) {
      return fn(error) || Promise.reject(error);
    });
  },
  onResponseError: function onResponseError(fn) {
    this.interceptors.response.use(undefined, function (error) {
      return fn(error) || Promise.reject(error);
    });
  },
  onError: function onError(fn) {
    this.onRequestError(fn);
    this.onResponseError(fn);
  }
}; // Request helpers ($get, $post, ...)

var _arr = ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch'];

var _loop = function _loop() {
  var method = _arr[_i];

  axiosExtra['$' + method] = function () {
    return this[method].apply(this, arguments).then(function (res) {
      return res && res.data;
    });
  };
};

for (var _i = 0; _i < _arr.length; _i++) {
  _loop();
}

var extendAxiosInstance = function extendAxiosInstance(axios) {
  for (var key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios);
  }
};

var setupProgress = function setupProgress(axios, ctx) {
  if (false) {} // A noop loading inteterface for when $nuxt is not yet ready


  var noopLoading = {
    finish: function finish() {},
    start: function start() {},
    fail: function fail() {},
    set: function set() {}
  };

  var $loading = function $loading() {
    return window.$nuxt && window.$nuxt.$loading && window.$nuxt.$loading.set ? window.$nuxt.$loading : noopLoading;
  };

  var currentRequests = 0;
  axios.onRequest(function (config) {
    if (config && config.progress === false) {
      return;
    }

    currentRequests++;
  });
  axios.onResponse(function (response) {
    if (response && response.config && response.config.progress === false) {
      return;
    }

    currentRequests--;

    if (currentRequests <= 0) {
      currentRequests = 0;
      $loading().finish();
    }
  });
  axios.onError(function (error) {
    if (error && error.config && error.config.progress === false) {
      return;
    }

    currentRequests--;
    $loading().fail();
    $loading().finish();
  });

  var onProgress = function onProgress(e) {
    if (!currentRequests) {
      return;
    }

    var progress = e.loaded * 100 / (e.total * currentRequests);
    $loading().set(Math.min(100, progress));
  };

  axios.defaults.onUploadProgress = onProgress;
  axios.defaults.onDownloadProgress = onProgress;
};

/* harmony default export */ var _nuxt_axios = (function (ctx, inject) {
  var axiosOptions = {
    // baseURL
    baseURL:  true ? 'http://localhost:3000/' : undefined,
    // Create fresh objects for all default header scopes
    // Axios creates only one which is shared across SSR requests!
    // https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    } // Proxy SSR request headers headers

  };
  axiosOptions.headers.common = ctx.req && ctx.req.headers ? Object.assign({}, ctx.req.headers) : {};
  delete axiosOptions.headers.common['accept'];
  delete axiosOptions.headers.common['host']; // Create new axios instance

  var axios = axios_default.a.create(axiosOptions); // Extend axios proto

  extendAxiosInstance(axios); // Setup interceptors

  setupProgress(axios, ctx); // Inject axios to the context as $axios

  ctx.$axios = axios;
  inject('axios', axios);
});
// EXTERNAL MODULE: ./node_modules/vuetify/dist/vuetify.js
var vuetify = __webpack_require__(223);
var vuetify_default = /*#__PURE__*/__webpack_require__.n(vuetify);

// EXTERNAL MODULE: ./node_modules/vuetify/es5/util/colors.js
var colors = __webpack_require__(21);
var colors_default = /*#__PURE__*/__webpack_require__.n(colors);

// CONCATENATED MODULE: ./plugins/vuetify.js



vue_runtime_esm["default"].use(vuetify_default.a, {
  theme: {
    primary: '#7199ff',
    // a color that is not in the material colors palette
    accent: colors_default.a.grey.darken3,
    secondary: colors_default.a.amber.darken3,
    info: colors_default.a.teal.lighten1,
    warning: colors_default.a.amber.base,
    error: colors_default.a.deepOrange.accent4,
    success: colors_default.a.green.accent3
  }
});
// EXTERNAL MODULE: ./plugins/axios.js
var plugins_axios = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/vue-i18n/dist/vue-i18n.esm.js
var vue_i18n_esm = __webpack_require__(68);

// CONCATENATED MODULE: ./plugins/i18n.js




vue_runtime_esm["default"].use(vue_i18n_esm["a" /* default */]);
var i18n = new vue_i18n_esm["a" /* default */]({
  locale: 1,
  messages: {}
});
/* harmony default export */ var plugins_i18n = (/*#__PURE__*/(function () {
  var _ref2 = asyncToGenerator_default()(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var app, store, $axios, _ref3, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = _ref.app, store = _ref.store, $axios = _ref.$axios;
            _context.next = 3;
            return $axios.get('extension/module/d_visualize/load_language');

          case 3:
            _ref3 = _context.sent;
            data = _ref3.data;
            i18n.setLocaleMessage(data.locale, data.messages[data.locale]);
            i18n.locale = data.locale;
            app.i18n = i18n;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})());
// CONCATENATED MODULE: ./plugins/nuxt-client-init.js
/* harmony default export */ var nuxt_client_init = (function (ctx) {
  ctx.store.dispatch('nuxtClientInit', ctx);
});
// EXTERNAL MODULE: C:/OpenServer/domains/localhost/302/d_visualize/node_modules/moment/moment.js
var moment = __webpack_require__(0);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// CONCATENATED MODULE: ./plugins/opencart_helpers.js



 //constans

var LOAD = {
  LOADING: 'loading',
  WAITING: 'waiting',
  SUCCESS: 'success',
  FAIL: 'fail'
};
vue_runtime_esm["default"].filter('image', function (value) {
  if (!value) return '';
  value = value.toString();
  return 'view/image/d_visualize/' + value;
});
vue_runtime_esm["default"].filter('formatDate', function (value) {
  if (value) {
    return moment_default()(String(value)).format('MMMM Do, h:mm:ss a');
  }
});
// CONCATENATED MODULE: ./.nuxt/index.js
















/* Plugins */

 // Source: ./axios.js

 // Source: ..\\plugins\\vuetify

 // Source: ..\\plugins\\axios

 // Source: ..\\plugins\\i18n

 // Source: ..\\plugins\\nuxt-client-init

 // Source: ..\\plugins\\opencart_helpers
// Component: <no-ssr>

vue_runtime_esm["default"].component(no_ssr.name, no_ssr); // Component: <nuxt-child>

vue_runtime_esm["default"].component(nuxt_child.name, nuxt_child); // Component: <nuxt-link>

vue_runtime_esm["default"].component(nuxt_link.name, nuxt_link); // Component: <nuxt>`

vue_runtime_esm["default"].component(nuxt.name, nuxt); // vue-meta configuration

vue_runtime_esm["default"].use(vue_meta_default.a, {
  keyName: 'head',
  // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head',
  // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr',
  // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag

});
var defaultTransition = {
  "name": "page",
  "mode": "out-in",
  "appear": true,
  "appearClass": "appear",
  "appearActiveClass": "appear-active",
  "appearToClass": "appear-to"
};

function createApp(_x) {
  return _createApp.apply(this, arguments);
}

function _createApp() {
  _createApp = asyncToGenerator_default()(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(ssrContext) {
    var router, store, app, next, route, path, inject;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return createRouter(ssrContext);

          case 2:
            router = _context2.sent;
            store = createStore(ssrContext); // Add this.$router into store actions/mutations

            store.$router = router; // Create Root instance
            // here we inject the router and store to all child components,
            // making them available everywhere as `this.$router` and `this.$store`.

            app = objectSpread_default()({
              router: router,
              store: store,
              nuxt: {
                defaultTransition: defaultTransition,
                transitions: [defaultTransition],
                setTransitions: function setTransitions(transitions) {
                  if (!Array.isArray(transitions)) {
                    transitions = [transitions];
                  }

                  transitions = transitions.map(function (transition) {
                    if (!transition) {
                      transition = defaultTransition;
                    } else if (typeof transition === 'string') {
                      transition = Object.assign({}, defaultTransition, {
                        name: transition
                      });
                    } else {
                      transition = Object.assign({}, defaultTransition, transition);
                    }

                    return transition;
                  });
                  this.$options.nuxt.transitions = transitions;
                  return transitions;
                },
                err: null,
                dateErr: null,
                error: function error(err) {
                  err = err || null;
                  app.context._errored = !!err;
                  if (typeof err === 'string') err = {
                    statusCode: 500,
                    message: err
                  };
                  var nuxt = this.nuxt || this.$options.nuxt;
                  nuxt.dateErr = Date.now();
                  nuxt.err = err; // Used in lib/server.js

                  if (ssrContext) ssrContext.nuxt.error = err;
                  return err;
                }
              }
            }, App); // Make app available into store via this.app

            store.app = app;
            next = ssrContext ? ssrContext.next : function (location) {
              return app.router.push(location);
            }; // Resolve route

            if (ssrContext) {
              route = router.resolve(ssrContext.url).route;
            } else {
              path = getLocation(router.options.base);
              route = router.resolve(path).route;
            } // Set context to app.context


            _context2.next = 11;
            return setContext(app, {
              route: route,
              next: next,
              error: app.nuxt.error.bind(app),
              store: store,
              payload: ssrContext ? ssrContext.payload : undefined,
              req: ssrContext ? ssrContext.req : undefined,
              res: ssrContext ? ssrContext.res : undefined,
              beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined
            });

          case 11:
            inject = function inject(key, value) {
              if (!key) throw new Error('inject(key, value) has no key provided');
              if (!value) throw new Error('inject(key, value) has no value provided');
              key = '$' + key; // Add into app

              app[key] = value; // Add into store

              store[key] = app[key]; // Check if plugin not already installed

              var installKey = '__nuxt_' + key + '_installed__';
              if (vue_runtime_esm["default"][installKey]) return;
              vue_runtime_esm["default"][installKey] = true; // Call Vue.use() to install the plugin into vm

              vue_runtime_esm["default"].use(function () {
                if (!vue_runtime_esm["default"].prototype.hasOwnProperty(key)) {
                  Object.defineProperty(vue_runtime_esm["default"].prototype, key, {
                    get: function get() {
                      return this.$root.$options[key];
                    }
                  });
                }
              });
            };

            if (true) {
              // Replace store state before plugins execution
              if (window.__NUXT__ && window.__NUXT__.state) {
                store.replaceState(window.__NUXT__.state);
              }
            } // Plugin execution


            if (!(typeof _nuxt_axios === 'function')) {
              _context2.next = 16;
              break;
            }

            _context2.next = 16;
            return _nuxt_axios(app.context, inject);

          case 16:
            if (!(typeof /* Cannot get final name for export "default" in "./plugins/vuetify.js" (known exports: , known reexports: ) */ undefined === 'function')) {
              _context2.next = 19;
              break;
            }

            _context2.next = 19;
            return /* Cannot get final name for export "default" in "./plugins/vuetify.js" (known exports: , known reexports: ) */ undefined(app.context, inject);

          case 19:
            if (!(typeof plugins_axios["a" /* default */] === 'function')) {
              _context2.next = 22;
              break;
            }

            _context2.next = 22;
            return Object(plugins_axios["a" /* default */])(app.context, inject);

          case 22:
            if (!(typeof plugins_i18n === 'function')) {
              _context2.next = 25;
              break;
            }

            _context2.next = 25;
            return plugins_i18n(app.context, inject);

          case 25:
            if (!(typeof nuxt_client_init === 'function')) {
              _context2.next = 28;
              break;
            }

            _context2.next = 28;
            return nuxt_client_init(app.context, inject);

          case 28:
            if (!(typeof /* Cannot get final name for export "default" in "./plugins/opencart_helpers.js" (known exports: , known reexports: ) */ undefined === 'function')) {
              _context2.next = 31;
              break;
            }

            _context2.next = 31;
            return /* Cannot get final name for export "default" in "./plugins/opencart_helpers.js" (known exports: , known reexports: ) */ undefined(app.context, inject);

          case 31:
            if (true) {
              _context2.next = 34;
              break;
            }

            _context2.next = 34;
            return new Promise(function (resolve, reject) {
              router.push(ssrContext.url, resolve, function () {
                // navigated to a different route in router guard
                var unregister = router.afterEach(
                /*#__PURE__*/
                function () {
                  var _ref = asyncToGenerator_default()(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(to, from, next) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            ssrContext.url = to.fullPath;
                            _context.next = 3;
                            return getRouteData(to);

                          case 3:
                            app.context.route = _context.sent;
                            app.context.params = to.params || {};
                            app.context.query = to.query || {};
                            unregister();
                            resolve();

                          case 8:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x2, _x3, _x4) {
                    return _ref.apply(this, arguments);
                  };
                }());
              });
            });

          case 34:
            return _context2.abrupt("return", {
              app: app,
              router: router,
              store: store
            });

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _createApp.apply(this, arguments);
}


// CONCATENATED MODULE: ./.nuxt/client.js






















var client_noopData = function noopData() {
  return {};
};

var noopFetch = function noopFetch() {}; // Global shared references


var _lastPaths = [];
var client_app;
var client_router;
var client_store; // Try to rehydrate SSR data from window

var NUXT = window.__NUXT__ || {};
Object.assign(vue_runtime_esm["default"].config, {
  "silent": false,
  "performance": true
}); // Setup global Vue error handler

var defaultErrorHandler = vue_runtime_esm["default"].config.errorHandler;

vue_runtime_esm["default"].config.errorHandler = function (err, vm, info) {
  var nuxtError = {
    statusCode: err.statusCode || err.name || 'Whoops!',
    message: err.message || err.toString() // Call other handler if exist

  };
  var handled = null;

  if (typeof defaultErrorHandler === 'function') {
    for (var _len = arguments.length, rest = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    handled = defaultErrorHandler.apply(void 0, [err, vm, info].concat(rest));
  }

  if (handled === true) {
    return handled;
  } // Show Nuxt Error Page


  if (vm && vm.$root && vm.$root.$nuxt && vm.$root.$nuxt.error && info !== 'render function') {
    vm.$root.$nuxt.error(nuxtError);
  }

  if (typeof defaultErrorHandler === 'function') {
    return handled;
  } // Log to console


  if (false) {} else {
    console.error(err.message || nuxtError.message);
  }
}; // Create and mount App


createApp().then(mountApp).catch(function (err) {
  console.error('[nuxt] Error while initializing app', err);
});

function componentOption(component, key) {
  if (!component || !component.options || !component.options[key]) {
    return {};
  }

  var option = component.options[key];

  if (typeof option === 'function') {
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    return option.apply(void 0, args);
  }

  return option;
}

function mapTransitions(Components, to, from) {
  var componentTransitions = function componentTransitions(component) {
    var transition = componentOption(component, 'transition', to, from) || {};
    return typeof transition === 'string' ? {
      name: transition
    } : transition;
  };

  return Components.map(function (Component) {
    // Clone original object to prevent overrides
    var transitions = Object.assign({}, componentTransitions(Component)); // Combine transitions & prefer `leave` transitions of 'from' route

    if (from && from.matched.length && from.matched[0].components.default) {
      var from_transitions = componentTransitions(from.matched[0].components.default);
      Object.keys(from_transitions).filter(function (key) {
        return from_transitions[key] && key.toLowerCase().indexOf('leave') !== -1;
      }).forEach(function (key) {
        transitions[key] = from_transitions[key];
      });
    }

    return transitions;
  });
}

function loadAsyncComponents(_x, _x2, _x3) {
  return _loadAsyncComponents.apply(this, arguments);
}

function _loadAsyncComponents() {
  _loadAsyncComponents = asyncToGenerator_default()(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(to, from, next) {
    var _this4 = this;

    var Components, startLoader, statusCode;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Check if route path changed (this._pathChanged), only if the page is not an error (for validate())
            this._pathChanged = !!client_app.nuxt.err || from.path !== to.path;
            this._queryChanged = JSON.stringify(to.query) !== JSON.stringify(from.query);
            this._diffQuery = this._queryChanged ? getQueryDiff(to.query, from.query) : [];

            if (this._pathChanged && this.$loading.start && !this.$loading.manual) {
              this.$loading.start();
            }

            _context3.prev = 4;
            _context3.next = 7;
            return resolveRouteComponents(to);

          case 7:
            Components = _context3.sent;

            if (!this._pathChanged && this._queryChanged) {
              // Add a marker on each component that it needs to refresh or not
              startLoader = Components.some(function (Component) {
                var watchQuery = Component.options.watchQuery;
                if (watchQuery === true) return true;

                if (Array.isArray(watchQuery)) {
                  return watchQuery.some(function (key) {
                    return _this4._diffQuery[key];
                  });
                }

                return false;
              });

              if (startLoader && this.$loading.start && !this.$loading.manual) {
                this.$loading.start();
              }
            } // Call next()


            next();
            _context3.next = 19;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](4);
            _context3.t0 = _context3.t0 || {};
            statusCode = _context3.t0.statusCode || _context3.t0.status || _context3.t0.response && _context3.t0.response.status || 500;
            this.error({
              statusCode: statusCode,
              message: _context3.t0.message
            });
            this.$nuxt.$emit('routeChanged', to, from, _context3.t0);
            next(false);

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[4, 12]]);
  }));
  return _loadAsyncComponents.apply(this, arguments);
}

function applySSRData(Component, ssrData) {
  if (NUXT.serverRendered && ssrData) {
    applyAsyncData(Component, ssrData);
  }

  Component._Ctor = Component;
  return Component;
} // Get matched components


function resolveComponents(router) {
  var path = getLocation(router.options.base, router.options.mode);
  return flatMapComponents(router.match(path),
  /*#__PURE__*/
  function () {
    var _ref = asyncToGenerator_default()(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(Component, _, match, key, index) {
      var _Component;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof Component === 'function' && !Component.options)) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return Component();

            case 3:
              Component = _context.sent;

            case 4:
              // Sanitize it and save it
              _Component = applySSRData(sanitizeComponent(Component), NUXT.data ? NUXT.data[index] : null);
              match.components[key] = _Component;
              return _context.abrupt("return", _Component);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x4, _x5, _x6, _x7, _x8) {
      return _ref.apply(this, arguments);
    };
  }());
}

function callMiddleware(Components, context, layout) {
  var _this = this;

  var midd = [];
  var unknownMiddleware = false; // If layout is undefined, only call global middleware

  if (typeof layout !== 'undefined') {
    midd = []; // Exclude global middleware if layout defined (already called before)

    if (layout.middleware) {
      midd = midd.concat(layout.middleware);
    }

    Components.forEach(function (Component) {
      if (Component.options.middleware) {
        midd = midd.concat(Component.options.middleware);
      }
    });
  }

  midd = midd.map(function (name) {
    if (typeof name === 'function') return name;

    if (typeof _nuxt_middleware[name] !== 'function') {
      unknownMiddleware = true;

      _this.error({
        statusCode: 500,
        message: 'Unknown middleware ' + name
      });
    }

    return _nuxt_middleware[name];
  });
  if (unknownMiddleware) return;
  return middlewareSeries(midd, context);
}

function client_render(_x9, _x10, _x11) {
  return _render.apply(this, arguments);
} // Fix components format in matched, it's due to code-splitting of vue-router


function _render() {
  _render = asyncToGenerator_default()(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(to, from, next) {
    var _this5 = this;

    var fromMatches, nextCalled, _next, matches, Components, layout, _layout, isValid, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, Component, errorResponseStatus, _layout2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(this._pathChanged === false && this._queryChanged === false)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", next());

          case 2:
            // Handle first render on SPA mode
            if (to === from) _lastPaths = [];else {
              fromMatches = [];
              _lastPaths = getMatchedComponents(from, fromMatches).map(function (Component, i) {
                return compile(from.matched[fromMatches[i]].path)(from.params);
              });
            } // nextCalled is true when redirected

            nextCalled = false;

            _next = function _next(path) {
              if (from.path === path.path && _this5.$loading.finish) {
                _this5.$loading.finish();
              }

              if (from.path !== path.path && _this5.$loading.pause) {
                _this5.$loading.pause();
              }

              if (nextCalled) return;
              nextCalled = true;
              next(path);
            }; // Update context


            _context4.next = 7;
            return setContext(client_app, {
              route: to,
              from: from,
              next: _next.bind(this)
            });

          case 7:
            this._dateLastError = client_app.nuxt.dateErr;
            this._hadError = !!client_app.nuxt.err; // Get route's matched components

            matches = [];
            Components = getMatchedComponents(to, matches); // If no Components matched, generate 404

            if (Components.length) {
              _context4.next = 25;
              break;
            }

            _context4.next = 14;
            return callMiddleware.call(this, Components, client_app.context);

          case 14:
            if (!nextCalled) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return");

          case 16:
            _context4.next = 18;
            return this.loadLayout(typeof nuxt_error.layout === 'function' ? nuxt_error.layout(client_app.context) : nuxt_error.layout);

          case 18:
            layout = _context4.sent;
            _context4.next = 21;
            return callMiddleware.call(this, Components, client_app.context, layout);

          case 21:
            if (!nextCalled) {
              _context4.next = 23;
              break;
            }

            return _context4.abrupt("return");

          case 23:
            // Show error page
            client_app.context.error({
              statusCode: 404,
              message: "This page could not be found"
            });
            return _context4.abrupt("return", next());

          case 25:
            // Update ._data and other properties if hot reloaded
            Components.forEach(function (Component) {
              if (Component._Ctor && Component._Ctor.options) {
                Component.options.asyncData = Component._Ctor.options.asyncData;
                Component.options.fetch = Component._Ctor.options.fetch;
              }
            }); // Apply transitions

            this.setTransitions(mapTransitions(Components, to, from));
            _context4.prev = 27;
            _context4.next = 30;
            return callMiddleware.call(this, Components, client_app.context);

          case 30:
            if (!nextCalled) {
              _context4.next = 32;
              break;
            }

            return _context4.abrupt("return");

          case 32:
            if (!client_app.context._errored) {
              _context4.next = 34;
              break;
            }

            return _context4.abrupt("return", next());

          case 34:
            // Set layout
            _layout = Components[0].options.layout;

            if (typeof _layout === 'function') {
              _layout = _layout(client_app.context);
            }

            _context4.next = 38;
            return this.loadLayout(_layout);

          case 38:
            _layout = _context4.sent;
            _context4.next = 41;
            return callMiddleware.call(this, Components, client_app.context, _layout);

          case 41:
            if (!nextCalled) {
              _context4.next = 43;
              break;
            }

            return _context4.abrupt("return");

          case 43:
            if (!client_app.context._errored) {
              _context4.next = 45;
              break;
            }

            return _context4.abrupt("return", next());

          case 45:
            // Call .validate()
            isValid = true;
            _context4.prev = 46;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context4.prev = 50;
            _iterator = Components[Symbol.iterator]();

          case 52:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context4.next = 64;
              break;
            }

            Component = _step.value;

            if (!(typeof Component.options.validate !== 'function')) {
              _context4.next = 56;
              break;
            }

            return _context4.abrupt("continue", 61);

          case 56:
            _context4.next = 58;
            return Component.options.validate(client_app.context);

          case 58:
            isValid = _context4.sent;

            if (isValid) {
              _context4.next = 61;
              break;
            }

            return _context4.abrupt("break", 64);

          case 61:
            _iteratorNormalCompletion = true;
            _context4.next = 52;
            break;

          case 64:
            _context4.next = 70;
            break;

          case 66:
            _context4.prev = 66;
            _context4.t0 = _context4["catch"](50);
            _didIteratorError = true;
            _iteratorError = _context4.t0;

          case 70:
            _context4.prev = 70;
            _context4.prev = 71;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 73:
            _context4.prev = 73;

            if (!_didIteratorError) {
              _context4.next = 76;
              break;
            }

            throw _iteratorError;

          case 76:
            return _context4.finish(73);

          case 77:
            return _context4.finish(70);

          case 78:
            _context4.next = 84;
            break;

          case 80:
            _context4.prev = 80;
            _context4.t1 = _context4["catch"](46);
            // ...If .validate() threw an error
            this.error({
              statusCode: _context4.t1.statusCode || '500',
              message: _context4.t1.message
            });
            return _context4.abrupt("return", next());

          case 84:
            if (isValid) {
              _context4.next = 87;
              break;
            }

            this.error({
              statusCode: 404,
              message: "This page could not be found"
            });
            return _context4.abrupt("return", next());

          case 87:
            _context4.next = 89;
            return Promise.all(Components.map(function (Component, i) {
              // Check if only children route changed
              Component._path = compile(to.matched[matches[i]].path)(to.params);
              Component._dataRefresh = false; // Check if Component need to be refreshed (call asyncData & fetch)
              // Only if its slug has changed or is watch query changes

              if (_this5._pathChanged && _this5._queryChanged || Component._path !== _lastPaths[i]) {
                Component._dataRefresh = true;
              } else if (!_this5._pathChanged && _this5._queryChanged) {
                var watchQuery = Component.options.watchQuery;

                if (watchQuery === true) {
                  Component._dataRefresh = true;
                } else if (Array.isArray(watchQuery)) {
                  Component._dataRefresh = watchQuery.some(function (key) {
                    return _this5._diffQuery[key];
                  });
                }
              }

              if (!_this5._hadError && _this5._isMounted && !Component._dataRefresh) {
                return Promise.resolve();
              }

              var promises = [];
              var hasAsyncData = Component.options.asyncData && typeof Component.options.asyncData === 'function';
              var hasFetch = !!Component.options.fetch;
              var loadingIncrease = hasAsyncData && hasFetch ? 30 : 45; // Call asyncData(context)

              if (hasAsyncData) {
                var promise = promisify(Component.options.asyncData, client_app.context).then(function (asyncDataResult) {
                  applyAsyncData(Component, asyncDataResult);

                  if (_this5.$loading.increase) {
                    _this5.$loading.increase(loadingIncrease);
                  }
                });
                promises.push(promise);
              } // Check disabled page loading


              _this5.$loading.manual = Component.options.loading === false; // Call fetch(context)

              if (hasFetch) {
                var p = Component.options.fetch(client_app.context);

                if (!p || !(p instanceof Promise) && typeof p.then !== 'function') {
                  p = Promise.resolve(p);
                }

                p.then(function (fetchResult) {
                  if (_this5.$loading.increase) {
                    _this5.$loading.increase(loadingIncrease);
                  }
                });
                promises.push(p);
              }

              return Promise.all(promises);
            }));

          case 89:
            // If not redirected
            if (!nextCalled) {
              if (this.$loading.finish && !this.$loading.manual) {
                this.$loading.finish();
              }

              next();
            }

            _context4.next = 111;
            break;

          case 92:
            _context4.prev = 92;
            _context4.t2 = _context4["catch"](27);

            if (_context4.t2) {
              _context4.next = 98;
              break;
            }

            _context4.t2 = {};
            _context4.next = 100;
            break;

          case 98:
            if (!(_context4.t2.message === 'ERR_REDIRECT')) {
              _context4.next = 100;
              break;
            }

            return _context4.abrupt("return", this.$nuxt.$emit('routeChanged', to, from, _context4.t2));

          case 100:
            _lastPaths = [];
            errorResponseStatus = _context4.t2.response && _context4.t2.response.status;
            _context4.t2.statusCode = _context4.t2.statusCode || _context4.t2.status || errorResponseStatus || 500;
            globalHandleError(_context4.t2); // Load error layout

            _layout2 = nuxt_error.layout;

            if (typeof _layout2 === 'function') {
              _layout2 = _layout2(client_app.context);
            }

            _context4.next = 108;
            return this.loadLayout(_layout2);

          case 108:
            this.error(_context4.t2);
            this.$nuxt.$emit('routeChanged', to, from, _context4.t2);
            next(false);

          case 111:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[27, 92], [46, 80], [50, 66, 70, 78], [71,, 73, 77]]);
  }));
  return _render.apply(this, arguments);
}

function normalizeComponents(to, ___) {
  flatMapComponents(to, function (Component, _, match, key) {
    if (typeof_default()(Component) === 'object' && !Component.options) {
      // Updated via vue-router resolveAsyncComponents()
      Component = vue_runtime_esm["default"].extend(Component);
      Component._Ctor = Component;
      match.components[key] = Component;
    }

    return Component;
  });
}

function showNextPage(to) {
  // Hide error component if no error
  if (this._hadError && this._dateLastError === this.$options.nuxt.dateErr) {
    this.error();
  } // Set layout


  var layout = this.$options.nuxt.err ? nuxt_error.layout : to.matched[0].components.default.options.layout;

  if (typeof layout === 'function') {
    layout = layout(client_app.context);
  }

  this.setLayout(layout);
} // When navigating on a different route but the same component is used, Vue.js
// Will not update the instance data, so we have to update $data ourselves


function fixPrepatch(to, ___) {
  var _this2 = this;

  if (this._pathChanged === false && this._queryChanged === false) return;
  vue_runtime_esm["default"].nextTick(function () {
    var matches = [];
    var instances = getMatchedComponentsInstances(to, matches);
    var Components = getMatchedComponents(to, matches);
    instances.forEach(function (instance, i) {
      if (!instance) return; // if (
      //   !this._queryChanged &&
      //   to.matched[matches[i]].path.indexOf(':') === -1 &&
      //   to.matched[matches[i]].path.indexOf('*') === -1
      // ) return // If not a dynamic route, skip

      if (instance.constructor._dataRefresh && Components[i] === instance.constructor && typeof instance.constructor.options.data === 'function') {
        var newData = instance.constructor.options.data.call(instance);

        for (var key in newData) {
          vue_runtime_esm["default"].set(instance.$data, key, newData[key]);
        }
      }
    });
    showNextPage.call(_this2, to); // Hot reloading

    setTimeout(function () {
      return hotReloadAPI(_this2);
    }, 100);
  });
}

function nuxtReady(_app) {
  window._nuxtReadyCbs.forEach(function (cb) {
    if (typeof cb === 'function') {
      cb(_app);
    }
  }); // Special JSDOM


  if (typeof window._onNuxtLoaded === 'function') {
    window._onNuxtLoaded(_app);
  } // Add router hooks


  client_router.afterEach(function (to, from) {
    // Wait for fixPrepatch + $data updates
    vue_runtime_esm["default"].nextTick(function () {
      return _app.$nuxt.$emit('routeChanged', to, from);
    });
  });
} // Special hot reload with asyncData(context)


function getNuxtChildComponents($parent) {
  var $components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  $parent.$children.forEach(function ($child) {
    if ($child.$vnode.data.nuxtChild && !$components.find(function (c) {
      return c.$options.__file === $child.$options.__file;
    })) {
      $components.push($child);
    }

    if ($child.$children && $child.$children.length) {
      getNuxtChildComponents($child, $components);
    }
  });
  return $components;
}

function hotReloadAPI(_app) {
  if (true) return;
  var $components = getNuxtChildComponents(_app.$nuxt, []);
  $components.forEach(addHotReload.bind(_app));
}

function addHotReload($component, depth) {
  var _this3 = this;

  if ($component.$vnode.data._hasHotReload) return;
  $component.$vnode.data._hasHotReload = true;

  var _forceUpdate = $component.$forceUpdate.bind($component.$parent);

  $component.$vnode.context.$forceUpdate =
  /*#__PURE__*/
  asyncToGenerator_default()(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var Components, Component, promises, next, context;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            Components = getMatchedComponents(client_router.currentRoute);
            Component = Components[depth];

            if (Component) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", _forceUpdate());

          case 4:
            if (typeof_default()(Component) === 'object' && !Component.options) {
              // Updated via vue-router resolveAsyncComponents()
              Component = vue_runtime_esm["default"].extend(Component);
              Component._Ctor = Component;
            }

            _this3.error();

            promises = [];

            next = function next(path) {
              this.$loading.finish && this.$loading.finish();
              client_router.push(path);
            };

            _context2.next = 10;
            return setContext(client_app, {
              route: client_router.currentRoute,
              isHMR: true,
              next: next.bind(_this3)
            });

          case 10:
            context = client_app.context;
            if (_this3.$loading.start && !_this3.$loading.manual) _this3.$loading.start();
            callMiddleware.call(_this3, Components, context).then(function () {
              // If layout changed
              if (depth !== 0) return Promise.resolve();
              var layout = Component.options.layout || 'default';

              if (typeof layout === 'function') {
                layout = layout(context);
              }

              if (_this3.layoutName === layout) return Promise.resolve();

              var promise = _this3.loadLayout(layout);

              promise.then(function () {
                _this3.setLayout(layout);

                vue_runtime_esm["default"].nextTick(function () {
                  return hotReloadAPI(_this3);
                });
              });
              return promise;
            }).then(function () {
              return callMiddleware.call(_this3, Components, context, _this3.layout);
            }).then(function () {
              // Call asyncData(context)
              var pAsyncData = promisify(Component.options.asyncData || client_noopData, context);
              pAsyncData.then(function (asyncDataResult) {
                applyAsyncData(Component, asyncDataResult);
                _this3.$loading.increase && _this3.$loading.increase(30);
              });
              promises.push(pAsyncData); // Call fetch()

              Component.options.fetch = Component.options.fetch || noopFetch;
              var pFetch = Component.options.fetch(context);

              if (!pFetch || !(pFetch instanceof Promise) && typeof pFetch.then !== 'function') {
                pFetch = Promise.resolve(pFetch);
              }

              pFetch.then(function () {
                return _this3.$loading.increase && _this3.$loading.increase(30);
              });
              promises.push(pFetch);
              return Promise.all(promises);
            }).then(function () {
              _this3.$loading.finish && _this3.$loading.finish();

              _forceUpdate();

              setTimeout(function () {
                return hotReloadAPI(_this3);
              }, 100);
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
}

function mountApp(_x12) {
  return _mountApp.apply(this, arguments);
}

function _mountApp() {
  _mountApp = asyncToGenerator_default()(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(__app) {
    var Components, _app, mount;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // Set global variables
            client_app = __app.app;
            client_router = __app.router;
            client_store = __app.store; // Resolve route components

            _context5.next = 5;
            return Promise.all(resolveComponents(client_router));

          case 5:
            Components = _context5.sent;
            // Create Vue instance
            _app = new vue_runtime_esm["default"](client_app); // Mounts Vue app to DOM element

            mount = function mount() {
              _app.$mount('#__nuxt'); // Listen for first Vue update


              vue_runtime_esm["default"].nextTick(function () {
                // Call window.onNuxtReady callbacks
                nuxtReady(_app); // Enable hot reloading

                hotReloadAPI(_app);
              });
            }; // Enable transitions


            _app.setTransitions = _app.$options.nuxt.setTransitions.bind(_app);

            if (Components.length) {
              _app.setTransitions(mapTransitions(Components, client_router.currentRoute));

              _lastPaths = client_router.currentRoute.matched.map(function (route) {
                return compile(route.path)(client_router.currentRoute.params);
              });
            } // Initialize error handler


            _app.$loading = {}; // To avoid error while _app.$nuxt does not exist

            if (NUXT.error) _app.error(NUXT.error); // Add router hooks

            client_router.beforeEach(loadAsyncComponents.bind(_app));
            client_router.beforeEach(client_render.bind(_app));
            client_router.afterEach(normalizeComponents);
            client_router.afterEach(fixPrepatch.bind(_app)); // If page already is server rendered

            if (!NUXT.serverRendered) {
              _context5.next = 19;
              break;
            }

            mount();
            return _context5.abrupt("return");

          case 19:
            // First render on client-side
            client_render.call(_app, client_router.currentRoute, client_router.currentRoute, function (path) {
              // If not redirected
              if (!path) {
                normalizeComponents(client_router.currentRoute, client_router.currentRoute);
                showNextPage.call(_app, client_router.currentRoute); // Don't call fixPrepatch.call(_app, router.currentRoute, router.currentRoute) since it's first render

                mount();
                return;
              } // Push the path and then mount app


              client_router.push(path, function () {
                return mount();
              }, function (err) {
                if (!err) return mount();
                console.error(err);
              });
            });

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _mountApp.apply(this, arguments);
}

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(224);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var $axios = _ref.$axios,
      store = _ref.store;

  if (false) {} // Request interceptor


  $axios.interceptors.request.use(function (request) {
    if (true) {
      request.baseURL = window.location.origin + window.location.pathname;
    }

    var url = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* getUrlOpencart */ "a"])(request.baseURL, false);
    url.route = request.url;
    /* DEV only on 302 */

    if (false) {}

    request.baseURL = url.makeUrl();
    request.url = '';
    return request;
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(62)))

/***/ })

},[[225,2,1]]]);