<template id="vis-theme-preview">
    <div class="vis-theme-preview">
        <img :src="active_template_preview.img" alt="" @click="popup"/>
        <div>
            <h2>{{active_template_preview.title}} </h2>
            <p>{{active_template_preview.description}} </p>
            <router-link to="/edit" class="btn btn-info">{{$t('common.entry_edit-theme')}}</router-link>
        </div>
    </div>
</template>