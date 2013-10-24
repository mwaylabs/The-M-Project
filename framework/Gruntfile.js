/**
 * TMP2 Build Script
 * Version: 0.0.1
 */

module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:   '// ==========================================================================\n' +
                        '// Project:   The M-Project - Mobile HTML5 Application Framework\n' +
                        '// Version:   <%= pkg.version %>\n' +
                        '// Copyright: (c) <%= grunt.template.today("yyyy") %> M-Way Solutions GmbH. All rights reserved.\n' +
                        '// Date:      <%= grunt.template.today() %>\n' +
                        '// License:   Dual licensed under the MIT or GPL Version 2 licenses.\n' +
                        '//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE\n' +
                        '//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE\n' +
                        '// ==========================================================================\n',
            bannerCSS: '/*\n<%= meta.banner %>*/'
        },
        jsonlint: {
            sample: {
                src: [ 'package.json' ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            framework: [ 'src/**/*.js' ]
        },
        preprocess: {
            options: {
                context: {
                    DEBUG: false
                }
            },
            core: {
                files: {
                    'dist/tmp2.js': 'src/build.js',
                    'dist/tmp2.data.js': 'src/build.data.js',
                }
            },
            css: {
                files: {
                    'dist/tmp2.css': 'src/build.css'
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            core: {
                src: 'dist/tmp2.js',
                dest: 'dist/tmp2.min.js',
                options: {
                    sourceMap: 'dist/tmp2.map',
                    sourceMappingURL: 'tmp2.map',
                    sourceMapPrefix: 1
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '<%= meta.bannerCSS %>'
                },
                files: {
                    'dist/tmp2.min.css': ['dist/tmp2.css']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            }
        },
        mocha: {
            all: ['test/test.html']
        }
    });

    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-mocha');

    // TODO run jshint task
    //grunt.registerTask('test', ['jshint', 'mocha']);
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('default', ['preprocess']);
    grunt.registerTask('release', ['preprocess', 'uglify', 'cssmin']);
};