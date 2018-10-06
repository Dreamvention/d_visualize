<template id="vz-component">
    <div class="vz-component">
        <h2 class="vz-component__heading"> {{componentName}}</h2>
        <p class="vz-component__description"> {{$t('edit.entry_'+componentId+'_description')}}</p>
        <div class="form-group">
            <label for=""> {{$t('edit.entry_component_skin')}} - {{ componentKey}}</label>
            <select class="form-control" v-model-vuex="componentKey">
                <!--<option :value="componentKey" v-if="!hasComponentKey" >{{$t('edit.entry_current_skin')}}</option>-->
                <option v-for="(template) in templateVariations"
                        :value="template">
                    {{template}}
                </option>
            </select>
        </div>
        <div v-if="component.setting">
            <h3 class="vz-component__setting-heading"> {{$t('component.setting')}}</h3>
            <div class="form-group" v-for="(setting,key) in component.setting">
                <label for=""> {{$t('edit.entry_'+key)}} - {{ key}}</label>
                <div v-if="setting.type===COMPONENT_SETTINGS.TYPE_CHECKBOX">
                    <input class="form-control" type="checkbox" :value="setting.value" :checked="setting.value">

                </div>
                <div v-else-if="setting.type===COMPONENT_SETTINGS.TYPE_SELECT">
                    <select class="form-control" v-model="setting.value">
                        <option v-for="(val) in setting.values"
                                :value="val">
                            {{val}}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!--<div class="form-group">-->
        <!--<label for=""> {{$t('edit.entry_custom_style')}}</label>-->
        <!--<textarea class="form-control">-->
        <!--{{component.custom_style}}-->
        <!--</textarea>-->
        <!--</div>-->
    </div>
</template>
