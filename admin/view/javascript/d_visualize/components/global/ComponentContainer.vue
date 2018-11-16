<template>
    <div class="component-container" :style="'margin-left:'+pull_left">
        <header class="component-container__header">
            <slot name="header">
                <div class="display-3">{{component_name}}</div>
            </slot>
            <v-btn nuxt to="/editor" flat icon exact color="accent">
                <v-icon small>fas fa-chevron-left</v-icon>
            </v-btn>
        </header>
        <main class="component-container__main">
            <slot></slot>
        </main>
    </div>
</template>

<script>
	export default {
		name: "ComponentContainer",
		// props: ['pull_left'],
		data() {
			return {
				pull_left: '320px'
			}
		},
		computed: {
			component_name() {
				return this.$t('common.entry_' + this.$route.params.id);
			},
		},
		validate({params}) {
			return !isNaN(+params.id);
		},
		mounted() {
			setTimeout(()=>{
				this.pull_left = 0;
			},)
		}
	};
</script>

<style lang="scss">
    .component-container {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0;
        bottom: 0;
        width: 100%;
        z-index: 3;
        transition: margin-left .2s;
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--secondary);
        &__header {
            background-color: var(--info);
            display: flex;
            min-height: 50px + 20px;
            position: relative;
            .display-3 {
                margin-bottom: 0;
                text-align: center;
                width: 100%;
                padding: 20px 40px;
            }
            .v-icon {
                font-size: 15px;
            }
            .v-btn{
                position: absolute;
                left: 0;
                top: calc(50% - 32px);
                margin-top: 15px;
                margin-bottom: 15px;
            }
        }
        &__main {
            background: #fff;
            padding: 15px;
            flex-grow: 1;
            }
    }
</style>