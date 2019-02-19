<template>
    <div class="setting-item">
        <!-- todo make this work-->
        <span class="subheading">{{$t(setting.text)}}</span>
        <template v-if="setting.type === 'slider'">
            <v-slider
                    :label="values[button_key]"
                    inverse-label
                    :min="setting.min"
                    :max="setting.max"
                    :step="setting.step"
                    :value="parseFloat(values[button_key])"
                    @change="changeVariable(button_key,$event)"
            ></v-slider>
        </template>
        <template v-else-if="setting.type ==='button-family'">
            <div class="button-box">
                <div class="button-box__family" :style='`button-family:${values[button_key]}, sans ,sans-serif;`'>
                    {{values[button_key]}}
                </div>
                <v-btn block
                       color="info"
                       class="my-0 button-box__change"
                       @click="showPicker(button_key,values[button_key],setting,$event)">
                    {{$t('common.change')}}
                </v-btn>
            </div>
        </template>
        <template v-else-if="setting.type === 'toggle'">
            <div class="toggler">
                <v-btn-toggle
                        :value="values[button_key]"
                        @change="changeVariable(button_key,$event)"
                        class="transparent"
                        multiple>
                    <template v-for="toggle in setting.values">
                        <v-tooltip right>
                            <v-btn slot="activator" :value="toggle.value" color="primary">
                                <v-icon>{{toggle.icon}}</v-icon>
                            </v-btn>
                            <span v-html="$t(toggle.text)"></span>
                        </v-tooltip>
                    </template>
                </v-btn-toggle>
            </div>
        </template>
        <template v-else-if="setting.type === 'color'">
            <div class="color-box__item">
                <div class="color-box__color-icon" @click="showPicker(color_key,values[color_key],settings,$event)"
                     :style="'background-color: '+ values[color_key]| sanitaze_css"></div>
                <span>{{values[color_key]|sanitaze_css}}</span>
            </div>
        </template>
        <template v-else>
            Cant load config setting
        </template>
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
            <FontPicker :value="picker.value" @input="changeVariable">
                <template slot="load_more">
                    <v-btn block color="primary">{{$t('common.load_more')}}</v-btn>
                </template>
                <template slot="not_found">
                    {{$t('button.not_found')}}
                </template>
            </FontPicker>
        </v-menu>

    </div>
</template>

<script>
	export default {
		name: 'setting-item',
		props: ['setting','values','key']
	}
</script>
