<template>
    <div class="editor-component">
        <ComponentContainer>
            <template slot="header">
                <h2 class="editor-component__heading display-3"> {{component_name}}</h2>
            </template>
            <!--<p class="editor-component__description"> {{$t('edit.entry_'+component_id+'_description')}}</p>-->
            <p class="display-1">Component variation</p>
            <v-autocomplete
                    hide-details
                    :items="component_variations"
                    v-model="component_variation"
                    solo
            ></v-autocomplete>
            <v-btn color="primary" block>
                show settings for current page
            </v-btn>
        </ComponentContainer>

        <!--<div class="form-group">-->
        <!--<label for=""> {{$t('edit.entry_component_skin')}} - {{ componentKey}}</label>-->
        <!--<select class="form-control" v-model-vuex="componentKey">-->
        <!--&lt;!&ndash;<option :value="componentKey" v-if="!hasComponentKey" >{{$t('edit.entry_current_skin')}}</option>&ndash;&gt;-->
        <!--<option v-for="(template) in templateVariations"-->
        <!--:value="template">-->
        <!--{{template}}-->
        <!--</option>-->
        <!--</select>-->
        <!--</div>-->
        <!--<div v-if="component.setting">-->
        <!--<h3 class="vz-component__setting-heading"> {{$t('component.setting')}}</h3>-->
        <!--<div class="form-group" v-for="(setting,key) in component.setting">-->
        <!--<label for=""> {{$t('edit.entry_'+key)}} - {{ key}}</label>-->
        <!--<div v-if="setting.type===COMPONENT_SETTINGS.TYPE_CHECKBOX">-->
        <!--<input class="form-control" type="checkbox" :value="setting.value" :checked="setting.value">-->

        <!--</div>-->
        <!--<div v-else-if="setting.type===COMPONENT_SETTINGS.TYPE_SELECT">-->
        <!--<select class="form-control" v-model="setting.value">-->
        <!--<option v-for="(val) in setting.values"-->
        <!--:value="val">-->
        <!--{{val}}-->
        <!--</option>-->
        <!--</select>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->

        <!--<div class="form-group">-->
        <!--<label for=""> {{$t('edit.entry_custom_style')}}</label>-->
        <!--<textarea class="form-control">-->
        <!--{{component.custom_style}}-->
        <!--</textarea>-->
        <!--</div>-->
    </div>
</template>
<style>
    .display-1{
        margin-top: 20px;
    }
</style>
<script>
	export default {
		data: ()=>({
		}),
		computed: {
			component_variation: {
				get() {
					//return if it's a default component
					if (this.$store.getters['template/active_template'].setting.page.default.layout.component[this.component_id]) {
						return this.$store.getters['template/active_template']
							.setting
							.page
							.default
							.layout
							.component[this.component_id].skin;
					} else if (this.$store.getters['template/active_template']
						.setting
						.page[this.$store.getters['editor/current_page']]
						.layout
						.component[this.component_id]) {
						return this.$store.getters['template/active_template']
							.setting
							.page[this.$store.getters['editor/current_page']]
							.layout
							.component[this.component_id].skin;
					}
				},
				set(value) {
					this.$store.dispatch('template/SET_VARIATION', {
						template_id:this.$store.getters['template/active_template'].setting.codename,
                        component_id: this.component_id,
						page: this.$store.getters['template/active_template'].setting.page.default.layout.component[this.component_id]
                            ? 'default' : this.$store.getters['editor/current_page'],
                        variation: value
                    });
				}
			},
			component_variations() {
				return _.keys(this.$store.getters['template/component'](this.component_id));
			},
			component_name() {
				return this.$t('component.entry_' + this.component_id);
			},
			component_id() {
				return this.$route.params.slug;
			}
		}

	};
</script>

<style scoped>

</style>