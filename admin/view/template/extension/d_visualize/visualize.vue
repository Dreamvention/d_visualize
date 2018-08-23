<template id="t-visualize" >
    <div class="visualize" :class="{'loading':loading}">
        <div class="page-header">
            <div class="container-fluid">
                <div class="surf"></div>
                <div class="form-inline pull-right">
                    <!--<mm-select name="store" :value="setting.global.design_border_style" :options="$o('common.border_styles')" @change="changeElement"//>-->

                    <!--<select id="store" onChange="location = '{{ module_link }}&store_id=' + $('#store').val();"-->
                            <!--class="form-control">-->
                        <!--{% for store in stores %}-->
                            <!--<option value="{{ store['store_id'] }}" {{ store['store_id'] == store_id ? 'selected="selected"' : '' }}>{{ store['name'] }}</option>-->
                        <!--{% endfor %}-->
                    <!--</select>-->
                    <!--todo multi store-->
                    <button data-toggle="tooltip" :title="$t('common.button_save_and_stay')" @click="save_stay" class="btn btn-success"><i
                            class="fa fa-save"></i></button>
                    <button data-toggle="tooltip" :title="$t('common.button_save')" @click="save" class="btn btn-primary "><i
                            class="fa fa-save"></i></button>
                    <a :href="$o('action.cancel')" data-toggle="tooltip" :title="$t('common.button_cancel')"
                       class="btn btn-default" id="cancel-button"><i class="fa fa-reply"></i></a>
                </div>
                <h1>{{$t('common.heading_title')}} {{$o('common.version')}}</h1>
                <breadcrumbs></breadcrumbs>
            </div>
        </div>
        <div class="container-fluid" >
            <div class="panel panel-default" >
                <div class="panel-heading">
                    <h3 class="panel-title "><i class="fa fa-pencil"></i> {{$t('common.text_edit')}}</h3>
                    <div class="status-wrap pull-right d-inline-block">
                        <d-switcher v-if="!loading_first" :name=" $o('common.id')+'_status'" :value="status" @change="change_status"/>
                    </div>
                </div>
                <div class="panel-body">
                    <!--<navigation></navigation>-->
                    <!--<hr/>-->
                    <!--<router-view></router-view>-->
                    <home></home>
                </div>
            </div>
            <d-loader></d-loader>
        </div>
    </div>
</template>


