<template>
    <div>
        <h1>Not ssa pagesdssssdads </h1>
        <router-link to="/home">Back to the home page</router-link>
    </div>
</template>

<script>
	export default {
		layout:'opencart_hmr',
		name: "index",
		fetch({store, redirect}) {
			return redirect('/home');
		}
	};
</script>

<style scoped>

</style>