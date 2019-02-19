<template>
    <div class="top-line">
        <v-container
                fluid>
            <v-layout justify-space-between
                      align-center
                      row>
                <v-flex d-flex
                        align-end
                        justify-start>
                    <h1 class="display-4 f-auto">
                        {{title}}
                    </h1>
                    <breadcrumbs :breadcrumbs="breadcrumbs"></breadcrumbs>
                </v-flex>
                <v-flex xs2
                        d-flex
                        justify-end
                        f-auto
                        top-buttons
                >
                    <v-tooltip bottom>
                        <v-btn @click="save" slot="activator" dark   color="success">
                            <v-icon dark>save</v-icon>
                        </v-btn>
                        <span>{{$t('common.button_save')}}</span>
                    </v-tooltip>
                    <a :href="opAction['cancel']" v-if="opAction">
                        <v-tooltip bottom>
                            <v-btn slot="activator" dark  color="white">
                                <v-icon dark color="black">reply</v-icon>
                            </v-btn>
                            <span>{{$t('common.button_cancel')}}</span>
                        </v-tooltip>
                    </a>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
    </div>
</template>
<script>
    export default {
        name: "top-line",
        props: ['breadcrumbs', 'title', 'opAction'],
        data() {
            return {}
        },
        methods: {
            save() {
                this.$store.dispatch('setting/SAVE')
            }
        }
    }
</script>
<style scoped lang="scss">
    .display-4, .breadcrumb {
        margin-bottom: 0px;
    }
    .top-buttons .v-btn{
        padding: 0 12px;
        min-width: auto;
        border: 1px solid var(--secondary) !important;
    }
</style>