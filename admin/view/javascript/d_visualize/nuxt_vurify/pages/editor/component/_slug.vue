<template>
    <div class="editor-component">
        <h2 class="vz-component__heading"> {{componentName}}</h2>
        <p class="vz-component__description"> {{$t('edit.entry_'+componentId+'_description')}}</p>
        <v-hover>
            <v-card
                    slot-scope="{ hover }"
                    class="mx-auto"
                    color="grey lighten-4"
                    max-width="600"
            >
                <v-img
                        :aspect-ratio="16/9"
                        src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                    <v-expand-transition>
                        <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                                style="height: 100%;"
                        >
                            $14.99
                        </div>
                    </v-expand-transition>
                </v-img>
                <v-card-text
                        class="pt-4"
                        style="position: relative;"
                >
                    <v-btn
                            absolute
                            color="orange"
                            class="white--text"
                            fab
                            large
                            right
                            top
                    >
                        <v-icon>cart</v-icon>
                    </v-btn>
                    <div class="font-weight-light grey--text title mb-2">For the perfect meal</div>
                    <h3 class="display-1 font-weight-light orange--text mb-2">QW cooking utensils</h3>
                    <div class="font-weight-light title mb-2">
                        Our Vintage kitchen utensils delight any chef.<br>
                        Made of bamboo by hand
                    </div>
                </v-card-text>
            </v-card>
        </v-hover>
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
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
</style>
<script>
	export default {
		computed: {
			componentName() {
				return this.$t('component.entry_' + this.componentId);
			},
			componentId() {
				return this.$route.params.slug;
			}
		}

	};
</script>

<style scoped>

</style>