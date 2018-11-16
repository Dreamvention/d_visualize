<template>
    <div class="setup">
        <v-container fluid>
            <v-btn @click="setup" color="primary">
                setup
            </v-btn>
        </v-container>
    </div>
</template>
<script>
	export default {
		layout: 'opencart',
		async fetch({store}) {
			store.commit('load/LOADING_START');
			await store.dispatch('opencart/GET_OPDATA');
			store.commit('load/LOADING_END');
		},
		methods: {
			async setup({redirect}) {
				await this.$store.dispatch('opencart/SETUP');
				this.$router.push('home')
			}
		}
	};
</script>
