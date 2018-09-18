<template id="vz-edit-menu">
    <div class="vz-edit-menu">
        <div class="vz-edit-menu-heading">
            <vz-edit-back></vz-edit-back>
            <div class="menu_heading_publish">
                <button class="btn btn-primary">{{$t('edit.publish')}}</button>
            </div>
        </div>
        <div class="vz-edit-menu-notification_help">
            {{$t('edit.current_template')}} <span
                class="notification_help_template">{{active_template.setting.title}}</span>
        </div>
        <div class="vz-edit-menu-change_theme">
            <span>{{$t('edit.active_template')}} -</span>
            <b>{{active_template.setting.codename}}</b>
            <router-link to="/home/dashboard" class="btn btn-primary ">{{$t('edit.change_template')}}</router-link>
        </div>
        <vz-edit-navigation></vz-edit-navigation>
    </div>
</template>