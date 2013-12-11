'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    stylus: {
      files: {
        expand: true,
        cwd: "./stylus",
        src: ["**/*.styl", "!partials", "!vendor"],
        dest: './',
        ext: '.css'
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: './'
        }
      }
    },
    notify: {
      stylus: {
        options: {
          message: 'assets compiled'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
      stylus: {
        files: '<%= stylus.files.cwd %>/**/*.styl',
        tasks: ['compile']
      }
    }
  });

  // These plugins provide necessary tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('compile', ['stylus', 'notify']);
  grunt.registerTask('default', ['compile', 'connect', 'watch']);

};
