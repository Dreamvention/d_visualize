<template xmlns="http://www.w3.org/1999/html">
    <div class="vz-edit-iframe">
        <v-btn style="display:none" @click="iframeLoad">
            Click to post message
        </v-btn >
        <Loader :loading="loading"></Loader>
        <iframe id="iframe" :src="iframe.src" @load="iframeLoad" frameborder="0" borderwidth="0"
                :style="`width:${width}`">
            <p>Your browser does not support iframes.</p>
        </iframe>
    </div>
</template>
<style scoped lang="scss">
    iframe {
        transition:width .2s;
        margin: auto;
        height: 100%;
    }

    .loading {
        iframe {
            opacity: .55;
            pointer-events: none;
        }
        .loader {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -32px;
            margin-top: -32px;
            z-index: 2;
        }
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
					this.$store.dispatch('editor/CHANGE_NAVIGATION_CONTEXT');
				}
				if (event.data.vz_ifame_loading) {
					this.$store.commit('load/LOADING_START');
				}
			});
		},
		methods: {
			iframeLoad(e) {
				document.getElementById('iframe').contentWindow.postMessage({vz_token: true}, '*');
				this.$store.commit('load/LOADING_END');
			}
		}

	};
</script>

<style scoped>

</style>