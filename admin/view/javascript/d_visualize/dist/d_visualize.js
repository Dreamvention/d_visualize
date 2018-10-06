"use strict";

var d_visualize = {
  initState: function initState(state) {
    this.state = $.extend({}, this.state, state);
  },
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  routes: []
};

d_visualize.actions['SAVE_CONTENT'] = function (context, payload) {
  context.commit('LOADING_START');
  $.post(context.state.config.save_url, {
    setting: {
      active_template: context.state.setting.active_template,
      auto_save: +context.state.setting.auto_save
    },
    status: +context.state.setting.status
  }, function (data, status) {
    if (status === 'success') {
      context.commit('LOADING_SUCCESS');
      alertify.success(data['success']);

      if (!_.isUndefined(payload) && !_.isUndefined(payload.callback) && _.isFunction(payload.callback)) {
        payload.callback(data);
      }
    }

    context.commit('LOADING_END');
  }, 'json').fail(function (e, m) {
    context.commit('LOADING_FAIL');
    alertify.error(m);
    alertify.error(app.$i18n.t('error.save_content'));
  });
};

d_visualize.actions['LOAD_CONTENT'] = function (context, payload) {
  context.commit('LOADING_START');
  $.post(context.state.config.load_setting_url, {
    type: 'common',
    'id': 0
  }, function (data, status) {
    if (status === 'success') {
      context.commit('LOAD_CONTENT_SUCCESS', data);
      context.commit('LOADING_SUCCESS');
    }

    if (status === 'error') {
      context.commit('LOAD_CONTENT_FAIL', data);
      context.commit('LOADING_FAIL');
    }

    context.commit('LOADING_END');
  }, 'json').fail(function () {
    alertify.error(app.$i18n.t('error.load_content'));
    context.commit('LOADING_FAIL');
  });
};

d_visualize.actions['LOADING_START'] = function (context, payload) {
  context.commit('LOADING_START');
};

d_visualize.actions['LOADING_END'] = function (context, payload) {
  context.commit('LOADING_END');
};

d_visualize.actions['ENTER_EDIT'] = function (context, payload) {
  $('body').addClass('edit');
};

d_visualize.actions['LEAVE_EDIT'] = function (context, payload) {
  $('body').removeClass('edit');
};

d_visualize.actions['HIDE_MENU'] = function (context, payload) {
  context.commit('HIDE_MENU', payload);
};

d_visualize.actions['SHOW_MENU'] = function (context, payload) {
  context.commit('SHOW_MENU', payload);
};

d_visualize.actions['CHANGE_CURRENT_COMPONENT'] = function (context, payload) {
  context.commit('CHANGE_CURRENT_COMPONENT', payload);
};

d_visualize.actions['SAVE_TEMPLATE'] = function (context, payload) {
  // context.commit('LOADING_START');
  $.post(context.state.config.save_template_url, {
    template_codename: context.getters.setting.active_template,
    template: JSON.stringify(context.getters.active_template)
  }, function (data, status) {
    if (status === 'success') {
      context.dispatch('RELOAD_IFRAME'); // context.commit('LOADING_END');

      alertify.success(data['success']);
    }
  }, 'json').fail(function (e, m) {
    // context.commit('LOADING_END');
    alertify.error(m);
    alertify.error(app.$i18n.t('error.save_content'));
  });
};

d_visualize.actions['UPDATE_SKIN'] = function (context, payload) {
  context.commit('UPDATE_SKIN', payload);

  var changable_components = _.pick(context.getters.components, function (component, key) {
    return _.find(_.keys(context.getters.available_components[key]), function (c_key) {
      return c_key == payload.skin;
    });
  });

  _.map(changable_components, function (component, key) {
    context.dispatch('UPDATE_COMPONENT', {
      active_template_id: context.getters.setting.active_template,
      component_id: key,
      component_skin: payload.skin
    });
  }); // context.dispatch('SAVE_TEMPLATE')

};

d_visualize.actions['UPDATE_COMPONENT'] = function (context, payload) {
  context.commit('UPDATE_COMPONENT', payload); // context.dispatch('SAVE_TEMPLATE')
};

d_visualize.actions['CHANGE_TEMPLATE'] = function (context, payload) {
  context.commit('CHANGE_TEMPLATE', payload);

  if (context.getters.setting.auto_save) {
    context.dispatch('SAVE_CONTENT');
  }
};

d_visualize.actions['POP_EDIT_HISTORY'] = function (context, payload) {
  context.commit('POP_EDIT_HISTORY', payload);
};

d_visualize.actions['PUSH_EDIT_HISTORY'] = function (context, payload) {
  context.commit('PUSH_EDIT_HISTORY', payload);
};

d_visualize.actions['CHANGE_PAGE'] = function (context, payload) {
  context.commit('CHANGE_PAGE', payload);
};

d_visualize.actions['RELOAD_IFRAME'] = function (context, payload) {
  $('iframe')[0].contentWindow.location.reload();
};

d_visualize.actions['PUSH_IFRAME_HISTORY'] = function (context, payload) {
  context.commit('PUSH_IFRAME_HISTORY', payload);
  context.dispatch('CHANGE_PAGE', payload); //saving on the server last url

  var last_visited_url = 'http://localhost/index.php?route=common/home';

  if (context.getters.iframe_history[context.getters.iframe_history.length - 1].href) {
    last_visited_url = context.getters.iframe_history[context.getters.iframe_history.length - 1].href;
  }

  $.post(context.state.config.save_iframe_url, {
    last_url: last_visited_url
  }, function (data, status) {
    if (status === 'success') {}
  }, 'json').fail(function (e, m) {
    // context.commit('LOADING_END');
    alertify.error(m);
    alertify.error(app.$i18n.t('error.save_content'));
  });
  ;
};

d_visualize.actions['CHANGE_NAVIGATION_CONTEXT'] = function (context, payload) {
  var navigation = [];
  navigation.push({
    href: '/edit/vdh',
    text: 'edit.vdh'
  });
  navigation = navigation.concat(Object.keys(context.getters.components).map(function (c) {
    return {
      href: '/edit/components/' + c,
      text: 'edit.entry_' + c
    };
  }));
  navigation.push({
    href: '/edit/vdf',
    text: 'edit.vdf'
  });
  context.commit('CHANGE_NAVIGATION_CONTEXT', navigation);
};

d_visualize.actions['PUSH_NAVIGATION_HISTORY'] = function (context, payload) {
  context.commit('PUSH_NAVIGATION_HISTORY', payload);
};

d_visualize.actions['LOAD_VISUAL_HEADER'] = function (context, payload) {
  context.commit('LOAD_VISUAL_HEADER', payload);
  context.dispatch('ENTER_VISUAL');
};

d_visualize.actions['LOAD_VISUAL_FOOTER'] = function (context, payload) {
  context.commit('LOAD_VISUAL_FOOTER', payload);
  context.dispatch('ENTER_VISUAL');
};

d_visualize.actions['ENTER_VISUAL'] = function (context, payload) {
  $('body').addClass('edit_vd');
  $('#iframe').animate({
    width: '100%'
  }, {
    duration: 500
  });
  context.dispatch('HIDE_MENU');
  context.commit('ENTER_VISUAL', payload);
};

d_visualize.actions['LEAVE_VISUAL'] = function (context, payload) {
  $('body').removeClass('edit_vd');
  context.getters.iframe_history.pop();
  var last_iframe_page = context.getters.iframe_history.pop();
  context.dispatch('SHOW_MENU');
  context.commit('CHANGE_IFRAME_SRC', last_iframe_page.href);
  context.commit('LEAVE_VISUAL', payload);
};

d_visualize.actions['CHANGE_STATUS'] = function (context, payload) {
  context.commit('CHANGE_STATUS');

  if (context.getters.setting.auto_save) {
    context.dispatch('SAVE_CONTENT');
  }
};

d_visualize.actions['CHANGE_AUTO_SAVE'] = function (context, payload) {
  context.commit('CHANGE_AUTO_SAVE');

  if (context.getters.setting.auto_save) {
    context.dispatch('SAVE_CONTENT');
  }
};

var Index = {
  LOADING: 'loading',
  WAITING: 'waiting',
  SUCCESS: 'success',
  FAIL: 'fail'
};
var COMPONENT_SETTINGS = {
  TYPE_CHECKBOX: 'checkbox',
  TYPE_SELECT: 'select'
};
Vue.component('visualize', {
  template: '#t-visualize',
  computed: {
    loading: function loading() {
      return this.$store.getters.loading;
    }
  },
  data: function data() {
    return {
      last_action: Index.WAITING
    };
  },
  methods: {},
  updated: function updated() {},
  beforeUpdate: function beforeUpdate() {
    var _this = this;

    if (this.last_action !== this.loading.status) {
      // change from one state to other
      if (this.loading.status === Index.LOADING) {
        setTimeout(function () {
          _this.$refs.topProgress.start();
        }, 100);
      } else if (this.loading.status === Index.WAITING || this.loading.status === Index.SUCCESS) {
        setTimeout(function () {
          _this.$refs.topProgress.done();
        }, 200);
      } else if (this.loading.status === Index.FAIL) {
        setTimeout(function () {
          _this.$refs.topProgress.fail();
        }, 200);
      }
    }

    this.last_action = this.loading.status; // this.last_action = this.loading.status;
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
Vue.component('vz-edit-iframe', {
  template: '#vz-edit-iframe',
  computed: {
    //currently loaded url on iframe vdh,vdf link change this src
    iframe_src: function iframe_src() {
      return this.$store.getters.iframe_src;
    },
    // added history to know where vd start his iframe to get back
    iframe_history: function iframe_history() {
      return this.$store.getters.iframe_history;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.iframeURLChange(document.getElementById("iframe"), function (newURL) {
      _this2.$store.dispatch('LOADING_START');

      console.log("URL changed:", newURL);
    });
  },
  methods: {
    iframeURLChange: function iframeURLChange(iframe, callback) {
      var unloadHandler = function unloadHandler() {
        // Timeout needed because the URL changes immediately after
        // the `unload` event is dispatched.
        setTimeout(function () {
          if (iframe.contentWindow) callback(iframe.contentWindow.location.href);
        }, 0);
      };

      function attachUnload() {
        // Remove the unloadHandler in case it was already attached.
        // Otherwise, the change will be dispatched twice.
        iframe.contentWindow.removeEventListener("unload", unloadHandler);
        iframe.contentWindow.addEventListener("unload", unloadHandler);
      }

      iframe.addEventListener("load", attachUnload);
      attachUnload();
    },
    iframeLoad: function iframeLoad(e) {
      var iFrameDOM = $("iframe#iframe").contents();
      var route = iFrameDOM.find("#content").data('route');

      if (!route) {
        route = 'default';
      }

      this.$store.dispatch('PUSH_IFRAME_HISTORY', $.extend(true, {}, $('iframe')[0].contentWindow.location));
      this.$store.dispatch('CHANGE_PAGE', route);
      this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT');
      this.$store.dispatch('LOADING_END');
    }
  }
});
Vue.component('vz-edit-menu', {
  template: '#vz-edit-menu',
  computed: {
    active_template: function active_template() {
      return this.$store.getters.active_template;
    },
    edit_history: function edit_history() {
      return this.$store.getters.edit_history;
    }
  },
  methods: {
    saveTemplate: function saveTemplate() {
      this.$store.dispatch('SAVE_TEMPLATE');
    },
    update: function update(e, options) {
      // skin upddate
      this.$store.dispatch('UPDATE_SKIN', {
        active_template_id: this.active_template.setting.codename,
        skin: options.value
      });
    }
  }
});
Vue.component('viz-dashboard', {
  template: '#viz-dashboard',
  computed: {
    status: function status() {
      return this.$store.getters.status;
    },
    loading: function loading() {
      console.log(this.$store.getters.loading);
      return this.$store.getters.loading;
    },
    setting: function setting() {
      return this.$store.getters.setting;
    }
  },
  methods: {
    change_auto_save: function change_auto_save(e) {
      this.$store.dispatch('CHANGE_AUTO_SAVE', e);
    }
  },
  beforeMount: function beforeMount() {
    this.$store.dispatch('LOADING_START');
  },
  mounted: function mounted() {
    this.$store.dispatch('LOADING_END');
  }
});
Vue.component('viz-marketplace', {
  template: '#viz-marketplace',
  computed: {},
  methods: {}
});
Vue.component('vz-component-list', {
  template: '#vz-component-list',
  computed: {
    active_template: function active_template() {
      return this.$store.getters.active_template;
    },
    components: function components() {
      return this.$store.getters.components;
    }
  },
  methods: {}
});
Vue.component('vz-component', {
  template: '#vz-component',
  computed: {
    component: function component() {
      return this.$store.getters.component;
    },
    componentId: function componentId() {
      return this.$store.state.route.params.id;
    },
    componentName: function componentName() {
      return this.$t('edit.entry_' + this.$store.state.route.params.id);
    },
    availableComponents: function availableComponents() {
      return this.$store.getters.available_components;
    },
    componentKey: function componentKey() {
      // if (!this.component.skin) {
      //     console.log(this.component)
      // }
      // let skin = this.availableComponents[this.componentId][this.component.skin] ? this.component.skin : 'default'
      // let active_template_codename = this.$store.getters.active_template.setting.active_skin;
      return this.component.skin; // if (this.component.skin === active_template_codename) {
      // 	return this.component.skin;
      // } else {
      // 	return active_template_codename;
      // }
    },
    hasComponentKey: function hasComponentKey() {
      return _.contains(this.componentKey, this.templateVariations);
    },
    templateVariations: function templateVariations() {
      var variations = _.keys(this.availableComponents[this.componentId]);

      return variations; // return _.reject(variations, (k)=>{
      // 	return k == this.$store.getters.active_template.setting.active_skin;
      // });
    }
  },
  beforeMount: function beforeMount() {
    console.log('before');
  },
  methods: {
    update: function update(e, options) {
      // no need to update if there no available component exist.
      // at this case set default skin because it have to be
      var skin = this.availableComponents[this.componentId][options.value] ? options.value : 'default';
      this.$store.dispatch('UPDATE_COMPONENT', {
        active_template_id: this.$store.getters.setting.active_template,
        component_id: this.componentId,
        component_skin: skin
      });
    }
  }
});
Vue.component('vz-edit-back', {
  template: '#vz-edit-back',
  computed: {
    close: function close() {
      return this.$store.getters.route.path === '/edit';
    },
    vd_layout: function vd_layout() {
      return this.$store.getters.route.path === '/edit/vdh' || this.$store.getters.route.path === '/edit/vdf';
    },
    history: function history() {
      return this.$store.getters.menu.navigation_history;
    }
  },
  methods: {
    back: function back(e) {
      if (this.vd_layout) {
        this.$store.dispatch('LEAVE_VISUAL');
      }

      var history_url = this.history.pop();

      if (!history_url || this.close) {
        this.$router.push('/');
      } else {
        this.$router.push(history_url.path);
      }
    }
  }
});
Vue.component('vz-edit-controls', {
  template: '#vz-edit-controls',
  props: {},
  computed: {
    menu: function menu() {
      return this.$store.getters.menu;
    }
  },
  methods: {
    toggle_show: function toggle_show() {
      if (this.menu.hidden) {
        this.$store.dispatch('SHOW_MENU');
      } else {
        this.$store.dispatch('HIDE_MENU');
      }
    },
    changeIfrmeSize: function changeIfrmeSize(e, ee) {
      $('#iframe').animate({
        width: e
      }, {
        duration: 500
      });
    }
  },
  mounted: function mounted() {}
});
Vue.component('vz-edit-navigation', {
  template: '#vz-edit-navigation',
  computed: {
    menu: function menu() {
      return this.$store.getters.menu;
    }
  },
  data: function data() {
    return {
      items: []
    };
  },
  methods: {
    to: function to(path) {
      this.$store.dispatch('PUSH_NAVIGATION_HISTORY', this.$store.getters.route);
      this.$router.push(path);
    }
  },
  mounted: function mounted() {}
});
Vue.component('vz-edit-page-select', {
  template: '#vz-edit-page-select',
  computed: {
    currentPage: function currentPage() {
      return this.$store.getters.current_page;
    },
    availablePages: function availablePages() {
      return this.$store.getters.available_page;
    }
  },
  methods: {
    update: function update(e, options) {
      console.log(options); // no need to update if there no available component exist.
      // at this case set default skin because it have to be
      // this.$store.dispatch('CURRENT_PAGE', options);
    }
  }
});
Vue.component('vz-edit-vdf', {
  template: '#vz-edit-vdf',
  computed: {},
  methods: {},
  beforeMount: function beforeMount() {
    this.$store.dispatch('LOAD_VISUAL_FOOTER', this.$o('action.vdf'));
  },
  beforeDestroy: function beforeDestroy() {}
});
Vue.component('vz-edit-vdh', {
  template: '#vz-edit-vdh',
  computed: {},
  methods: {},
  beforeMount: function beforeMount() {
    this.$store.dispatch('LOAD_VISUAL_HEADER', this.$o('action.vdh'));
  },
  beforeDestroy: function beforeDestroy() {}
});
Vue.component('vis-dash-link', {
  template: '#vis-dash-link',
  props: {
    thumbnail: {
      type: Object,
      default: function _default() {
        return {
          img: this.$o('img.no_image'),
          title: 'default',
          description: 'default',
          codename: 'default'
        };
      }
    },
    to: {
      type: String,
      default: function _default() {
        return 'dashboard';
      }
    },
    target: {
      type: String,
      default: function _default() {
        return '_blank';
      }
    },
    text: {
      type: String,
      default: function _default() {
        return '_blank';
      }
    }
  },
  computed: {},
  methods: {
    handleChange: function handleChange(e) {}
  }
});
Vue.component('vz-theme-list', {
  template: '#vz-theme-list',
  computed: {
    templates: function templates() {
      return this.$store.getters.templates;
    }
  },
  methods: {
    handleChange: function handleChange(e) {},
    popup: function popup(e) {}
  }
});
Vue.component('vz-theme-preview', {
  template: '#vz-theme-preview',
  computed: {
    active_template: function active_template() {
      return this.$store.getters.active_template;
    },
    switch_text: function switch_text() {
      return this.$store.getters.status ? this.$t('common.entry_deactivate') : this.$t('common.entry_activate');
    }
  },
  methods: {
    popup: function popup(e) {},
    change_status: function change_status() {
      this.$store.dispatch('CHANGE_STATUS');
    }
  }
});
Vue.component('vz-theme-thumb', {
  template: '#vz-theme-thumb',
  props: {
    item: {
      type: Object,
      default: function _default() {
        return {
          img: this.$o('img.no_image'),
          setting: '',
          source: ''
        };
      }
    }
  },
  computed: {
    activeThumb: function activeThumb() {
      return this.item.setting.codename == this.$store.getters.setting.active_template;
    }
  },
  methods: {
    handleChange: function handleChange(e) {
      this.$store.dispatch('CHANGE_TEMPLATE', e.currentTarget.attributes.index);
    }
  }
});
Vue.component('breadcrumbs', {
  template: '#t-breadcrumbs'
});
Vue.component('custom_switch', {
  template: '#t-custom_switch',
  props: {
    value: {
      type: String,
      default: function _default() {
        return true;
      }
    },
    icon: {
      type: String,
      default: function _default() {
        return 'fa-calendar';
      }
    },
    help_toggle: {
      type: String,
      default: function _default() {
        return 'help';
      }
    }
  },
  methods: {
    click: function click(e) {
      this.$emit('click', e);
    }
  }
});
Vue.component('d-loader', {
  template: '#t-loader',
  props: {
    size: {
      type: String,
      default: function _default() {
        return 'normal';
      }
    }
  },
  computed: {
    auto_save: function auto_save() {
      return this.$store.getters.setting.auto_save;
    },
    loading: function loading() {
      return this.$store.getters.loading;
    }
  }
});
Vue.component('d-select', {
  template: '#t-select',
  props: {
    name: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    value: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    none: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  computed: {},
  methods: {
    handleChange: function handleChange(e) {
      this.$emit('change', e);
    }
  }
});
Vue.component('viz-switcher', {
  template: '#viz-switcher',
  props: {
    name: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    value: {
      type: String,
      default: function _default() {
        return '';
      }
    },
    size: {
      type: String,
      default: function _default() {
        return 'normal';
      }
    }
  },
  mounted: function mounted() {
    var config_switch = {
      'onColor': 'success',
      'onText': this.$t('common.text_yes'),
      'offText': this.$t('common.text_no')
    };

    if (this.size != 'mini') {
      config_switch.labelText = this.$t('common.text_enabled');
    }

    $('[type="checkbox"]', this.$vnode.elm).bootstrapSwitch(config_switch);
    $('[type="checkbox"]', this.$vnode.elm).on('switchChange.bootstrapSwitch', function (e, state) {
      this.$emit('change', {
        target: {
          name: this.name,
          value: state
        }
      });
    }.bind(this));
  },
  computed: {}
});
/*
* Recursively merge properties of two objects
*/

function MergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor == Object) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }

  return obj1;
}

d_visualize.getters.components = function (state, getters) {
  var common_componenents = getters.active_template.setting.page['default'].layout.component;
  var merged_components;

  if (getters.active_template.setting.page[getters.current_page]) {
    var page_components = getters.active_template.setting.page[getters.current_page].layout.component;
    merged_components = MergeRecursive(JSON.parse(JSON.stringify(common_componenents)), page_components);
  } else {
    merged_components = JSON.parse(JSON.stringify(common_componenents));
  }

  common_componenents = _.reduce(merged_components, function (memo, component, key) {
    if (component.editable) {
      memo[key] = component;
    }

    return memo;
  }, []);
  return common_componenents;
};

d_visualize.getters.available_components = function (state) {
  return state.available_components;
};

d_visualize.getters.iframe_src = function (state) {
  return state.iframe_src;
};

d_visualize.getters.vd_loaded = function (state) {
  return state.vd_loaded;
};

d_visualize.getters.component = function (state, getters) {
  return getters.components[state.route.params.id];
};

d_visualize.getters.templates = function (state) {
  return state.templates;
};

d_visualize.getters.active_template = function (state, getters) {
  return _.find(getters.templates, function (v) {
    return state.setting.active_template === v.setting.codename;
  });
};

d_visualize.getters.iframe_history = function (state) {
  return state.iframe_history;
};

d_visualize.getters.menu = function (state) {
  return state.menu;
};

d_visualize.getters.route = function (state) {
  return state.route;
};

d_visualize.getters.edit_history = function (state) {
  return state.edit_history;
};

d_visualize.getters.current_page = function (state, getters) {
  var current_page = state.current_page;

  _.map(getters.available_page, function (page) {
    page = page.replace('/', '\/');
    var matches = state.current_page.match(page);

    if (matches) {
      current_page = page;
    }
  });

  return current_page;
};

d_visualize.getters.available_page = function (state, getters) {
  return _.keys(getters.active_template.setting.page);
};

d_visualize.getters.status = function (state) {
  return state.setting.status;
};

d_visualize.getters.setting = function (state) {
  return state.setting;
};

d_visualize.getters.loading_first = function (state) {
  return state.loading_first;
};

d_visualize.getters.loading = function (state) {
  return state.loading;
};

d_visualize.state.setting = {};

d_visualize.mutations['LOAD_CONTENT_FAIL'] = function (state, payload) {};

d_visualize.mutations['LOAD_CONTENT_SUCCESS'] = function (state, payload) {
  Vue.set(state.setting, 'active_template', payload.setting.active_template);
  Vue.set(state.setting, 'status', payload.setting.status);
  Vue.set(state.setting, 'auto_save', payload.setting.auto_save);
  Vue.set(state, 'templates', payload.templates);
  Vue.set(state, 'available_components', payload.available_components);
  Vue.set(state, 'theme_components', payload.theme_components);
  Vue.set(state, 'iframe_src', payload.iframe_src);
};

d_visualize.state.theme_components = [];
d_visualize.state.vd_loaded = false;
d_visualize.state.iframe_src = '';
d_visualize.state.available_components = [];

d_visualize.mutations['CHANGE_IFRAME_SRC'] = function (state, payload) {
  Vue.set(state, 'iframe_src', payload);
};

d_visualize.mutations['ENTER_VISUAL'] = function (state, payload) {
  Vue.set(state, 'vd_loaded', true);
};

d_visualize.mutations['LEAVE_VISUAL'] = function (state, payload) {
  Vue.set(state, 'vd_loaded', false);
};

d_visualize.mutations['LOAD_VISUAL_HEADER'] = function (state, payload) {
  Vue.set(state, 'iframe_src', payload);
};

d_visualize.mutations['LOAD_VISUAL_FOOTER'] = function (state, payload) {
  Vue.set(state, 'iframe_src', payload);
}; //main changing component


d_visualize.mutations['UPDATE_COMPONENT'] = function (state, payload) {
  var old_component = state.templates[payload.active_template_id].setting.page.default.layout.component[payload.component_id];
  var new_component = JSON.parse(JSON.stringify(old_component));
  new_component.skin = payload.component_skin;
  new_component.template = old_component.template.replace(/(\w+).twig/, new_component.skin + '.twig');

  if (old_component.stylesheet) {
    new_component.stylesheet = old_component.stylesheet.replace(/(\w+).css/, new_component.skin + '.css');
  } else {
    //if there no styles add them by default
    new_component.stylesheet = 'd_visualize/stylesheet/dist/vz-component/' + payload.component_id + '/' + new_component.skin + '.css';
  }

  Vue.set(state.templates[payload.active_template_id].setting.page.default.layout.component, payload.component_id, new_component);
}; //main changing skin


d_visualize.mutations['UPDATE_SKIN'] = function (state, payload) {
  Vue.set(state.templates[payload.active_template_id].setting, 'active_skin', payload.skin);
};

d_visualize.state.templates = {};

d_visualize.mutations['CHANGE_TEMPLATE'] = function (state, payload) {
  Vue.set(state.setting, 'active_template', payload.value);
};

d_visualize.state.loading = {
  status: Index.WAITING,
  on_progress: false,
  content_loaded: false,
  loader_stack: 0
};

d_visualize.mutations['LOADING_START'] = function (state, payload) {
  Vue.set(state, 'loading', $.extend({}, state.loading, {
    status: Index.LOADING,
    on_progress: true,
    loader_stack: state.loading.loader_stack + 1
  }));
};

d_visualize.mutations['LOADING_END'] = function (state, payload) {
  if (state.loading.loader_stack > 0) {
    // set only when some one set start stack
    var loading = $.extend({}, state.loading, {
      on_progress: false,
      content_loaded: true,
      loader_stack: state.loading.loader_stack - 1
    });

    if (loading.loader_stack === 0) {
      //wait queue of loading
      loading.status = Index.WAITING;
    } else {
      loading.status = Index.LOADING;
    }

    Vue.set(state, 'loading', loading);
  }
};

d_visualize.mutations['LOADING_SUCCESS'] = function (state, payload) {
  Vue.set(state, 'loading', $.extend({}, state.loading, {
    status: Index.SUCCESS,
    on_progress: false,
    content_loaded: true
  }));
};

d_visualize.mutations['LOADING_FAIL'] = function (state, payload) {
  Vue.set(state, 'loading', $.extend({}, state.loading, {
    status: Index.FAIL,
    on_progress: false,
    content_loaded: false
  }));
};

d_visualize.state.iframe_history = [];
d_visualize.state.current_page = '';
d_visualize.state.menu = {
  hidden: false,
  navigation: [],
  navigation_history: []
};

d_visualize.mutations['PUSH_NAVIGATION_HISTORY'] = function (state, payload) {
  state.menu.navigation_history.push(payload);
  var new_history = JSON.parse(JSON.stringify(state.menu.navigation_history));
  Vue.set(state.menu, 'navigation_history', new_history);
};

d_visualize.mutations['CHANGE_NAVIGATION_CONTEXT'] = function (state, payload) {
  // var new_menu = JSON.parse(JSON.stringify(state.menu));
  // new_menu.navigation = payload;
  Vue.set(state.menu, 'navigation', payload);
};

d_visualize.mutations['PUSH_IFRAME_HISTORY'] = function (state, payload) {
  state.iframe_history.push(payload);
  var new_history = JSON.parse(JSON.stringify(state.iframe_history));
  Vue.set(state, 'iframe_history', new_history);
};

d_visualize.mutations['CHANGE_PAGE'] = function (state, payload) {
  Vue.set(state, 'current_page', payload);
};

d_visualize.mutations['HIDE_MENU'] = function (state, payload) {
  Vue.set(state.menu, 'hidden', true);
};

d_visualize.mutations['SHOW_MENU'] = function (state, payload) {
  Vue.set(state.menu, 'hidden', false);
};

d_visualize.mutations['CHANGE_STATUS'] = function (state, payload) {
  Vue.set(state.setting, 'status', !state.setting.status);
};

d_visualize.mutations['CHANGE_AUTO_SAVE'] = function (state, payload) {
  Vue.set(state.setting, 'auto_save', !state.setting.auto_save);
};

d_visualize.routes.push({
  path: '/edit',
  component: {
    template: '<vz-edit></vz-edit>'
  },
  children: [{
    path: 'components',
    component: {
      template: '<vz-component-list></vz-component-list>'
    }
  }, {
    path: 'components/:id',
    component: {
      template: '<vz-component></vz-component>'
    }
  }, {
    path: 'buttons',
    component: {
      template: '<vz-buttons></vz-buttons>'
    }
  }, {
    path: 'inputs',
    component: {
      template: '<vz-inputs></vz-inputs>'
    }
  }, {
    path: 'settings',
    component: {
      template: '<vz-settings></vz-settings>'
    }
  }, {
    path: 'vdh',
    component: {
      template: '<vz-edit-vdh></vz-edit-vdh>'
    }
  }, {
    path: 'vdf',
    component: {
      template: '<vz-edit-vdf></vz-edit-vdf>'
    }
  }]
});
d_visualize.routes.push({
  path: '/home',
  component: {
    template: '<viz-home></viz-home>'
  },
  children: [{
    path: 'dashboard',
    component: {
      template: '<viz-dashboard></viz-dashboard>'
    }
  }, {
    path: 'marketplace',
    component: {
      template: '<viz-marketplace></viz-marketplace>'
    }
  }]
});
d_visualize.routes.push({
  path: '/',
  redirect: '/home/dashboard'
});
d_visualize.routes.push({
  path: '/',
  redirect: '/home/dashboard'
});
Vue.component('viz-home', {
  template: '#viz-home',
  computed: {
    setting: function setting() {
      return this.$store.getters.setting;
    },
    loading: function loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    save_stay: function save_stay() {
      this.$store.dispatch('SAVE_CONTENT');
    },
    save: function save() {
      this.$store.dispatch('SAVE_CONTENT', {
        callback: function callback() {
          window.location = app.$o('action.cancel');
        }
      });
    }
  }
});
Vue.component('vz-edit', {
  template: '#vz-edit',
  computed: {
    menu: function menu() {
      return this.$store.getters.menu;
    },
    route_class: function route_class() {
      if (this.$store.getters.route.params.id) {
        return this.$store.getters.route.path.replace(this.$store.getters.route.params.id, '').replace(/\//g, '-').slice(0, -1).slice(1, -1);
      }
    }
  },
  beforeMount: function beforeMount() {
    // this.checkMenu(this.$route);
    this.$store.dispatch('ENTER_EDIT');
    this.$store.dispatch('LOADING_START');
  },
  mounted: function mounted() {
    this.$store.dispatch('LOADING_END');
  },
  beforeDestroy: function beforeDestroy() {
    this.$store.dispatch('LEAVE_EDIT');
    this.$store.dispatch('LOADING_END');
  }
});