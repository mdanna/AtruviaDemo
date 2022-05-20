function AS_AppEvents_ec9c1d42e841467fbba823dc3337ea3d(eventobject) {
    var self = this;
    voltmx.i18n.setCurrentLocaleAsync(globals.DEFAULT_LANGUAGE, () = > {
        voltmx.print(`Set language: $ {
            globals.DEFAULT_LANGUAGE
        }`);
    }, (error) = > alert(JSON.stringify(error)));
}