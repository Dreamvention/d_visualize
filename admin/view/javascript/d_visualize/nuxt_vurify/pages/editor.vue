<template>
    <v-app id="vz-edit" v-if="iframe">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
                mobile-break-point="768"
                width="300"
        >
            menu
            <v-footer fixed>
                <div class=vz-edit-controls>
                    <div class="hider" @click="toggle_show"><i class="fas " :class="menu.hidden?'fa-caret-right':'fa-caret-left'"></i></div>
                    <div class="help-text" v-if="!menu.hidden">{{$t('common.entry_collapse')}}</div>
                    <div class="vz-edit-responsive_toggle">
                        <div class="desktop" @click="changeIfrmeSize('100%')"><i class="fas fa-desktop"></i></div>
                        <div class="tablet" @click="changeIfrmeSize('770px')"><i class="fas fa-tablet-alt"></i></div>
                        <div class="phone" @click="changeIfrmeSize('320px')"><i class="fas fa-mobile-alt"></i></div>
                    </div>
                </div>
            </v-footer>
        </v-navigation-drawer>
        <v-content fluid
                   app>
            <Iframe :iframe="iframe"></Iframe>
        </v-content>
    </v-app>
    <!--<div class='vz-edit' :class="[{'menu-hidden':menu.hidden}]" v-if="iframe">-->

        <!--&lt;!&ndash;<vz-edit-menu></vz-edit-menu>&ndash;&gt;-->
    <!--</div>-->
</template>
<script>
    import {mapGetters} from 'vuex'
    import Iframe from '~/components/editor/Iframe.vue'
    import {LOAD} from '~/constants'

    export default {
        computed: mapGetters({
            iframe: 'editor/iframe',
            menu: 'editor/menu',
            // route_class: 'x'
        }),
        data: () => ({
            load: LOAD,
            drawer: null
        }),
        async fetch({store}) {
            store.dispatch('editor/GET_EDITOR_IFRAME')
        },
        components: {
            Iframe
        }
    }
</script>
