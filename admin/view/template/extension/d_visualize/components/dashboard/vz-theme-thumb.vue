<template id="vz-theme-thumb">
    <div class="vz-theme-thumb" :class="{active: activeThumb}" @click="handleChange">
        <img :src="item.img" alt="">
        <div>
            <h2>{{item.setting.title}} </h2>
            <p>{{item.setting.description}} </p>
        </div>
    </div>
</template>