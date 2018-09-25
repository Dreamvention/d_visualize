<template id="vz-edit-navigation">
    <div class="vz-edit-navigation">
        <transition-group name="list" tag="div" class='vz-edit-navigation__nav nav nav_edit' v-if="menu.navigation.length">
            <div class="nav_item" v-for="nav_item in menu.navigation" @click="to(nav_item.href)" v-bind:key="nav_item.href">{{$t(nav_item.text)}}
            </div>
        </transition-group >
        <div class="vz-edit-navigation__content">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>