<template id="t-loader">
    <div v-if="loading" class="loader" :class="[{'auto-saving':auto_save},size]">
        <div class="la-timer" :class="(size==='normal')?'la-2x':''">
            <div></div>
        </div>
    </div>
</template>