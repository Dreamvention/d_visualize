<template id="vz-theme-preview">
    <div class="vz-theme-preview">
        <div class="vz-theme-preview-images" @click="popup">
            <div class="vz-theme-preview__img">
                <img class="vz-theme-preview__img__frame" :src="$o('img.desktop_frame')" alt="desktop-frame"/>
                <div class="vz-theme-preview__img__overlay">
                    <img :src="active_template.img_desktop" alt="img_desktop"/>
                </div>
            </div>
            <div class="vz-theme-preview__img  vz-theme-preview__img--mobile">
                <img class="vz-theme-preview__img__frame" :src="$o('img.mobile_frame')" alt="mobile-frame"/>
                <div class="vz-theme-preview__img__overlay">
                    <img :src="active_template.img_mobile" alt="img_mobile"/>
                </div>
            </div>
        </div>
        <div class="vz-theme-preview__description">
            <h2>{{active_template.setting.title}} </h2>
            <p>{{active_template.setting.description}} </p>
            <div class="btn-holder">
                <router-link to="/edit" class="btn btn-info">{{$t('common.entry_edit_theme')}}</router-link>
                <button @click="change_status" class="btn" :class="{'btn-warning':status,'btn-success':!status}">
                    {{status?
                    $t('common.entry_deactivate'):$t('common.entry_activate')}}
                </button>
                <div class="vz-dropdown vz-dropdown--theme-preview">
                    <button @click="show_actions=!show_actions" class="btn btn-info">{{$t('home.actions')}}</button>
                    <transition name="fade">
                        <div v-if="show_actions" class="vz-dropdown__inner">
                            привет
                        </div>
                    </transition>
                </div>

            </div>
            <p>{{ $t('home.last_saved') + $store.getters.active_template.setting.last_saved}}</p>
        </div>
    </div>
</template>