<template id="vz-component-list">
    <div class="vz-component-list">

        <ul v-for="(component, index) in components">
            <li>
                <label :for="index"> {{index}}
                </label>
                <select :name="index" >
                    <option v-for="(component_variations, inedex_variation) in component"
                            :value="component_variations.template" :selected="(component_variations.template == (active_template.setting.page.default.layout.partial[index]?active_template.setting.page.default.layout.partial[index].component[index].template:false))"> {{inedex_variation}}</option>
                </select>
            </li>
        </ul>
    </div>
</template>
