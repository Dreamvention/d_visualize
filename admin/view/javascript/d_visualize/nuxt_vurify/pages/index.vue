<template>
    <div>
        <div v-html="opData.header"></div>
        <div v-html="opData.column_left"></div>
        <nuxt/>
        <div v-html="opData.footer"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        layout: 'opencart',
        head() {
            return {
                title: "Visualize home"
            }
        },
        computed: mapGetters({
            opData: 'opencart/opData'
        }),
        async fetch ({ store, params }) {
            await store.dispatch('opencart/GET_OPDATA');
        }
    }
</script>
