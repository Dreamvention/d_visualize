<template id="t-custom_switch">
    <button class="btn btn-link custom-switch" data-toggle="tooltip" :title="help_toggle" :class="{'active_tab':value}" @click="click">
        <i class="fa" :class="icon"></i>
    </button>
</template>