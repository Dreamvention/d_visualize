<template id="vz-edit">
    <div class='vz-edit' :class="[route_class,{'menu-hidden':menu.hidden}]">
        <vz-edit-menu></vz-edit-menu>
        <vz-edit-iframe></vz-edit-iframe>
    </div>
</template>