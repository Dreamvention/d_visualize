<template>
    <div class="vdh">
        <ComponentContainer :container_width="'120px'">
            <template slot="header">
                <h2 class="editor-component__heading display-3"> {{$t('editor.header')}}</h2>
            </template>
        </ComponentContainer>

    </div>
</template>

<script>
	export default {
		name: "vdh",
        mounted(){
			console.log(this.$t('common.vdh'))
	        window.location.href=this.$t('common.vdh')
        },
		data () {
			return {
			}
		}

	};
</script>

<style scoped>

</style>