<template id="t-loader">
    <div class="loader">
        <i class="fas fa-sync" :class="[{'auto-saving':auto_save,'fa-spin':loading},size]" ></i>
    </div>
    <!--<div v-if="loading" class="loader" :class="[{'auto-saving':auto_save},size]">-->
        <!--<div class="la-timer" :class="(size==='normal')?'la-2x':''">-->
            <!--<div></div>-->
        <!--</div>-->
    <!--</div>-->
    <!--<div v-else>-->
    <!--</div>-->
</template>