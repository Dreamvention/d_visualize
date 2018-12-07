<template>
    <div class="setting">
        <v-dialog v-model="recreateDB_dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Refresh DB</v-card-title>
                <v-card-text>Are you sure about this?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="recreateDB_dialog = false">NO</v-btn>
                    <v-btn color="green darken-1" flat @click.native="recreateDB">
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout align-start justify-center column fill-height wrap text-center>
            <v-alert
                    :value="droppedDB"
                    type="success"
            >
                Yep you are drop and create Tables on visualize
            </v-alert>
            <v-btn color="error" dark @click="recreateDB_dialog=true">Refresh DB</v-btn>
            <v-btn color="warning" @click="tranceDB" :loading="loading_warning"> Trance Tables</v-btn>
            <v-btn color="warning" @click="recreateAM" >Recreate Admin Menu</v-btn>
            <v-flex>
                <v-tooltip bottom>
                    <v-btn slot="activator" color="info" @click="toggleMenu" icon flat :loading="loading_warning">
                        <v-icon v-if="menu">fas fa-caret-left</v-icon>
                        <v-icon v-else>fas fa-caret-right</v-icon>
                    </v-btn>
                    <span><span v-if="menu">Hide</span><span v-else>Show</span> opencart navigation bar</span>
                </v-tooltip>

            </v-flex>
        </v-layout>
    </div>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex';

	export default {
		name: "setting",
		data() {
			return {
				droppedDB: false,
				recreateDB_dialog: false,
				loading_warning: false
			};
		},
		computed: mapGetters({menu: 'opencart/menu'}),
		methods: {
			async recreateDB({dispatch}) {
				await this.$store.dispatch('opencart/REFRESH_DB');
				this.droppedDB = true;
				this.recreateDB_dialog = false;
			},
			async tranceDB() {
				this.loading_warning = true;
				await this.$store.dispatch('opencart/TRANCE_DB');
				this.loading_warning = false;
			},
            async recreateAM() {
				await this.$store.dispatch('opencart/RECREATE_AM');
			},
			...mapMutations({
				toggleMenu: 'opencart/TOGGLE_MENU'
			})
		}
	};
</script>

<style scoped>

</style>