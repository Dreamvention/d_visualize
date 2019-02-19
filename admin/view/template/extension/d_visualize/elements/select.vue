<template id="t-select">
    <select class="form-control" :name="name" :value="value" @change="handleChange">
        <option v-if="none" value="">{{ $t('common.text_none') }}</option>
        <option v-for="option, key in options" :value="key" v-html="option"></option>
    </select>
</template>