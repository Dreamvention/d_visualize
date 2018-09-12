<template id="vz-edit-theme">
    <div class='vz-edit-theme'>
        <div class="menu">
            vz-side-menu
        </div>
        <div class="iframe">
            <iframe :src="$o('edit.iframe_edit')" @onload="iframeLoad" frameborder="0" borderwidth="0" ></iframe>
        </div>
    </div>
</template>