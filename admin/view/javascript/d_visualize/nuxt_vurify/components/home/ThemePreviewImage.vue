<template>
    <div class="vz-theme-preview-images" @click="popup">
        <div class="vz-theme-preview__img">
            <img class="vz-theme-preview__img__frame" :src="'desktop_frame.png'|image" alt="desktop-frame"/>
            <div class="vz-theme-preview__img__overlay">
                <img :src="template.img_desktop" alt="img_desktop"/>
            </div>
        </div>
        <div class="vz-theme-preview__img  vz-theme-preview__img--mobile">
            <img class="vz-theme-preview__img__frame" :src="'mobile_frame.png'|image"
                 alt="mobile-frame"/>
            <div class="vz-theme-preview__img__overlay">
                <img :src="template.img_mobile" alt="img_mobile"/>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "ThemePreviewImage",
        props:['template'],
        methods:{
	        popup() {
//emit
	        }
        }
	};
</script>

<style scoped>

</style>