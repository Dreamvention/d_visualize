<template id="vz-edit-navigation">
    <div class="vz-edit-navigation">
        <div class='vz-edit-navigation__nav nav nav_edit' v-if="menu.navigation.length">
            <div class="nav_item" v-for="nav_item in menu.navigation" @click="to(nav_item.href)">{{$t(nav_item.text)}}
            </div>
        </div>
        <div class="vz-edit-navigation__content">
            <router-view></router-view>
        </div>
    </div>
</template>