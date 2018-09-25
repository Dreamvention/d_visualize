<template id="vz-component">
    <div class="vz-component">
        <h2 class="vz-component__heading"> {{componentName}}</h2>
        <div class="form-group">
            <label for=""> {{$t('edit.entry_template')}}</label>
            <select class="form-control" v-model-vuex="component.template" >
                <option v-for="(template) in templateVariations"
                        :value="template.key"
                        :name="template.key"
                >
                    {{$t('edit.entry_'+template.key)}}
                </option>
            </select>
        </div>
        <!--<div class="form-group">-->
            <!--<label for=""> {{$t('edit.entry_stylesheet')}}</label>-->
            <!--<select class="form-control" v-model-vuex="component.stylesheet" >-->
                <!--<option v-for="(template) in stylesheetVariations"-->
                        <!--:value="template.stylesheet"-->
                        <!--:name="template.key"-->
                <!--&gt;-->
                    <!--{{$t('edit.entry_'+template.key)}}-->
                <!--</option>-->
            <!--</select>-->
        <!--</div>-->
        <div class="form-group">
            <label for=""> {{$t('edit.entry_custom_style')}}</label>
            <textarea class="form-control">
            {{component.custom_style}}
        </textarea>
        </div>
    </div>
</template>
