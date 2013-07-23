// Set the require.js configuration for your application.
require.config({

    baseUrl: '../../', // framework path

    paths: {
        app: 'sample/contacts/app',
        text: 'modules/libs/require.text',
        templates: 'sample/contacts/app/templates'
    },

    shim: {
        "app/main" : {
            deps: ["modules/core", "modules/ui", "modules/data"]
        }
    }
});

define(['app/main']);
