<template id="vz-edit-navigation">
    <div class=vz-edit-navigation>
        <div class="nav nav_edit" v-if="edit_history.length <= 2 ">
            <!--<div class="nav_item"><router-link to="/edit/inputs">{{$t('edit.inputs')}}</router-link></div>-->
            <!--<div class="nav_item"><router-link to="/edit/buttons">{{$t('edit.buttons')}}</router-link></div>-->
            <!--<div class="nav_item"><router-link to="/edit/components">{{$t('edit.components')}}</router-link></div>-->
            <div class="nav_item" @click="to('/edit/vdh')">{{$t('edit.vdh')}}</div>
            <div class="nav_item" @click="to('/edit/vdf')">{{$t('edit.vdf')}}</div>
            <!--<div class="nav_item"><router-link to="/edit/settings">{{$t('edit.settings')}}</router-link></div>-->
        </div>
        <div class="content_nav">
            <router-view></router-view>
        </div>
    </div>
</template>