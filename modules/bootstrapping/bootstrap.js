$(document).bind("mobileinit", function(){
    /* redirect app, if there is already a location hash */
    if(document.location.hash) {
        document.location = document.location.origin + document.location.pathname;
    }
    //history.pushState(null, null, '#m_entryPage');

    /* disable default loader of jqm */
    $.mobile.loadingMessage = '';
});
$(document).ready(function(){
    /* do something on dom ready */
});