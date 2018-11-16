;(function () {

    var vueModelVuex = {};

    vueModelVuex.createObject = function(key, value) {
        var obj = {};
        var parts = key.split('.');
        if(parts.length == 1) {
            obj[parts[0]] = value;
        } else if(parts.length > 1) {
            // concat all but the first part of the key
            var remainingParts = parts.slice(1,parts.length).join('.');
            obj[parts[0]] = vueModelVuex.createObject(remainingParts, value);
        }
        return obj;
    };


    vueModelVuex.install = function (Vue, options) {


        var options = options || {};

        // define directive
        Vue.directive('model-vuex', {

            bind: function (el, binding, vnode) {

                // store settings from how user calls directive
                var tag = vnode.tag,
                    type = vnode.elm.type,
                    value = binding.value,
                    method = binding.arg || 'update',
                    modifier = Object.keys(binding.modifiers);

                // construct event handler
                // based on type of input
                var handler =
                    (modifier.length > 0)
                        ? modifier[0] :
                        (tag === 'select')
                            ? 'change' :
                            (tag === 'input' && type === 'range')
                                ? 'change' :
                                (tag === 'input' && type === 'checkbox')
                                    ? 'change' :
                                    (tag === 'input' && type === 'radio')
                                        ? 'click' :
                                        'input';


                // store input prop type
                // proper support for checkboxes
                var prop =
                    (tag === 'input' && type === 'checkbox')
                        ? 'checked' :
                        'value';
                // simple dev mode
                // output settings
                if (options.hasOwnProperty('dev')) {
                    console.log('tag =>', tag);
                    console.log('type =>', type);
                    console.log('value =>', value);
                    console.log('method =>', method);
                    console.log('handler =>', handler);
                    console.log('modifier =>', modifier);
                    console.log('prop =>', prop)
                }


                // get the value being passed from vuex store and bind
                // set the prop based on input type
                if(tag === 'input' && type === 'checkbox') {
                    vnode.elm['checked'] = value;
                } else if(tag.search('switcher') !== -1 && type==="checkbox") {
                    vnode.elm['checked'] = value;
                } else {
                    vnode.elm[prop] = value;
                }

                // set the value in the vuex store by binding user defined method
                if (vnode.context.hasOwnProperty(method)) {

                    vnode.elm['on' + handler] = function(e, data){

                        var target =  typeof data !== 'undefined' && typeof data.target !== 'undefined' ? data.target : e.target;
                        var newValue = target.value;
                        if(tag === 'input' && type === 'checkbox'){
                            newValue = target.checked? 1 : 0
                        }
                        var optionEvent = {
                            expression: binding.expression,
                            data: vueModelVuex.createObject(binding.expression, newValue),
                            value: newValue
                        }

                        var event =  typeof data !== 'undefined' ? data : e;
                        vnode.context[method](event, optionEvent)
                    }
                }
                // if no method has been defined yet, log a little error
                else {
                    console.error('[v-model-vuex warn] method ' + method + '() does not exist in component')
                }
            }
        })
    }


    // boiler environment sniffing
    if (typeof exports == "object") {
        module.exports = vueModelVuex
    }
    else if (typeof define == "function" && define.amd) {
        define([], function () {
            return vueModelVuex
        })
    }
    else if (window.Vue) {
        window.VueModelVuex = vueModelVuex
        Vue.use(vueModelVuex)
    }

})()
