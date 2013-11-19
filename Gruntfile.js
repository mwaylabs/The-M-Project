/**
 * The-M-Project Build Script
 * Version: 0.0.1
 */

var _ = require('lodash');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*!\n' + '* Project:   The M-Project - Mobile HTML5 Application Framework\n' + '* Version:   <%= pkg.version %>\n' + '* Copyright: (c) <%= grunt.template.today("yyyy") %> M-Way Solutions GmbH. All rights reserved.\n' + '* Date:      <%= grunt.template.today() %>\n' + '* License:   Dual licensed under the MIT or GPL Version 2 licenses.\n' + '*            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE\n' + '*            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE\n' + '*/'
        },
        jsonlint: {
            sample: {
                src: [ 'package.json' ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['src/_*.js', 'src/themproject*.js', 'src/ui/themevars.js']
            },
            src: [ 'src/**/*.js' ]
        },
        preprocess: {
            options: {
                context: {
                    BANNER: '<%= meta.banner %>'
                }
            },
            core: {
                files: {
                    'dist/themproject.js': 'src/themproject.js'
                }
            },
            bd: {
                files: {
                    'dist/themproject.bd.js': 'src/themproject.bd.js'
                }
            }
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            core: {
                src: 'dist/themproject.js',
                dest: 'dist/themproject.min.js',
                options: {
                    sourceMap: 'dist/themproject.map',
                    sourceMappingURL: 'themproject.map',
                    sourceMapPrefix: 1
                }
            },
            bd: {
                src: 'dist/themproject.bd.js',
                dest: 'dist/themproject.bd.min.js',
                options: {
                    sourceMap: 'dist/themproject.bd.map',
                    sourceMappingURL: 'themproject.bd.map',
                    sourceMapPrefix: 1
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'dist/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/',
                ext: '.min.css'
            }
        },
        copy: {
            minify: {
                expand: true,
                cwd: 'resources/vendor/',
                src: '*{css,js}',
                dest: 'dist/'
            }
        },
        watch: {
            dev: {
                files: ['src/**/*', 'test/**/*', 'resources/**/*.{scss,sass,css}'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            },
            test: {
                files: ['src/**/*', 'test/**/*'],
                tasks: ['default', 'test'],
                options: {
                    spawn: false
                }
            }
        },
        compass: {
            options: {
                sassDir: 'resources/sass',
                cssDir: 'dist',
                relativeAssets: true
            },
            dist: {}
        },
        mocha: {
            options: {
                "reporter": "Spec"
            },
            all: ['test/test.html']
        },
        extractSassVars: {
            all: {
                files: {
                    'src/ui/themevars.js': [
                        'resources/sass/themes/default/_variables.scss',
                        'resources/sass/themes/android_dark/_variables.scss',
                        'resources/sass/themes/android_light/_variables.scss',
                        'resources/sass/themes/ios/_variables.scss'
                    ]
                }
            }
        }
    });

    grunt.registerMultiTask('extractSassVars', 'Convert sass variables to javascript', function () {
        var collection = [];
        var regExp = /\$([^:]+):[\s]+([^;]+);/g;
        var results;

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var sassVars = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                    // Read file source.
                    var regex = new RegExp('^resources/sass/themes/([^/]*)');
                    var themeName = filepath.match(regex)[1];
                    return {
                        theme: themeName,
                        content: grunt.file.read(filepath)
                    };
                });
            _.each(sassVars, function (item) {
                while ((results = regExp.exec(item.content)) != null) {
                    if (!item.vars) {
                        item.vars = {};
                    }
                    item.vars[results[1]] = results[2];
                }
                delete item.content;
            });
            _.each(sassVars, function (item) {
                var group = item.vars;

                for (var key in group) {
                    for (var key2 in group) {
                        group[key2] = group[key2].replace(new RegExp('\\$' + key, 'gi'), group[key]);
                    }
                }
            });
            var vars = {};
            _.each(sassVars, function (item) {
                vars[item.theme] = item.vars
            });
            var output = grunt.file.read(__dirname + '/utils/themevars.txt');
            output = grunt.template.process(output, {data: {vars: JSON.stringify(vars, null, 4)}});

            // Write the destination file.
            grunt.file.write(f.dest, output);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('test', ['jshint', 'mocha']);
    grunt.registerTask('dev', ['default', 'watch:dev']);
    grunt.registerTask('release', ['default', 'preprocess:bd', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['jshint', 'compass', 'extractSassVars', 'preprocess:core', 'copy']);
};
