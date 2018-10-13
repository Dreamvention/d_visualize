<template>
    <div class="home" v-if="template">
        <h2>{{$t('common.current_theme')}}</h2>
        <p> {{$t('common.current_theme_description')}}</p>
        <a :href="$store.getters['opencart/opData'].base_url" target="_blank">{{$t('common.preview')}}</a>
        <theme-preview :template="template" :status="status"/>
    </div>
</template>

<script>
    import ThemePreview from '~/components/ThemePreview.vue'
    import {mapGetters} from 'vuex'

    export default {
        layout: 'opencart',
        async fetch({store}) {
            await store.dispatch('template/GET_TEMPLATES');
            store.commit('load/LOADING_END');
        },
        computed: mapGetters({
            template: 'template/active_template',
            status: 'setting/status'
        }),
        components: {
            ThemePreview
        },

    }
</script>
