function truncate(selector) {
    $(selector).text(function(index, currentcontent) {
        console.log($.trim(currentcontent).substring(0, 25)
            .split(" ").slice(0, -1).join(" ") + "...");
        return $.trim(currentcontent).substring(0, 25)
            .split(" ").slice(0, -1).join(" ") + "...";
    });
}

$(document).ready(function() {
    // truncate('.product-layout-sm .product-name a');
});