<template id="vz-edit-menu">
    <div class="vz-edit-menu">
        <div class="vz-edit-menu-heading">
            <vz-edit-back></vz-edit-back>
            <div class="menu_heading_publish">
                <button class="btn btn-primary" @click="saveTemplate">{{$t('edit.publish')}}</button>
            </div>
        </div>
        <vz-edit-page-select></vz-edit-page-select>
        <div class="vz-edit-menu-change_theme" v-if="edit_history.length<=2">
            <div class="form-group">
                <label for=""> {{$t('edit.entry_component_skin')}} - {{this.active_template.setting.active_skin}}</label>
                <select class="form-control" v-model-vuex="this.active_template.setting.active_skin">
                    <option v-for="(skin) in this.active_template.skines"
                            :value="skin">
                        {{skin}}
                    </option>
                </select>
            </div>
        </div>
        <vz-edit-navigation></vz-edit-navigation>
        <vz-edit-controls></vz-edit-controls>
    </div>
</template>