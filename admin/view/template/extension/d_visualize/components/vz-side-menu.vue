<template id="vz-side-menu">
    <div class="vz-side-menu">
        <div class="heading">
            <div class="close">x</div>
            <div class="back">-</div>
            <div class="publish"><button class="btn btn-primary">publish</button></div>
        </div>
        <div class="theme_notification_help">
            You are customizing
            {{active_template.setting.title}}
        </div>
        <div class="change_theme">
            Active theme is {{active_template.setting.codename}}
            <button class="btn btn-primary">change</button>
        </div>
        <vz-mod-list></vz-mod-list>

    </div>
</template>