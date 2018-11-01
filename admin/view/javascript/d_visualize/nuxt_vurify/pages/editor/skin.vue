<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.entry_skin')}}</h2>
        </template>
        <p class="display-1">{{$t('editor.entry_change_skin')}}</p>
        <v-autocomplete
                hide-details
                :items="skines"
                v-model="active_tab"
                solo
        ></v-autocomplete>

    </ComponentContainer>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		name: "colors",
		computed: {
			skines() {
				return _.keys(this.template.skines);
			},
			active_tab: {
				get() {
					return this.template.setting.active_skin;
				},
				set(value) {
					this.$store.dispatch('template/SET_SKIN', {
						template_id: this.template.setting.codename,
						skin: value
					});

				}
			},
			...mapGetters({
				template: 'template/active_template',
			})
		}
	};
</script>

<style scoped>

</style>