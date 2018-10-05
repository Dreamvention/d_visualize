<template id="vz-edit-theme">
    <div class='vz-edit' :class="{'menu-hidden':menu.hidden}">
        <vz-edit-menu></vz-edit-menu>
        <div class=vz-edit__iframe>
            <iframe id="iframe" :src="iframe_src" @load="iframeLoad" frameborder="0" borderwidth="0"></iframe>
        </div>
    </div>
</template>