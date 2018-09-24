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
      context.commit('LOADING_END');
      alertify.success(data['success']);

      if (!_.isUndefined(payload) && !_.isUndefined(payload.callback) && _.isFunction(payload.callback)) {
        payload.callback(data);
      }
    }
  }, 'json').fail(function (e, m) {
    context.commit('LOADING_END');
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
    }

    if (status === 'error') {
      context.commit('LOAD_CONTENT_FAIL', data);
    }

    context.commit('LOADING_END');
  }, 'json').fail(function () {
    alertify.error(app.$i18n.t('error.load_content'));
    context.commit('LOADING_END');
  });
};

d_visualize.actions['LOADING_START'] = function (context, payload) {
  context.commit('LOADING_START');
};

d_visualize.actions['LOADING_END'] = function (context, payload) {
  context.commit('LOADING_END');
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
  context.dispatch('HIDE_MENU');
  context.commit('ENTER_VISUAL', payload);
};

d_visualize.actions['LEAVE_VISUAL'] = function (context, payload) {
  $('body').removeClass('edit_vd');
  context.getters.iframe_history.pop(); //this route is a vdh route

  var last_iframe_page = context.getters.iframe_history.pop();
  context.dispatch('SHOW_MENU');
  context.commit('CHANGE_IFRAME_SRC', last_iframe_page.href);
  context.commit('LEAVE_VISUAL', payload);
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

d_visualize.actions['PUSH_IFRAME_HISTORY'] = function (context, payload) {
  context.commit('PUSH_IFRAME_HISTORY', payload);
};

d_visualize.actions['CHANGE_NAVIGATION_CONTEXT'] = function (context, payload) {
  context.commit('CHANGE_NAVIGATION_CONTEXT', payload);
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

Vue.component('visualize', {
  template: '#t-visualize',
  computed: {
    loading: function loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {}
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
    }
  },
  mounted: function mounted() {}
});
Vue.component('vz-edit-menu', {
  template: '#vz-edit-menu',
  computed: {
    active_template: function active_template() {
      return this.$store.getters.active_template;
    }
  },
  methods: {}
});
Vue.component('vz-edit-navigation', {
  template: '#vz-edit-navigation',
  computed: {
    menu: function menu() {
      return this.$store.getters.menu;
    }
  },
  methods: {
    to: function to(path) {
      this.$store.dispatch('PUSH_EDIT_HISTORY', path);
      this.$router.push(path);
    }
  },
  mounted: function mounted() {}
});
Vue.component('viz-dashboard', {
  template: '#viz-dashboard',
  computed: {
    status: function status() {
      return this.$store.getters.status;
    },
    loading_first: function loading_first() {
      return this.$store.getters.loading_first;
    },
    setting: function setting() {
      return this.$store.getters.setting;
    }
  },
  methods: {
    change_auto_save: function change_auto_save(e) {
      this.$store.dispatch('CHANGE_AUTO_SAVE', e);
    }
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
      return this.$store.getters.editable_components;
    }
  },
  methods: {}
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
    edit_history: function edit_history() {
      return this.$store.getters.edit_history;
    }
  },
  methods: {
    back: function back(e) {
      if (this.vd_layout) {
        this.$store.dispatch('LEAVE_VISUAL');
      }

      if (this.close) {
        this.$router.push(this.edit_history[0]);
      } else {
        this.$router.go(-1);
        this.$store.dispatch('POP_EDIT_HISTORY');
      }
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
  watch: {
    $route: function $route(to, from) {
      console.log('watchvdh'); // this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT',
      // 	[
      // 		{href: '/edit/vdh', text: 'edit.vdh'},
      // 		{href: '/edit/vdf', text: 'edit.vdf'}
      // 	]);
    }
  },
  beforeMount: function beforeMount() {
    this.$store.dispatch('LOAD_VISUAL_HEADER', this.$o('action.vdh'));
  }
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

d_visualize.getters.editable_components = function (state) {
  return state.available_components;
};

d_visualize.getters.iframe_src = function (state) {
  return state.iframe_src;
};

d_visualize.getters.vd_loaded = function (state) {
  return state.vd_loaded;
};

d_visualize.getters.templates = function (state) {
  return state.templates;
};

d_visualize.getters.active_template = function (state, getters) {
  var active = _.find(getters.templates, function (v) {
    return state.setting.active_template === v.setting.codename;
  });

  if (!active) {
    active = {
      img: '',
      setting: '',
      source: ''
    };
  }

  return active;
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

d_visualize.state.templates = {};
d_visualize.state.setting = {};
d_visualize.state.iframe_src = '';

d_visualize.mutations['LOAD_CONTENT_FAIL'] = function (state, payload) {};

d_visualize.mutations['LOAD_CONTENT_SUCCESS'] = function (state, payload) {
  Vue.set(state.setting, 'active_template', payload.setting.active_template);
  Vue.set(state.setting, 'status', payload.setting.status);
  Vue.set(state.setting, 'auto_save', payload.setting.auto_save);
  Vue.set(state, 'templates', payload.templates);
  Vue.set(state, 'available_components', payload.available_components);
  Vue.set(state, 'iframe_src', payload.iframe_src);
};

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
};

d_visualize.mutations['CHANGE_TEMPLATE'] = function (state, payload) {
  Vue.set(state.setting, 'active_template', payload.value);
};

d_visualize.mutations['LOADING_START'] = function (state, payload) {
  Vue.set(state, 'loading', true);
};

d_visualize.mutations['LOADING_END'] = function (state, payload) {
  Vue.set(state, 'loading_first', false);
  Vue.set(state, 'loading', false);
};

d_visualize.state.edit_history = ['/home/dashboard', '/edit'];
d_visualize.state.iframe_history = ['/'];
d_visualize.state.menu = {
  hidden: false,
  navigation: [],
  navigation_history: []
};

d_visualize.mutations['CHANGE_NAVIGATION_CONTEXT'] = function (state, payload) {
  state.menu.navigation_history.push(state.menu.navigation);
  var new_history = JSON.parse(JSON.stringify(state.menu.navigation_history));
  var new_navigation = JSON.parse(JSON.stringify(payload));
  Vue.set(state.menu, 'navigation_history', new_history);
  Vue.set(state.menu, 'navigation', new_navigation);
};

d_visualize.mutations['PUSH_EDIT_HISTORY'] = function (state, payload) {
  state.edit_history.push(payload);
  var new_history = JSON.parse(JSON.stringify(state.edit_history));
  Vue.set(state, 'edit_history', new_history);
};

d_visualize.mutations['POP_EDIT_HISTORY'] = function (state, payload) {
  state.edit_history.pop();
  var new_history = JSON.parse(JSON.stringify(state.edit_history));
  Vue.set(state, 'edit_history', new_history);
};

d_visualize.mutations['PUSH_IFRAME_HISTORY'] = function (state, payload) {
  state.iframe_history.push(payload);
  var new_history = JSON.parse(JSON.stringify(state.iframe_history));
  Vue.set(state, 'iframe_history', new_history);
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
    template: '<vz-edit-theme></vz-edit-theme>'
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
    loading_first: function loading_first() {
      return this.$store.getters.loading_first;
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
Vue.component('vz-edit-theme', {
  template: '#vz-edit-theme',
  computed: {
    setting: function setting() {
      return this.$store.getters.setting;
    },
    //currently loaded url on iframe vdh,vdf link change this src
    iframe_src: function iframe_src() {
      return this.$store.getters.iframe_src;
    },
    // added history to know where vd start his iframe to get back
    iframe_history: function iframe_history() {
      return this.$store.getters.iframe_history;
    },
    menu: function menu() {
      return this.$store.getters.menu;
    },
    components: function components() {
      return this.$store.getters.editable_components;
    }
  },
  methods: {
    iframeLoad: function iframeLoad(e) {
      this.$store.dispatch('PUSH_IFRAME_HISTORY', $.extend(true, {}, $('iframe')[0].contentWindow.location));
    },
    checkMenu: function checkMenu(to, from) {
      if (to.path === '/edit') {
        this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', [{
          href: '/edit/components',
          text: 'edit.entry_components'
        }, {
          href: '/edit/vdh',
          text: 'edit.vdh'
        }, {
          href: '/edit/vdf',
          text: 'edit.vdf'
        }]);
      }

      if (to.path === '/edit/vdh' || to.path === '/edit/vdh') {
        this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', []);
      }

      if (to.path === '/edit/components') {
        this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', Object.keys(this.components).map(function (c) {
          return {
            href: '/edit/components/' + c,
            text: 'edit.entry_components_' + c
          };
        }));
      }

      if (to.matched.find(function (e) {
        return e.path == '/edit/components/:id';
      })) {
        this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT', []);
      }
    }
  },
  watch: {
    $route: function $route(to, from) {
      this.checkMenu(to, from);
    }
  },
  beforeMount: function beforeMount() {
    this.checkMenu(this.$route);
    this.$store.dispatch('ENTER_EDIT');
  },
  beforeDestroy: function beforeDestroy() {
    this.$store.dispatch('LEAVE_EDIT');
  }
});