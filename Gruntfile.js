/**
 * The-M-Project Build Script
 * Version: 0.1.0
 */

var _ = require('lodash');

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*!\n' + '* Project:   The M-Project - Mobile HTML5 Application Framework\n' + '* Version:   <%= pkg.version %>\n' + '* Copyright: (c) <%= grunt.template.today("yyyy") %> M-Way Solutions GmbH. All rights reserved.\n' + '* Date:      <%= grunt.template.today() %>\n' + '* License:   Dual licensed under the MIT or GPL Version 2 licenses.\n' + '*            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE\n' + '*            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE\n' + '*/'
        },
        jsonlint: {
            sample: {
                src: [ 'package.json', 'bower.json' ]
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
                    BANNER: '<%= meta.banner %>',
                    VERSION: '<%= pkg.version %>'
                }
            },
            dev: {
                files: {
                    '.tmp/themproject.js': 'src/themproject.js'
                }
            },
            dist: {
                files: {
                    'dist/themproject.js': 'src/themproject.js',
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
        watch: {
            js: {
                files: ['src/**/*'],
                tasks: ['build-js'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['resources/**/*.{scss,sass,css}'],
                tasks: ['build-css'],
                options: {
                    spawn: false
                }
            },
            test: {
                files: ['test/**/*'],
                tasks: ['test'],
                options: {
                    spawn: false
                }
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'resources/sass',
                    specify: [
                        'resources/sass/themproject.scss',
                        'resources/sass/themproject_android_dark.scss',
                        'resources/sass/themproject_android_light.scss',
                        'resources/sass/themproject_ios.scss'
                    ],
                    cssDir: '.tmp',
                    relativeAssets: true,
                    importPath: ['bower_components']
                }
            },
            dist: {
                options: {
                    sassDir: 'resources/sass',
                    specify: [
                        'resources/sass/themproject.scss',
                        'resources/sass/themproject_android_dark.scss',
                        'resources/sass/themproject_android_light.scss',
                        'resources/sass/themproject_ios.scss'
                    ],
                    cssDir: 'dist',
                    banner: '<%= meta.banner %>',
                    relativeAssets: true,
                    importPath: ['bower_components']
                }
            }
        },
        mocha: {
            options: {
                bail: true,
                reporter: "Spec"
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
        },

        jsdoc : {
            dist : {
                src: ['README.md','src/connection/*.js','src/core/*.js','src/data/*.js','src/data/stores/*.js','src/interfaces/*.js','src/ui/*.js','src/ui/layouts/*.js','src/ui/views/*.js','src/utility/*.js'],
                options:{
                    destination: 'doc',
                    template: "doc-template",
                    configure: "doc-template/jsdoc.conf.json",
                    tutorials: "doc-template/additional"
                }
            }
        },
        'curl-dir': {
            customFilepaths: {
                src: [
                    'https://raw.github.com/mwaylabs/The-M-Project-Sample-Apps/master/README.md',
                    'https://raw.github.com/mwaylabs/generator-tmp2/master/README.md'
                ],
                router: function (url) {
                    return url.replace('https://raw.github.com/mwaylabs/The-M-Project-Sample-Apps/master/README.md', 'Sample-Apps.md').replace('https://raw.github.com/mwaylabs/generator-tmp2/master/README.md', 'TMP2-Generator.md');
                },
                dest: 'doc-template/additional'
            }
        },
        clean: {
            md: {
                src: ["doc-template/additional/Sample-Apps.md", "doc-template/additional/TMP2-Generator.md"]
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

    grunt.registerTask('build-js', ['extractSassVars', 'preprocess:dev']);
    grunt.registerTask('build-css', ['compass:dev']);

    grunt.registerTask('dist-js', ['extractSassVars', 'preprocess:dist']);
    grunt.registerTask('dist-css', ['compass:dist']);

    grunt.registerTask('dev-js', ['default', 'watch:js']);
    grunt.registerTask('dev-css', ['default', 'watch:css']);

    grunt.registerTask('dev', ['default', 'watch']);
    grunt.registerTask('test', ['jshint', 'mocha']);
    grunt.registerTask('dist', ['jshint', 'dist-js', 'dist-css', 'uglify', 'cssmin']);
    grunt.registerTask('precommit', ['travis']);
    grunt.registerTask('travis', ['jsonlint', 'default', 'test']);
    grunt.registerTask('default', ['build-js', 'build-css']);

    grunt.registerTask('build-doc', ['clean:md','curl-dir', 'jsdoc']);
};
