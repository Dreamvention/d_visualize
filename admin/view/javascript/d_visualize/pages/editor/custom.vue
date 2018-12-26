<template>
    <ComponentContainer :container_width="'120px'">
        <template slot="header">
            <h2 class="editor-component__heading display-3"> {{$t('editor.custom')}}</h2>
        </template>
        <p class="display-1">{{$t('editor.custom_help')}}</p>
        <v-tabs
                v-model="active"
                color="info"
        >
            <v-tab key="global">
                {{$t('editor.entry_global')}}
            </v-tab>
            <v-tab key="skin">
                {{$t('editor.entry_skin')}}
            </v-tab>
            <v-tab-item
                    key="global"
            >
                <v-textarea
                        v-model="global_code"
                        auto-grow
                        flat
                ></v-textarea>
                <!--<codemirror v-model="global_code"-->
                            <!--:options="cmOption"-->
                <!--&gt;-->
                <!--</codemirror>-->
            </v-tab-item>
            <v-tab-item
                    key="skin"
            >
                <v-textarea
                        v-model="skin_code"
                        auto-grow
                        flat
                ></v-textarea>
                <!--<codemirror v-model="skin_code"-->
                            <!--:options="cmOption"-->
                <!--&gt;-->
                <!--</codemirror>-->

            </v-tab-item>
        </v-tabs>
        <!-- codemirror -->

    </ComponentContainer>
</template>

<script>
	// import {codemirror} from 'vue-codemirror';
	// require styles
	// import 'codemirror/lib/codemirror.css';
	// language
	// import 'codemirror/mode/css/css.js';
	// theme css
	// import 'codemirror/theme/material.css';
	// import 'codemirror/addon/selection/active-line.js';
	// import 'codemirror/addon/hint/show-hint.js';
	// import 'codemirror/addon/hint/css-hint.js';

	import {mapGetters} from 'vuex';

	export default {
		name: "custom",
		computed: {
			global_code: {
				get() {
					return this.$store.getters['setting/custom_style'];
				},
				set(value) {
					this.$store.dispatch('setting/SET_GLOBAL_CUSTOM_STYLE',value)
				}
			},
			skin_code: {
				get() {
					return this.skin.custom_style;
				},
				set(value) {
					this.$store.dispatch('template/SET_SKIN_CUSTOM_STYLE',
						{
							template_id: this.template.setting.codename,
							skin: this.template.setting.active_skin,
							custom_style: value
						});
				}
			},
			...mapGetters({
				skin: 'template/active_template_skin',
                template: 'template/active_template'
			})
		},
		data() {
			return {
				active: 'global',
				cmOption: {
					tabSize: 4,
					styleActiveLine: true,
					lineNumbers: true,
					line: true,
					mode: 'text/css',
					theme: 'material',
					matchBrackets: true,
					styleSelectedText: true,
				}
			};
		},
		// components: {
		// 	codemirror
		// }
	};
</script>

<style scoped>

</style>