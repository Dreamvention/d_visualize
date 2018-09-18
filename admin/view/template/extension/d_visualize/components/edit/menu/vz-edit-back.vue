<template id="vz-edit-back">
    <div class="vz-edit-back">
        <i class="fas" :class="{'fa-arrow-left':!close,'fa-times':close}" @click="history.back()"></i>
    </div>
</template>
