module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //grunt-contrib-copy
        copy: {
            main: {
                src: ['README.md', 'CNAME'],
                dest: 'public/'
            }
        }
    });
    grunt.registerTask('default', ['copy']);
};