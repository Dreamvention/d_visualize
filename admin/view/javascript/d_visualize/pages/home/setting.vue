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
            <v-btn color="warning" @click="reinstallTheme" >REINSTALL THEME</v-btn>
            <v-btn color="warning" @click="truncStyles" >EMPTY STYLES FOR CURRENT SKIN</v-btn>

        </v-layout>
    </div>
</template>

<script>
	import { mapMutations ,mapActions } from 'vuex';

	export default {
		name: "setting",
		data() {
			return {
				droppedDB: false,
				recreateDB_dialog: false,
				loading_warning: false
			};
		},
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
			...mapMutations({
				toggleMenu: 'opencart/TOGGLE_MENU'
			}),
            ...mapActions({
	            reinstallTheme:"opencart/REINSTALL_THEME",
	            recreateAM:"opencart/RECREATE_AM",
	            truncStyles:"opencart/TRANCE_ACTIVE_STYLES",
            })
		}
	};
</script>

<style scoped>

</style>