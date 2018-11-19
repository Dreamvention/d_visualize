<template>
    <div class="available-themes">
        <v-container grid-list-lg fluid>
            <v-layout row reverse wrap available-themes__item>
                <v-flex
                        v-for="template, key in templates"
                        :key="key"
                        lg4
                        md6
                        sm6
                        xs12>
                    <v-card class="available-themes__item">
                        <v-img class="available-themes__item__img"
                               :src='template.preview.desktop'
                               max-height="150">
                        </v-img>
                        <v-card-title primary-title>
                            <div class="description-wrap">
                                <div class="headline mb-0">
                                    {{template.db_saved?template.title:template.setting.title}}
                                </div>
                                <div class="description">
                                    {{template.description_short?template.description_short:template.db_saved?template.description:template.setting.description|truncate(50)}}
                                </div>
                            </div>
                        </v-card-title>
                        <v-card-actions class="available-themes__btns">
                            <ThemePopUp :active="active" :template="template" @changeTheme="changeTheme">
                            </ThemePopUp>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
	import ThemePopUp from '~/components/home/ThemePopUp';

	export default {
		name: "available-themes",
		props: ['templates','active'],
		data() {
			return {};
		},
		components: {
			ThemePopUp
		},
        methods:{
	        changeTheme(value){
	        	this.$store.dispatch('setting/CHANGE_ACTIVE_TEMPLATE',value)
            },
        }
	};
</script>
<style scoped lang="scss">
    .available-themes__item {
        overflow: hidden;
        &__img:hover {
            transition: all .4s ease-in-out;
            transform: scale(1.2);
        }
    }

    .available-themes__btns {
        display: flex;
        justify-content: flex-end;
    }
</style>