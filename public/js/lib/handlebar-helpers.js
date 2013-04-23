Handlebars.registerHelper("key_value", function (obj, fn) {
    var buffer = "",
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            buffer += fn.fn({ key: key, value: obj[key] });
        }
    }

    return buffer;
});