<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.entry_colors')}}</h2>
        </template>
        <p class="display-1">Colors</p>
        <div v-for="(value,color_key) in skin_colors">
            {{color_key}}
            {{value}}
        </div>

        <chrome-picker :value="colors" @input="updateValue"  />
    </ComponentContainer>
</template>

<script>
	import {mapGetters} from 'vuex';
	import {Sketch} from 'vue-color';

	export default {
		name: "colors",
		computed: {
			skin_colors() {
				return this.template.skines[this.template.setting.active_skin].colors;
			},
			...mapGetters({
				template: 'template/active_template',
			})
		},
		data() {
			return {color: 'rgba(0,0,0,0)'};
		},
		components: {
			'chrome-picker': Sketch,
		}
	};
</script>

<style scoped>

</style>