<template>
    <div class="vdf">
        <ComponentContainer :container_width="'120px'">
            <template slot="header">
                <h2 class="editor-component__heading display-3"> {{$t('editor.footer')}}</h2>
            </template>

        </ComponentContainer>

    </div>
</template>

<script>
	export default {
		name: "vdh",
		mounted(){
			console.log(this.$t('common.vdf'))
			// window.location.href=this.$t('common.vdf')
		},
		data () {
			return {
			}
		}

	};
</script>

<style scoped>

</style>