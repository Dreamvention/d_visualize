<template id="vz-theme-preview">
    <div class="vz-theme-preview">
        <img :src="active_template_preview.img" alt="" @click="popup"/>
        <div>
            <h2>{{active_template_preview.title}} </h2>
            <p>{{active_template_preview.description}} </p>
            <div class="btn-holder">
                <router-link to="/edit" class="btn btn-info">{{$t('common.entry_edit_theme')}}</router-link>
                <button @click="change_status" class="btn btn-default">{{switch_text}}</button>
            </div>
        </div>
    </div>
</template>