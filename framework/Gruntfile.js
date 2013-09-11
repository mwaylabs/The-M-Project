/**
 * Build Script
 * Version: 1.0
 */

var files = [

    'src/core/m.js',
    'src/core/const.js',
    'src/core/object.js',
    'src/core/logger.js',
    'src/core/i18n.js',
    'src/core/date.js',
    'src/core/view_manager.js',
    'src/core/application.js',

    'src/utility/data.js',
    'src/utility/i18n.js',
    'src/utility/objectid.js',
    'src/utility/uuid.js',

    'src/connection/request.js',
    'src/connection/request_manager.js',
    'src/connection/socket_io.js',
    'src/data/field.js',
    'src/data/entity.js',
    'src/data/model.js',
    'src/data/collection.js',
    'src/data/data_selector.js',
    'src/data/sql_selector.js',
    'src/data/stores/store.js',
    'src/data/stores/local_storage.js',
    'src/data/stores/socket.js',
    'src/data/stores/web_sql.js',

    'src/ui/views/view.js',
    'src/ui/views/button.js',
    'src/ui/pagetransitions.js',
    'src/ui/layouts/layout.js',
    'src/ui/layout_manager.js',

    'src/ui/layouts/header-layout/header-layout.js',
    'src/ui/layouts/bottom-bar-layout/bottom-bar-layout.js',
    'src/ui/layouts/switch-layout/switch-layout.js',
    'src/ui/layouts/swipe-layout/swipe-layout.js'

];

var cssFiles = [
    'src/ui/css/reset.css',
    'src/ui/layouts/switch-layout/switch-animations.css',
    'src/ui/layouts/switch-layout/switch-layout.css',
    'src/ui/layouts/swipe-layout/swipe-layout.css',
    'src/ui/layouts/header-layout/header-layout.css',
    'src/ui/layouts/bottom-bar-layout/bottom-bar-layout.css'
];

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
        concat: {
            framework: {
                options: {
                    banner: "<%= meta.banner %>",
                    process: function( src, filepath ) {
                        return '// Source: ' + filepath + '\n' + src;
                    }
                },
                src: files,
                dest: 'build/themproject.js'
            },
            css: {
                options: {
                    banner: "<%= meta.bannerCSS %>",
                    process: function( src, filepath ) {
                        return '/* Source: ' + filepath + '*/\n' + src;
                    }
                },
                src: cssFiles,
                dest: 'build/themproject.css'
            }
        },
        copy: {
            build: {
                files: [
                    {
                        cwd: 'libs',
                        expand: true,
                        src: ['**/*'],
                        dest: 'build/'
                    }
                ]
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
        }
    });

    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jsonlint', 'concat', 'copy']);
};