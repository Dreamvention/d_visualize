<template>
        <ul class="breadcrumb">
            <li v-for="breadcrumb in breadcrumbs"><a :href="breadcrumb.href">{{ breadcrumb.text }}</a></li>
        </ul>
</template>

<script>
    export default {
        name: 'breadcrumbs',
        props: ['breadcrumbs']
    }
</script>
