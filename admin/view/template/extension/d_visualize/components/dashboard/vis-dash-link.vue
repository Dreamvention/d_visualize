<template id="vis-dash-link">
    <a v-if="link" :href="to" :targer="target" class="vis-dash-link"><img :src="thumbnail" alt="{{text}}"></a>
    <router-link v-else :to="to" ><img :src="thumbnail" alt="{{text}}"></router-link>
</template>