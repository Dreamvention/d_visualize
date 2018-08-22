<template id="t-home">
    <div class="vis content">
        <template-thumb
                v-for="(item, index) in templates"
                :item="item"
                :index="index">
        </template-thumb>
        <ol>
            <li v-for="template in templates">
                <span v-if="template['codename']==activeTemplate" style="background: red">
                {{ template }}
                </span>
                <span v-else>
                {{ template }}
                </span>
            </li>
        </ol>
    </div>
</template>