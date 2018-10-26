<template>
    <div class="vdh">
        <ComponentContainer :container_width="'120px'">
            <template slot="header">header</template>
            vdh
        </ComponentContainer>

    </div>
</template>

<script>
	export default {
		name: "vdh",
        mounted(){
			console.log('mounted')
        },
		data () {
			return {
			}
		}

	};
</script>

<style scoped>

</style>