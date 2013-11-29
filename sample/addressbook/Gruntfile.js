'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var cfg = require('./grunt.config.js');

    // configurable paths
    var yeomanConfig = {
        app: cfg.paths.app,
        dist: cfg.paths.dist
    };

    // TODO: Implement validation handling
    var defaultOption = function( name, defaultValue ) {
        var value = grunt.option(name);
        if( value === void 0 ) {
            value = defaultValue;
        }
        return value;
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        bwr: grunt.file.readJSON('bower.json'),
        watch: {
            options: {
                nospawn: true
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/scripts/templates/*.ejs',
                    '<%= yeoman.app %>/i18n/*.json',
                    'test/spec/**/*.js'
                ]
            },
            tmpl: {
                files: [
                    '<%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['tmpl']
            },
            test: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
                tasks: ['test']
            }
        },
        connect: {
            options: {
                port: defaultOption('port', cfg.server.port),
                hostname: '0.0.0.0'
            },
            proxies: cfg.server.proxies || [],
            livereload: {
                options: {
                    middleware: function (connect) {
                        var middleware = [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                        if(cfg.server.proxies) {
                            middleware.unshift(proxySnippet);
                        }
                        return middleware;
                    }
                }
            },
            manualreload: {
                options: {
                    middleware: function (connect) {
                        var middleware = [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                        if(cfg.server.proxies) {
                            middleware.unshift(proxySnippet);
                        }
                        return middleware;
                    },
                    keepalive: true
                }
            },
            test: {
                options: {
                    port: cfg.test.port,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '/bower_components/font-awesome/',
                    dest: '',
                    src: [
                        'fonts/{,*/}*.*'
                    ]
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.html',
                        'icons/*.png',
                        'images/{,*/}*.{webp,gif}',
                        'fonts/{,*/}*.*',
                        'i18n/*.json'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        tmpl: {
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        // TODO support rev for i18n and images
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        manifest: {
            generate: {
                options: {
                    preferOnline: true,
                    timestamp: true,
                    master: ['<%= yeoman.dist %>/index.html']
                },
                src: [
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/i18n/*.json'
                ],
                dest: '<%= yeoman.dist %>/manifest.appcache'
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'tmpl',
                'connect:test',
                'watch:livereload'
            ]);
        }

        var reloadType = 'manualreload';
        if( defaultOption('autoReload', cfg.server.autoReload) ) {
            reloadType = 'livereload';
        }

        var tasks = [
            'clean:server',
            'createDefaultTemplate',
            'tmpl',
            'configureProxies',
            'connect:' + reloadType
        ];

        if(reloadType === 'livereload') {
            tasks.push('watch:livereload');
        }

        if( defaultOption('openBrowser', cfg.server.openBrowser) ) {
            tasks.splice(tasks.length - 1, 0, 'open');
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask('amendIndexFile', '', function() {

        // Open file
        var path = grunt.template.process('<%= yeoman.dist %>/index.html');
        var content = grunt.file.read(path);

        // Construct banner
        var banner = '<!--\n'+
        'Version: <%= pkg.version %>\n'+
        'Date: <%= grunt.template.today() %>\n'+
        'Build with The M Project <%= bwr.dependencies.themproject %>\n'+
        '-->\n';
        content = grunt.template.process(banner) + content;

        // Add manifest attribute
        var regex = new RegExp('(<html+(?![^>]*\bmanifest\b))', 'g');
        content = content.replace(regex, '$1 manifest="cache.manifest"');

        // Save file
        grunt.file.write(path, content);
    });

    grunt.registerTask('test', [
        'clean:server',
        'createDefaultTemplate',
        'tmpl',
        'connect:test',
        'mocha',
        'watch:test'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'tmpl',
        'useminPrepare',
        'imagemin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin',
        'htmlmin',
        'manifest',
        'amendIndexFile'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
