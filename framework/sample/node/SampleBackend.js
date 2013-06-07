#! /usr/bin/env node

var requirejs = require('/usr/local/bin/r.js');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

var dependences = [
    '../../modules/core/m',
    '../../modules/core/object',
    '../../modules/core/error',
    '../../modules/core/controller',
    '../../modules/core/application',
    '../../modules/core/const',
    '../../modules/data/model',
    '../../modules/data/entity',
    '../../modules/data/field',
    '../../modules/data/collection',
    '../../modules/data/data_selector',
    '../../modules/data/sql_selector',
    '../../modules/data/connectors/connector',
    '../../modules/data/connectors/web_sql',
    '../app/SampleApp',
    '../app/models/person',
    '../app/controllers/application'
];


requirejs(dependences,
    function   () {
        //foo and bar are loaded according to requirejs
        //config, but if not found, then node's require
        //is used to load the module.
        console.log(SampleApp.start());
    });

//var SampleApp = require('./SampleApp.js');
//SampleApp();

