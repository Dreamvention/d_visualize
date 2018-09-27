<template id="vz-component">
    <div class="vz-component">
        <h2 class="vz-component__heading"> {{componentName}}</h2>
        <p class="vz-component__heading"> {{$t('edit.entry_'+componentId+'_description')}}</p>
        <div class="form-group">
            <label for=""> {{$t('edit.entry_component_skin')}} - {{componentKey}}</label>
            <select class="form-control" v-model-vuex="componentKey">
                <option :value="componentKey" v-if="!hasComponentKey" >{{$t('edit.entry_current_skin')}}</option>
                <option v-for="(template) in templateVariations"
                        :value="template">
                    {{template}}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for=""> {{$t('edit.entry_custom_style')}}</label>
            <textarea class="form-control">
            {{component.custom_style}}
            </textarea>
        </div>
    </div>
</template>
