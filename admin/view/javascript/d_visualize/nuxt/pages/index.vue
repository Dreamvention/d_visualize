<template>
  <div>
    home
{{url}}
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
  middleware: 'auth',
	computed: mapGetters({
		url: 'auth/admin_url'
	}),
  head () {
    return { title: this.$t('home') }
  }
}
</script>
