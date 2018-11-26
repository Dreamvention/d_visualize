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
	import {mapGetters} from 'vuex';

	export default {
		name: "EditorIframe",
		props: ['iframe','loading','width'],
		data() {
			return {};
		},
        computed: {
			...mapGetters({
				template: 'template/active_template',
			})
		},
		mounted() {
			this.$store.commit('load/LOADING_START');
		},
		methods: {
			iframeLoad(e) {
				document.getElementById('iframe').contentWindow.postMessage({vz_token: true,vz_get_iframe_info:true}, '*');
				// save current state customizing after refresh
				document.getElementById('iframe').contentWindow.postMessage({
					vz_token: true,
					vz_change_css: {
						template_id: this.template.setting.codename,
						skin: this.template.setting.active_skin,
						variables: this.template.skines[this.template.setting.active_skin]
					}
				}, '*')
				this.$store.commit('load/LOADING_END');
			}
		}

	};
</script>

<style scoped>

</style>