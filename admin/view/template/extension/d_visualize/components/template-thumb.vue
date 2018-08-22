<template id="t-template-thumb">
    <div class="vis content">
        <div class="template-thumb" :class="{active: activeThumb}">
            <img :src="item.img" alt="">
            <div>
                <h2>{{item.title}} </h2>
                <p>{{item.description}} </p>
            </div>
        </div>
    </div>
</template>