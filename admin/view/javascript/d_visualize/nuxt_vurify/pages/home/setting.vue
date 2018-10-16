<template>
    <div>
        <v-dialog v-model="recreateDB_dialog" persistent max-width="290">
            <v-btn slot="activator" color="error" dark>Refresh DB</v-btn>
            <v-card>
                <v-card-title class="headline">Refresh DB</v-card-title>
                <v-card-text>Are you shoure about this?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="recreateDB_dialog = false">NO</v-btn>
                    <v-btn color="green darken-1" flat @click.native="recreateDB">
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-alert
                :value="droppedDB"
                type="success"
        >
            Yep you are drop and create Tables on visualize
        </v-alert>
        <v-btn color="warning"  @click="tranceDB" :loading="loading_warning"> Trance Tables</v-btn>
    </div>
</template>

<script>
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
			async tranceDB({dispatch}) {
				this.loading_warning = true;
				await this.$store.dispatch('opencart/TRANCE_DB');
				this.loading_warning = false;
			}
		}
	};
</script>

<style scoped>

</style>