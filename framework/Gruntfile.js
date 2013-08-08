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
    'src/ui/pagetransitions.js',
    'src/ui/layouts/layout.js',
    'src/ui/layout_manager.js'
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
        jsonlint: {
            sample: {
                src: [ 'package.json' ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            framework: {
                src: files,
                dest: 'build/themproject.js'
            },
            css: {
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