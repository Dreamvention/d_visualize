<template id="vz-edit-theme">
    <div class='vz-edit-theme' :class="{'menu-hidden':menu.hidden}">
        <div class="vz-edit-theme-menu-wrap">
            <vz-edit-menu></vz-edit-menu>
            <vz-edit-controls></vz-edit-controls>
        </div>
        <div class="vz-edit-iframe">
            <iframe id="iframe" :src="iframe_src" @load="iframeLoad" frameborder="0" borderwidth="0"  ></iframe>
        </div>
    </div>
</template>