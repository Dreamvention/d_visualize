<template id="vz-edit-menu">
    <div class="vz-edit-menu">
        <div class="vz-edit-menu__heading">
            <vz-edit-back></vz-edit-back>
            <button class="btn btn-primary" @click="saveTemplate">{{$t('edit.publish')}}</button>
        </div>
        <vz-edit-page-select></vz-edit-page-select>
        <div class="vz-edit-menu__change-theme">
            <div class="form-group">
                <label for=""> {{$t('edit.entry_component_skin')}} -
                    {{this.active_template.setting.active_skin}}</label>
                <select class="form-control" v-model-vuex="this.active_template.setting.active_skin">
                    <option v-for="(skin) in this.active_template.skines"
                            :value="skin">
                        {{skin}}
                    </option>
                </select>
            </div>
        </div>
        <vz-edit-navigation></vz-edit-navigation>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
        <vz-edit-controls></vz-edit-controls>

    </div>
</template>