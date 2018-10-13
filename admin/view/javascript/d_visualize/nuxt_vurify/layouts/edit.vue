<template>
    <v-app >
        <v-navigation-drawer
                :mini-variant="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                fixed
                app
        >
            <v-list>
                <v-list-tile
                        v-for="(item, i) in items"
                        :to="item.to"
                        :key="i"
                        router
                        exact
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"/>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"/>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <!--<v-toolbar-->
        <!--:clipped-left="clipped"-->
        <!--fixed-->
        <!--app-->
        <!--&gt;-->
        <!--<v-toolbar-side-icon @click="drawer = !drawer" />-->
        <!--<v-btn-->
        <!--icon-->
        <!--@click.stop="miniVariant = !miniVariant"-->
        <!--&gt;-->
        <!--<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />-->
        <!--</v-btn>-->
        <!--<v-btn-->
        <!--icon-->
        <!--@click.stop="clipped = !clipped"-->
        <!--&gt;-->
        <!--<v-icon>web</v-icon>-->
        <!--</v-btn>-->
        <!--<v-btn-->
        <!--icon-->
        <!--@click.stop="fixed = !fixed"-->
        <!--&gt;-->
        <!--<v-icon>remove</v-icon>-->
        <!--</v-btn>-->
        <!--<v-toolbar-title v-text="title"/>-->
        <!--<v-btn-->
        <!--icon-->
        <!--@click.stop="rightDrawer = !rightDrawer"-->
        <!--&gt;-->
        <!--<v-icon>menu</v-icon>-->
        <!--</v-btn>-->
        <!--</v-toolbar>-->
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-navigation-drawer
                :right="right"
                v-model="rightDrawer"
                temporary
                fixed
        >
            <v-list>
                <v-list-tile @click.native="right = !right">
                    <v-list-tile-action>
                        <v-icon light>compare_arrows</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-footer
                :fixed="fixed"
                app
        >
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
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
                    {icon: 'bubble_chart', title: 'Edit', to: '/edit'}
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Vuetify.js'
            }
        }
    }
</script>
