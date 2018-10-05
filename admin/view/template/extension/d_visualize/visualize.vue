<template id="t-visualize">
    <div class="visualize" :class="{'loading':loading.on_progress}" >
        <vue-topprogress ref="topProgress"></vue-topprogress>
        <router-view v-if="loading.content_loaded"></router-view>
        <div v-if="loading.status==LOADER.FAIL" class="no_data_found">
            <img :src="$o('img.no_data_img')" alt="nodata">
        </div>
    </div>
</template>


