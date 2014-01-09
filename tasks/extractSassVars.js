'use strict';

module.exports = function( grunt ) {

    // Internal libs
    var _ = require('lodash');

    grunt.registerMultiTask('extractSassVars', 'Convert sass variables to javascript', function() {
        var collection = [];
        var regExp = /\$([^:]+):[\s]+([^;]+);/g;
        var results;

        // Iterate over all specified file groups.
        this.files.forEach(function( f ) {
            // Concat specified files.
            var sassVars = f.src.filter(function( filepath ) {
                // Warn on and remove invalid source files (if nonull was set).
                if( !grunt.file.exists(filepath) ) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function( filepath ) {
                    // Read file source.
                    var regex = new RegExp('^resources/sass/themes/([^/]*)');
                    var themeName = filepath.match(regex)[1];
                    return {
                        theme: themeName,
                        content: grunt.file.read(filepath)
                    };
                });
            _.each(sassVars, function( item ) {
                while( (results = regExp.exec(item.content)) != null ) {
                    if( !item.vars ) {
                        item.vars = {};
                    }
                    item.vars[results[1]] = results[2];
                }
                delete item.content;
            });
            _.each(sassVars, function( item ) {
                var group = item.vars;

                for( var key in group ) {
                    for( var key2 in group ) {
                        group[key2] = group[key2].replace(new RegExp('\\$' + key, 'gi'), group[key]);
                    }
                }
            });
            var vars = {};
            _.each(sassVars, function( item ) {
                vars[item.theme] = item.vars
            });
            var output = grunt.file.read(__dirname + '/tpl/themevars.txt');
            output = grunt.template.process(output, {data: {vars: JSON.stringify(vars, null, 4)}});

            // Write the destination file.
            grunt.file.write(f.dest, output);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });
}