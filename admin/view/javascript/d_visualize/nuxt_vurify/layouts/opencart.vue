<template>
    <div class="opencart">
        <v-app id="inspire" v-if="opData">
            <v-navigation-drawer
                    v-model="drawer"
                    fixed
                    clipped
                    app
                    mobile-break-point="768"
                    width="270"
            >
                <div class="opencart-column-left" v-html="opData.column_left">
                </div>
            </v-navigation-drawer>
            <v-toolbar
                    color="transparent"
                    card
                    clipped-left
                    app
                    fixed
            >
                <div v-html="opData.header" class="opencart-header"></div>
            </v-toolbar>
            <v-content>
                <div class="content" :class="{'loading':loading.on_progress}" v-if="loading.content_loaded">
                    <nuxt />
                    <div v-if="loading.status==load.FAIL" class="no_data_found">
                        <img :src="$o('img.no_data_img')" alt="nodata">
                    </div>
                    <div class="opencart-footer" v-html="opData.footer"></div>
                </div>
            </v-content>
        </v-app>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {LOAD} from '~/constants'

    export default {
        data: () => ({
            load:LOAD,
            drawer: null
        }),
        computed: mapGetters({
            opData: 'opencart/opData',
            loading: 'load/loading',
        }),
        head() {
            return {
                title: this.opData.title,
            }
        },
        mounted() {
            if (this.opData.header) {
                document.querySelector('#button-menu').addEventListener('click', (e) => {
                    e.preventDefault();
                    this.drawer = !this.drawer;
                })
            }
        }
    }
</script>
