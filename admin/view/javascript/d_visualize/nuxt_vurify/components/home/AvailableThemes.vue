<template>
    <div class="available-themes">
        <v-container grid-list-lg fluid>
            <v-layout row reverse  wrap available-themes__item>
                <v-flex
                        v-for="template,key in templates"
                        :key="key"
                        lg4
                        md6
                        sm6
                        xs12>
                    <v-card class="available-themes__item">
                        <v-img class="available-themes__item__img"
                               :src='template.img_desktop'
                               max-height="150">
                        </v-img>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">
                                    {{template.db_saved?template.title:template.setting.title}}
                                </h3>
                                <div>
                                    {{template.db_saved?template.description:template.setting.description}}
                                </div>
                            </div>
                        </v-card-title>
                        <v-card-actions class="available-themes__btns">
                            <v-btn flat color="black">{{$t('template.explore')}}</v-btn>
                        </v-card-actions>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    export default {
        name: "available-themes",
        props: ['templates'],
        data() {
            return {}
        }
    }
</script>
<style scoped lang="scss">
    .available-themes__item {
        overflow: hidden;
        &__img:hover {
            transition: all .4s ease-in-out;
            transform: scale(1.2);
        }
    }
    .available-themes__btns{
        display: flex;
        justify-content: flex-end;
    }
</style>