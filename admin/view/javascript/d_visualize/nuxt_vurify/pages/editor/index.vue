<template>
    <div class="sections">
        <v-list >
            <template v-for="(item, index) in items">
                <v-list-tile
                        :key="item.title"
                        @click=""
                >
                    <v-list-tile-content>
                        <v-list-tile-title >{{item.title}} <v-icon>fas fa-chevron-right</v-icon></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

            </template>
        </v-list>
    </div>
</template>

<script>
    import VDHeader from '~/components/editor/VDHeader'
	export default {
		name: "index",
        components:{
	        VDHeader
        },
		data () {
			return {
				items: [
					{
						title: 'Header',
					},
					{
						title: 'Summer BBQ ',
					},
					{
						title: 'Footer',
					}
				]
			}
		}
	};
</script>

<style scoped>

</style>