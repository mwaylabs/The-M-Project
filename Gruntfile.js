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

    var additionalMarkdownFiles = {
        'https://raw.github.com/mwaylabs/The-M-Project-Sample-Apps/master/README.md': 'Sample-Apps.md',
        'https://raw.github.com/mwaylabs/generator-m/master/README.md': 'Generator.md',
        'https://raw.github.com/mwaylabs/The-M-Project-Sample-Apps/master/demoapp/README.md': 'Demo-App.md'
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*!\n' +
                '* Project:   The M-Project - Mobile HTML5 Application Framework\n' +
                '* Copyright: (c) <%= grunt.template.today("yyyy") %> M-Way Solutions GmbH.\n' +
                '* Version:   <%= pkg.version %>\n' +
                '* Date:      <%= grunt.template.today() %>\n' +
                '* License:   http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt\n' +
                '*/'
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
        sass: {
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded',
                    banner: '<%= meta.banner %>',
                    loadPath: ['bower_components']
                },
                files: {
                    'dist/themproject.css':'resources/sass/themproject.scss',
                    'dist/themproject_android_dark.css':'resources/sass/themproject_android_dark.scss',
                    'dist/themproject_android_light.css':'resources/sass/themproject_android_light.scss',
                    'dist/themproject_ios.css':'resources/sass/themproject_ios.scss'
                }
            },
            dev: {                            // Target
                options: {                       // Target options
                    style: 'expanded',
                    loadPath: ['bower_components'],
                    lineNumbers: true
                },
                files: {
                    '.tmp/themproject.css':'resources/sass/themproject.scss',
                    '.tmp/themproject_android_dark.css':'resources/sass/themproject_android_dark.scss',
                    '.tmp/themproject_android_light.css':'resources/sass/themproject_android_light.scss',
                    '.tmp/themproject_ios.css':'resources/sass/themproject_ios.scss'
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
                src: ['doc-template/.tmp/index.md','src/connection/*.js','src/core/*.js','src/data/*.js','src/data/stores/*.js','src/interfaces/*.js','src/ui/*.js','src/ui/layouts/*.js','src/ui/views/*.js','src/utility/*.js'],
                options:{
                    destination: 'doc',
                    template: "doc-template",
                    configure: "doc-template/jsdoc.conf.json",
                    tutorials: "doc-template/additional",
                    private: false
                }
            }
        },
        'curl-dir': {
            customFilepaths: {
                src: (function() {
                    return Object.keys(additionalMarkdownFiles);
                })(),
                router: function (url) {
                    return additionalMarkdownFiles[url];
                },
                dest: 'doc-template/additional'
            }
        },
        clean: {
            md: {
                src: [
                    'doc-template/additional/Sample-Apps.md',
                    'doc-template/additional/Demo-App.md',
                    'doc-template/additional/Generator.md',
                    'doc-template/.tmp/index.md'
                ]
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('build-js', ['extractSassVars', 'compileTemplates', 'preprocess:dev']);
    grunt.registerTask('build-css', ['sass:dev']);

    grunt.registerTask('dist-js', ['extractSassVars', 'compileTemplates', 'preprocess:dist']);
    grunt.registerTask('dist-css', ['sass:dist']);

    grunt.registerTask('dev-js', ['default', 'watch:js']);
    grunt.registerTask('dev-css', ['default', 'watch:css']);

    grunt.registerTask('dev', ['default', 'watch']);
    grunt.registerTask('test', ['jshint', 'mocha']);
    grunt.registerTask('dist', ['jshint', 'dist-js', 'dist-css', 'uglify', 'cssmin']);
    grunt.registerTask('precommit', ['travis']);
    grunt.registerTask('travis', ['jsonlint', 'default', 'test']);
    grunt.registerTask('default', ['build-js', 'build-css']);

    grunt.registerTask('build-doc', ['clean:md','curl-dir', 'rewriteMarkdownFiles', 'jsdoc', 'clean:md']);
};
