$(document).bind("mobileinit", function(){
    /* do something on mobile init or configure jqm */
    document.location.hash = '';
    //history.pushState(null, null, '#m_entryPage');

    /* disable default loader of jqm */
    $.mobile.loadingMessage = '';
});
$(document).ready(function(){
    /* do something on dom ready */
});