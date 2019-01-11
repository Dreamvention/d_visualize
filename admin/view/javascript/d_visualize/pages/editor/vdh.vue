<template>
    <div class="vdh">
        <ComponentContainer :container_width="'120px'">
            <template slot="header">
                <h2 class="editor-component__heading display-3"> {{$t('editor.header')}}</h2>
            </template>
            <div class="d-flex align-items-center">
                <v-btn  nuxt color="primary" @click="to">Go to Header</v-btn>
            </div>
        </ComponentContainer>

    </div>
</template>

<script>
	export default {
		name: "vdh",
        mounted(){
			console.log(this.$t('common.vdh'))
	        // window.location.href=this.$t('common.vdh')
        },
		methods:{
			to(){
				console.log(this.$t('common.vdh'))
				this.$router.replace(this.$t('common.vdh'))
			}
		},
		data () {
			return {
			}
		}

	};
</script>

<style scoped>

</style>