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
    'src/ui/layouts/layout.js',
    'src/ui/layout_manager.js'
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
            build: {
                src: files,
                dest: 'build/the-m-project.js'
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
        }
    });


    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jsonlint', 'concat', 'copy']);
};
