'use strict';

module.exports = function( grunt ) {

    // Internal libs
    var _ = require('lodash');

    grunt.registerTask('compileTemplates', function() {

        var basePath = 'src/templates/';
        var dest = 'src/templates.js';

        var files = grunt.file.expand(basePath + '**/*.ejs');
        var result = {};

        _.each(files, function( path ) {

            var helper = path.replace(basePath, '').split('/');
            var theme = helper[0];
            var template = helper[1];

            if( !result[theme] ) {
                result[theme] = {};
            }
            grunt.log.debug(helper[1]);
            result[theme][template] = grunt.file.read(path);
        });

        if(grunt.file.exists(dest)) {
            grunt.file.delete(dest);
        }

        var content = grunt.file.read(__dirname + '/tpl/templates.txt');
        result = JSON.stringify(result);

        grunt.template.addDelimiters('square-brackets', '[%', '%]');
        content = grunt.template.process(content, {data: {vars: result}, delimiters: 'square-brackets'});

        grunt.file.write(dest, content);
    });
}