module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //grunt-contrib-copy
        copy: {
            main: {
                src: ['README.md', 'CNAME', 'favicon.ico', 'atom.xml', 'lib/*'],
                dest: 'public/'
            }
        }
    });
    grunt.registerTask('default', ['copy']);
};