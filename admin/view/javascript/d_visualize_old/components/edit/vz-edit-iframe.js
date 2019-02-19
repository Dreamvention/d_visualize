Vue.component('vz-edit-iframe', {
    template: '#vz-edit-iframe',
    computed: {
        //currently loaded url on iframe vdh,vdf link change this src
        iframe_src() {
            return this.$store.getters.iframe_src;
        },
        // added history to know where vd start his iframe to get back
        iframe_history() {
            return this.$store.getters.iframe_history;
        },
    },
    mounted() {
        this.iframeURLChange(document.getElementById("iframe"), (newURL) => {
            this.$store.dispatch('LOADING_START');
            console.log("URL changed:", newURL);
        });

    },
    methods: {
        iframeURLChange(iframe, callback) {
            var unloadHandler = function () {
                // Timeout needed because the URL changes immediately after
                // the `unload` event is dispatched.
                setTimeout(function () {
                    if (iframe.contentWindow)
                        callback(iframe.contentWindow.location.href);
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
        iframeLoad(e) {
            let iFrameDOM = $("iframe#iframe").contents();
            let route = iFrameDOM.find("#content").data('route');
            if (!route) {
                route = 'default'
            }
            this.$store.dispatch('PUSH_IFRAME_HISTORY', $.extend(true, {}, $('iframe')[0].contentWindow.location));
            this.$store.dispatch('CHANGE_PAGE', route);
            this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT');
            this.$store.dispatch('LOADING_END');
        }
    }
});