<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
        >
            <div class="opencart-column-left" v-html="opData.column_left">
            </div>
        </v-navigation-drawer>
        <v-toolbar
                clipped-left
        >
            <div v-html="opData.header" class="opencart-header"></div>
        </v-toolbar>
        <v-content>
            <div class="content">
                <theme-preview></theme-preview>
                <div class="opencart-footer" v-html="opData.footer"></div>
            </div>
        </v-content>
    </v-app>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ThemePreview from '~/components/ThemePreview.vue'

    export default {
        layout: 'simple',
        head() {
            return {
                title: this.opData.title,
            }
        },
        data: () => ({
            drawer: null
        }),
        computed: mapGetters({
            opData: 'opencart/opData',
        }),
        async fetch({store, params}) {
            await store.dispatch('opencart/GET_OPDATA');
        },
        components: {
            ThemePreview
        }
    }
</script>
