'use strict';

module.exports = function( grunt ) {

    grunt.registerTask('rewriteMarkdownFiles', function() {
        var content = grunt.file.read('README.md');
        var overviewText = content.slice(content.indexOf('## Overview'), content.indexOf("## What's new"));
        content = content.replace('![The-M-Project Absinthe][logo]', '');
        content = content.replace(overviewText, '');
        grunt.file.write('doc-template/.tmp/index.md', content);
    });
}