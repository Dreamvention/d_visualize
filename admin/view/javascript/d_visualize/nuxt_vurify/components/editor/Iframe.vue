<template>
    <div class="vz-edit-iframe">
        <iframe id="iframe" :src="iframe.src" @load="iframeLoad" frameborder="0" borderwidth="0" v-if="loading"></iframe>
        <div v-else>
            loading
        </div>
    </div>
</template>
<style scoped>
    iframe {
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>
<script>
	export default {
		name: "EditorIframe",
		props: ['iframe','loading'],
		mounted() {
			var frame = document.getElementById('iframe');

			frame.contentWindow.postMessage({data:1}, '*');

			// this.iframeURLChange(document.getElementById("iframe"), (newURL)=>{
			// 	this.store.commit('load/LOADING_START');
			// 	console.log("URL changed:", newURL);
			// });
		},
		methods: {
			iframeURLChange(iframe, callback) {
				var unloadHandler = ()=>{
					// Timeout needed because the URL changes immediately after
					// the `unload` event is dispatched.
					setTimeout(()=>{
						if (iframe.contentWindow) {
							this.$store.commit('load/LOADING_START');
							callback(iframe.contentWindow.location.href);
						}
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
				// this.store.commit('load/LOADING_END');
				// let iFrameDOM = $("iframe#iframe").contents();
				// let route = iFrameDOM.find("#content").data('route');
				// if (!route) {
				// 	route = 'default';
				}
			// 	this.$store.dispatch('PUSH_IFRAME_HISTORY', $.extend(true, {}, $('iframe')[0].contentWindow.location));
			// 	// this.$store.dispatch('CHANGE_PAGE', route);
			// 	// this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT');
			// 	this.$store.commit('load/LOADING_END');
			// }
		}

	};
</script>

<style scoped>

</style>