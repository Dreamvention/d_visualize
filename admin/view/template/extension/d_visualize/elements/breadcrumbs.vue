<template id="t-breadcrumbs">
    <ul class="breadcrumb">
        <li v-for="breadcrumb in $o('common.breadcrumbs')"><a :href="breadcrumb.href">{{ breadcrumb.text }}</a></li>
    </ul>
</template>