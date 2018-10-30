<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.entry_typography')}}</h2>
        </template>
        <p class="display-1">Typography</p>
        {{font}}
        {{zoom}}
        <v-subheader>base font size</v-subheader>
        <v-slider
                v-model="zoom"
                append-icon="fas fa-plus"
                prepend-icon="fas fa-minus"
                always-dirty
                thumb-label
                :max="40"
                @click:append="increase"
                @click:prepend="decrease"
        ></v-slider>
        <v-checkbox
                :label="`Checkbox 1: ${checkbox.toString()}`"
                v-model="checkbox"
        ></v-checkbox>
        <!--<FontPicker v-model='font'></FontPicker>-->

    </ComponentContainer>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		name: "typography",
        data(){
			return{
				zoom:'14'
            }
        },
		computed: {
			font_base:{
                get(){
                	return font['']
                },
                set(){

                }
            },
			...mapGetters({
				template: 'template/active_template',
				font: 'template/active_skin_typography',
			})
		},
        methods:{
	        increase(){
	        	console.log('inc')
            },
	        decrease(){
	        	console.log('decrease')
            }
        }
	};
</script>

<style scoped>

</style>