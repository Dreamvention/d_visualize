<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.custom')}}</h2>
        </template>
        <p class="display-1">{{$t('editor.custom_help')}}</p>
        <v-textarea
                solo
                label="Label"
                auto-grow
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
    </ComponentContainer>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		name: "colors",
		computed: {
			custom_style() {
				return this.template.custom_styles;
			},
			...mapGetters({
				skin: 'template/active_template_skin',
			})
		}
	};
</script>

<style scoped>

</style>