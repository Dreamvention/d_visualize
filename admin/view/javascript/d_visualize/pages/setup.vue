<template>
    <div class="setup">
        <v-container fluid>
            <v-card class='mx-auto mb-5' color="transparent" flat justify-center max-width="520" >
                <v-img :src='"setup/logo.svg"|image'
                       max-width="150"
                      class="mx-auto mb-3"
                >
                </v-img>

                <v-layout align-center column  justify-center mb-5>
                    <v-img :src='"setup/logo.svg"|image'
                           max-width="150"
                           min-width="150"
                    >
                    </v-img>
                    <div class="display-4 mb-3">
                        Visualize
                    </div>
                    <div class="subheading">Your header is the first thing people see. Now you can design your own
                        header or use a ready made template to edit it to your needs. No coding is required. With Visual
                        Designer it has never been easier to create your unique header and edit every single option. Say
                        goodbye to developers. Hello Visual Designer Header
                    </div>
                </v-layout>
            </v-card>
            <v-layout align-center justify-center row mb-5>
                <v-flex mr-4 xs2>
                    <v-img :src='"setup/icons/icon1.svg"|image'
                           class="available-themes__item__img"
                           max-width="100"
                    >
                    </v-img>
                    Visual Editor
                </v-flex>
                <v-flex mr-4 xs2>
                    <v-img :src='"setup/icons/icon2.svg"|image'
                           max-width="100"

                    >
                    </v-img>
                    Ready to use templates
                </v-flex>
                <v-flex mr-4 xs2>
                    <v-img :src='"setup/icons/icon3.svg"|image'
                           max-width="100"

                    >
                    </v-img>
                    Unlimited layout options
                </v-flex>
                <v-flex xs2>
                    <v-img :src='"setup/icons/icon4.svg"|image'
                           max-width="100"
                    >
                    </v-img>
                    Works with any theme
                </v-flex>
            </v-layout>

            <v-img :src='"setup/bg.svg"|image'
            >
                <v-layout align-center justify-center row>
                    <v-btn @click="setup" color="primary">
                        setup
                    </v-btn>
                </v-layout>
            </v-img>
        </v-container>
    </div>
</template>
<script>
	export default {
		layout: 'opencart',
		async fetch({store}) {
			store.commit('load/LOADING_START');
			await store.dispatch('opencart/GET_OPDATA');
			store.commit('load/LOADING_END');
		},
		methods: {
			async setup({redirect}) {
				await this.$store.dispatch('opencart/SETUP');
				this.$router.push('home')
			}
		}
	};
</script>
