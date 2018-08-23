<template id="t-home">
    <div class="vis-home">
        <template-thumb
                v-for="(item, index) in templates"
                :item="item"
                :index="item.codename"
        >
        </template-thumb>
    </div>
</template>