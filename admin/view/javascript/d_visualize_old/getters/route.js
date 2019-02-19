d_visualize.getters.iframe_history = function (state) {
	return state.iframe_history;
};
d_visualize.getters.menu = function (state) {
	return state.menu;
};
d_visualize.getters.route = function (state) {
	return state.route;
};
d_visualize.getters.edit_history = function (state) {
	return state.edit_history;
};
d_visualize.getters.current_page = function (state, getters) {
	let current_page = state.current_page;
	_.map(getters.available_page, (page)=>{
		page = page.replace('/', '\/');
		var matches = state.current_page.match(page);
		if (matches) {
			current_page = page;
		}
	});
	return current_page;
};
d_visualize.getters.available_page = function (state, getters) {
	return _.keys(getters.active_template.setting.page);
};
/*
* Recursively merge properties of two objects
*/
function MergeRecursive(obj1, obj2) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

        } catch (e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }

    return obj1;
}

d_visualize.getters.components = function (state, getters) {
    let common_componenents = getters.active_template.setting.page['default'].layout.component;
    let merged_components;
    if (getters.active_template.setting.page[getters.current_page]) {
        let page_components = getters.active_template.setting.page[getters.current_page].layout.component;
        merged_components = MergeRecursive(JSON.parse(JSON.stringify(common_componenents)), page_components);
    } else {
        merged_components = JSON.parse(JSON.stringify(common_componenents));
    }
    common_componenents = _.reduce(merged_components, (memo, component, key) => {
        if (component.editable) {
            memo[key] = component
        }
        return memo
    }, [])

    return common_componenents;
};

d_visualize.getters.available_components = function (state) {
    return state.available_components;
};
d_visualize.getters.iframe_src = function (state) {
    return state.iframe_src;
};
d_visualize.getters.vd_loaded = function (state) {
    return state.vd_loaded;
};
d_visualize.getters.component = function (state, getters) {
    return getters.components[state.route.params.id];
};
