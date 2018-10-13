import Vue from 'vue'
import moment from 'moment'
//constans
var LOAD = {
    LOADING: 'loading',
    WAITING: 'waiting',
    SUCCESS: 'success',
    FAIL: 'fail',
};

Vue.filter('image', function (value) {
    if (!value) return ''
    value = value.toString()
    return 'view/image/d_visualize/'+value
})

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MMMM Do, h:mm:ss a')
    }
})