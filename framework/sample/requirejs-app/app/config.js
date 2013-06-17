// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file
    deps: ["../vendor/require.config", "main"],

    paths: {
        text: '../vendor/libs/require.text'
    },

    map: {
        // Put additional maps here.
    },

    shim: {
        // Put shims here.
    },

    approot: '/Users/hano/Documents/Development/Projects/bikini/framework/sample/requirejs-app/'

});
