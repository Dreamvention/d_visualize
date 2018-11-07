<template>
    <div>
        <h1>Not ssa page </h1>
        <router-link to="/home">Back to the home page</router-link>
    </div>
</template>

<script>
	export default {
		name: "index",
		async fetch({store, redirect}) {
			await store.dispatch('setting/GET_SETTING');
			if (!process.env.isDev) {
				if (store.getters['setting/page'] && store.getters['setting/page'] === 'editor') {
					return redirect('/editor');
				}
			}
			return store.getters['setting/status']?redirect('/home'):redirect('/setup');
		}
	};
</script>

<style scoped>

</style>