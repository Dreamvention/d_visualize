<template id="vz-theme-list">
    <div class="vz-theme-list">
        <h3>{{$t('dashboard.entry_available_templates')}}</h3>
        <div class="vz-theme-thumbs">
            <vz-theme-thumb
                    v-for="(item, index) in templates"
                    :item="item"
                    :index="item.codename"
            >
            </vz-theme-thumb>
        </div>

    </div>
</template>