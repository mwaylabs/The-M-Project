// Set the require.js configuration for your application.
require.config({

    baseUrl: '../../',

    // Initialize the application with the main application file
    deps: ["modules/core", "modules/ui", "modules/data"],


    map: {
        // Put additional maps here.
    },

    shim: {
        // Put shims here.
    },

    approot: ''

});
