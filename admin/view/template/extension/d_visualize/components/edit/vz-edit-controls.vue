<template id="vz-edit-controls">
    <div class=vz-edit-controls>
        <div class="hider" @click="toggle_show"><i class="fas " :class="menu.hidden?'fa-caret-right':'fa-caret-left'"></i></div>
        <div class="help-text" v-if="!menu.hidden">{{$t('common.entry_collapse')}}</div>
        <div class="vz-edit-responsive_toggle">
            <div class="desktop"><i class="fas fa-desktop"></i></div>
            <div class="tablet"><i class="fas fa-tablet-alt"></i></div>
            <div class="phone"><i class="fas fa-mobile-alt"></i></div>
        </div>
    </div>
</template>