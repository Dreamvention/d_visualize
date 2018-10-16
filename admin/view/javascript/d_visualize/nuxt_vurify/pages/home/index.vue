<template>
    <div v-if="template" class="themes">
        <a :href="$store.getters['opencart/opData'].base_url" target="_blank" class="home__view-store">
            <v-icon>fas fa-eye</v-icon>
            {{$t('common.preview')}}</a>
        <v-layout
                justify-space-between
                theme-holder
                wrap>
            <v-flex xs12 md3>
                <h3 class="display-2">{{$t('common.current_theme')}}</h3>
                <p> {{$t('common.current_theme_description')}}</p>
            </v-flex>
            <v-flex xs12 f-auto>
                <theme-preview :template="template"
                               :status="status"
                               @change-title="rename_theme"
                               @change-status="change_status"
                />
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout
                justify-space-between
                more-themes-holder
                wrap>
            <v-flex xs12 md3>
                <h3 class="display-2">{{$t('template.available_templates')}}</h3>
                <p> {{$t('template.available_templates_description')}}</p>
            </v-flex>
            <v-flex xs9>
                <available-themes :templates="templates"/>
            </v-flex>
        </v-layout>
    </div>
</template>
<style lang="scss">
    .home__view-store {
        color: #5a6781;
        .theme--light.v-icon {
            color: #5a6781;
            font-size: 18px;
        }
        display: inline-block;
        margin-bottom: 15px;
    }

</style>
<script>
	import ThemePreview from '~/components/home/ThemePreview.vue';
	import AvailableThemes from '~/components/home/AvailableThemes.vue';
	import {mapGetters} from 'vuex';

	export default {
		name: "index",
		async fetch({store}) {
			await store.dispatch('template/GET_TEMPLATES');
			store.commit('load/LOADING_END');
		},
		computed: mapGetters({
			templates: 'template/templates',
			template: 'template/active_template',
			status: 'setting/status'
		}),
		components: {
			ThemePreview,
			AvailableThemes
		},
		methods: {
			rename_theme(value) {
				this.$store.dispatch('template/RENAME_TEMPLATE_TITLE', {
					template_codename: this.template.setting.codename,
					value: value
				});
			},
			change_status(value) {
				this.$store.dispatch('setting/TOGGLE_STATUS');
			}
		}
	};
</script>
