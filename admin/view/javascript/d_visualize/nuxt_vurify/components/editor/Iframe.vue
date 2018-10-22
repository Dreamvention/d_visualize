<template xmlns="http://www.w3.org/1999/html">
    <div class="vz-edit-iframe">
        <v-btn style="display:none" @click="iframeLoad">
            Click to post message
        </v-btn >
        <iframe id="iframe" :src="iframe.src" @load="iframeLoad" frameborder="0" borderwidth="0" v-if="loading"
                :style="`width:${width}`">
            <p>Your browser does not support iframes.</p>
        </iframe>
        <div v-else>
            loading...
        </div>
    </div>
</template>
<style scoped>
    iframe {
        transition:width .2s;
        margin: auto;
        height: 100%;
    }
</style>
<script>
	export default {
		name: "EditorIframe",
		props: ['iframe','loading','width'],
		data() {
			return {};
		},
		mounted() {
			window.addEventListener('message', (event)=>{
				if (event.data.vz_ifame_data) {
					this.$store.commit('editor/CHANGE_IFRAME_PAGE', event.data.vz_ifame_data.route);
					this.$store.dispatch('editor/SAVE_IFRAME_HISTORY', event.data.vz_ifame_data.location);
				}
				// this.$store.dispatch('CHANGE_NAVIGATION_CONTEXT');
			});
		},
		methods: {
			iframeLoad(e) {
				document.getElementById('iframe').contentWindow.postMessage({vz_token: true}, '*');
			}
		}

	};
</script>

<style scoped>

</style>