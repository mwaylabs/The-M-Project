/**
 * The-M-Project Build Script
 * Version: 0.0.1
 */

module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:   '/*!\n' +
                        '* Project:   The M-Project - Mobile HTML5 Application Framework\n' +
                        '* Version:   <%= pkg.version %>\n' +
                        '* Copyright: (c) <%= grunt.template.today("yyyy") %> M-Way Solutions GmbH. All rights reserved.\n' +
                        '* Date:      <%= grunt.template.today() %>\n' +
                        '* License:   Dual licensed under the MIT or GPL Version 2 licenses.\n' +
                        '*            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE\n' +
                        '*            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE\n' +
                        '*/\n'
        },
        jsonlint: {
            sample: {
                src: [ 'package.json' ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['src/_*.js', 'src/themproject*.js']
            },
            src: [ 'src/**/*.js' ]
        },
        preprocess: {
            options: {
                context: {
                    DEBUG: false
                }
            },
            dev: {
                files: {
                    'dist/themproject.js': 'src/themproject.js'
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
            dev: {
                files: ['src/**/*','test/**/*','resources/sass/{,*/}*.{scss,sass}'],
                tasks: ['preprocess:dev', 'compass'],
                options: {
                    spawn: false
                }
            },
            test: {
                files: ['src/**/*','test/**/*'],
                tasks: ['preprocess:dev', 'test'],
                options: {
                    spawn: false
                }
            }
        },
        compass: {
            options: {
                sassDir: 'resources/sass',
                cssDir: 'dist'
            },
            dist: {}
        },
        mocha: {
            options: {
                "reporter": "Spec"
            },
            all: ['test/test.html']
        }
    });

    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-mocha');

    // TODO run jshint task
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('dev', ['preprocess:dev','compass','watch:dev']);
    grunt.registerTask('default', ['preprocess:dist', 'compass:dist', 'uglify', 'cssmin']);
};
