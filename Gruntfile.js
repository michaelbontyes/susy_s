'use strict';
module.exports = function(grunt) {

  // Load tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      dist: {
         options: {
	        style: 'expanded',
	        compass: false,
	        // check: true,
	        require: [
	        	'susy',
	        	'breakpoint'
	        ],
             banner:
             '/*!\n' +
             'Theme Name:  Port Metro Vancouver\n' +
             'Version:     1.0\n' +
             'Author:      Edelman Digital Montreal\n' +
             'Author URI:  http://digital.edelman.ca\n' +
             'Theme URI:   http://digital.edelman.ca\n' +
             '*/\n'
        },
        files: {
	        'theme/style.css': 'sass/style.scss'
      	}
      }
    },
    watch: {
      sass: {
        files: [
          'sass/**/*.scss',
          'sass/*.scss'
        ],
        tasks: ['sass', 'autoprefixer', 'criticalcss']
      }
    },
    criticalcss: {
        custom: {
            options: {
                url: "http://pmv-local.edlfb.net/",
                width: 1200,
                height: 900,
                outputfile: "theme/critical.css",
                filename: "theme/style.css", // Using path.resolve( path.join( ... ) ) is a good idea here
                buffer: 800*1024,
                ignoreConsole: false
            }
        }
    },
    browserSync: {

        bsFiles: {
            src : 'theme/style.css'
        },
        options: {
          proxy: "http://pmv-local.edlfb.net/",
          watchTask: true
        }

    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: {
            'theme/style.css': 'theme/style.css'
        }
      }
    }/*,
    uncss: {
      dist: {
        options: {
          stylesheets  : ['wp-content/themes/edelv2/style.css'],
          ignoreSheets : [/fonts.googleapis/],
          csspath      : 'wp-content/themes/edelv2/',
          urls : ['http://grunt']
        },
        files: {
          'http://grunt/wp-content/themes/edelv2/dist/style.css': ['http://grunt']
        }
      }
    }*/
  });

  // Register tasks
  grunt.registerTask('default',['watch']);
  //use grunt dev during development for browserSync and Watch - HJK
  grunt.registerTask('dev', ['browserSync', 'watch']);
  grunt.registerTask('style', ['sass','autoprefixer']);
};
