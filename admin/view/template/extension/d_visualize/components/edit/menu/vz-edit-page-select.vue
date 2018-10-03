<template id="vz-edit-page-select">
    <div class="vz-edit-page-select">
        <div class="form-group">
            <label for=""> {{$t('edit.current_page')}} - {{currentPage}}</label>
            <select class="form-control" v-model="currentPage">
                <option v-for="(page) in availablePages"
                        :value="page">
                    {{$t('page.page_'+page)}}
                </option>
            </select>
        </div>
    </div>
</template>
