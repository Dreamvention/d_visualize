<template>
    <!--<v-app >-->
        <!--<v-navigation-drawer-->
                <!--:mini-variant="miniVariant"-->
                <!--:clipped="clipped"-->
                <!--v-model="drawer"-->
                <!--fixed-->
                <!--app-->
        <!--&gt;-->
            <!--<v-list>-->
                <!--<v-list-tile-->
                        <!--v-for="(item, i) in items"-->
                        <!--:to="item.to"-->
                        <!--:key="i"-->
                        <!--router-->
                        <!--exact-->
                <!--&gt;-->
                    <!--<v-list-tile-action>-->
                        <!--<v-icon v-html="item.icon"/>-->
                    <!--</v-list-tile-action>-->
                    <!--<v-list-tile-content>-->
                        <!--<v-list-tile-title v-text="item.title"/>-->
                    <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
            <!--</v-list>-->
        <!--</v-navigation-drawer>-->
        <!--<v-content>-->
            <!--<v-container>-->
                <!--<nuxt/>-->
            <!--</v-container>-->
        <!--</v-content>-->
        <!--<v-navigation-drawer-->
                <!--:right="right"-->
                <!--v-model="rightDrawer"-->
                <!--temporary-->
                <!--fixed-->
        <!--&gt;-->
            <!--<v-list>-->
                <!--<v-list-tile @click.native="right = !right">-->
                    <!--<v-list-tile-action>-->
                        <!--<v-icon light>compare_arrows</v-icon>-->
                    <!--</v-list-tile-action>-->
                    <!--<v-list-tile-title>Switch drawer (click me)</v-list-tile-title>-->
                <!--</v-list-tile>-->
            <!--</v-list>-->
        <!--</v-navigation-drawer>-->
    <!--</v-app>-->
</template>

<script>
    export default {
        data() {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                items: [
                    {icon: 'apps', title: 'home', to: '/'},
                    {icon: 'bubble_chart', title: 'Edit', to: '/editor'}
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Vuetify.js'
            }
        }
    }
</script>
