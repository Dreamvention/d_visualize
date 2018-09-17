<template id="vz-side-menu">
    <div class="vz-side-menu">
        <div class="menu_heading">
            <div class="menu_heading_close"><i class="fas fa-times"></i></div>
            <div class="menu_heading_publish"><button class="btn btn-primary">{{$t('edit.publish')}}</button></div>
        </div>
        <div class="notification_help">
            {{$t('edit.current_template')}} <span class="notification_help_template">{{active_template.setting.title}}</span>
        </div>
        <div class="change_theme">
            <span>{{$t('edit.active_template')}} -</span>
            <b>{{active_template.setting.codename}}</b>
           <router-link to="/home/dashboard" class="btn btn-primary ">{{$t('edit.change_template')}}</router-link>
        </div>

        <vz-edit-navigation></vz-edit-navigation>
    </div>
</template>