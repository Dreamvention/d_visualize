<template id="t-visualize">
    <div class="visualize" :class="{'loading':loading}" v-if="!loading">
        <router-view></router-view>
    </div>
</template>


