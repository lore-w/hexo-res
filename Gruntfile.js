module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'),
		//grunt-contrib-htmlmin
		htmlmin: {
			dist: {
			      options: {
			        removeComments: true,
			        collapseWhitespace: true,
			        minifyJS: true,
			        minifyCSS: true
			      },
		      	files: [{
					expand: true,
					cwd: 'public',
					src: '**/*.html',
					dest: 'public'
				}]
		    }
		},
		//grunt-contrib-cssmin
		cssmin: {
			target: {
			     files: [{
				      expand: true,
				      cwd: 'public',
				      src: ['**/*.css','!*.min.css'],
				      dest: 'public',
				      ext: '.css'
			     }]
			}
		},
		//grunt-contrib-uglify
		uglify: {
		     target: {
			      files: [{
			         expand: true,
			          cwd: 'public',
			          src: ['**/*.js','!*.min.js'],
			          dest: 'public'
			     }]
		    }
	  	},
	  	//grunt-contrib-copy
	  	copy: {
	  		main: {
  				src: ['README.md','CNAME'],
  				dest: 'public/'
	  		}
	  	}
	});
	//grunt.registerTask('default',['htmlmin','cssmin','uglify','copy']);
	grunt.registerTask('default',['copy']);
};