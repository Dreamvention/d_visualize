<template id="vz-edit-navigation">
    <div class="vz-edit-navigation">
        <transition-group name="list" tag="div" class='vz-edit-navigation__nav nav nav--edit'>
            <div class="vz-edit-navigation__nav__item nav__item" v-for="nav_item in menu.navigation" @click="to(nav_item.href)" v-bind:key="nav_item.href">{{$t(nav_item.text)}}
            </div>
        </transition-group >

    </div>
</template>