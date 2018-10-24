<template>
    <div class="component-container" :style="'margin-left:'+container_width">
        <header class="component-container__header">
            <slot name="header"></slot>
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
		data() {
			return {
				container_width: '320px'
			};
		},
		mounted() {
			setTimeout(()=>{
				this.container_width = '0px';
            },100)
		}
	};
</script>

<style lang="scss">
    .component-container {
        position: absolute;
        top: 0px;
        left: 0px;
        width: calc(100% - 1px);
        z-index: 3;
        transition: margin-left .2s;
        &__header {
            background-color: var(--info);
            display: flex;
            min-height: 50px + 20px;
            h2 {
                margin-bottom: 0;
                text-align: center;
                position: absolute;
                width: 100%;
                padding: 20px 40px;
            }
            .v-icon {
                font-size: 15px;
            }
            .v-btn{
                margin-top: 15px;
                margin-bottom: 15px;
            }
        }
        &__main {
            background: #fff;
            padding: 15px;
            }
    }
</style>