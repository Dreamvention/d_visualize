function VueOptions(options) {

    this.options = options

    this.install = function (Vue) {
        Vue.prototype.$o = function (value) {
            var keys = value.split('.')
            var option = this.options;
        
            for (key in keys) {
                if(typeof option[keys[key]] === undefined){
                    option = path;
                    break
                } else {
                    option = option[keys[key]]
                }
            }
            return option
        }.bind(this)
    }   
}