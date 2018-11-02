<template>
    <div>
        not used
        <v-menu
                v-model="picker.showMenu"
                :close-on-content-click="false"
                :position-x="picker.x"
                :position-y="picker.y"
                absolute
                offset-y
                nudge-left="50"
                nudge-bottom="10"
                transition="scale-transition">
            <slot :picker="picker"></slot>
        </v-menu>
    </div>
</template>

<script>
	export default {
		name: "PopoverPikerContainer",
        props:['holder','template','values'],
        data(){
			return{
				picker: {
					key: '',
					value: '',
					showMenu: false,
					x: 0,
					y: 0
				}
            }
        },
		methods:{
			changeVariable(key, setting, $event) {
				this.last_change_picker = moment().valueOf();
				// _.debounce(()=>{
				// 	if (moment().valueOf() - this.last_change_picker>50) {
				this.$store.dispatch('template/SET_SKIN_VARIABLE', {
					template_id: this.template.setting.codename,
					skin: this.template.setting.active_skin,
					holder: this.holder,
					key: key,
					value: `${$event}${setting.suffix ? setting.suffix : ''}`,
				});
				// }
				// },50, true)();
				console.log('change');
			},
			showPicker(key, value, settings, e) {
				e.preventDefault();
				this.picker.key = key;
				this.picker.value = value;
				this.picker.x = e.clientX;
				this.picker.y = e.clientY;
				this.picker.showMenu = false;
				this.$nextTick(() => {
					this.picker.showMenu = true
				})
			},
		}

	};
</script>

<style scoped>

</style>