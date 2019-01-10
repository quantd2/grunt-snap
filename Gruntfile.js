'use strict';

module.exports = function(grunt) {
  let url = grunt.option('url');
  let env = grunt.option('env');
  let siteUrl = 'https://streamy.live'
  if (env === "staging") {
    siteUrl = 'https://stg.streamy.live'
  }
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    prerender: {
      test: {
        options: {
          sitePath: siteUrl,
          urls: [url],
          dest: 'snapshots/',
          hashed: false,
          puppeteerScript: 'basic'
        }
      }
    },
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['snapshots/']
    },

    // Configuration to be run (and then tested).
    // prerender: {
    //   default_options: {
    //     options: {
    //     },
    //     files: {
    //       'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
    //     }
    //   },
    //   custom_options: {
    //     options: {
    //       separator: ': ',
    //       punctuation: ' !!!'
    //     },
    //     files: {
    //       'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
    //     }
    //   },
    //   test: {
    //     options: {
    //       hashPrefix: '!',
    //       sitemap: 'http://www.jobbies.co/sitemap.xml',
    //       dest: 'snapshots/',
    //       puppeteerScript: 'selector',
    //       selector: '#content',
    //       // puppeteerScript: 'lib/snapshot.js'
    //       // sitePath: 'http://www.jobbies.co',
    //       // urls: ['/']
    //     }
    //   }
    // },


  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // plugin's task(s), clean and snapshot.
  grunt.registerTask('build', ['clean', 'prerender']);


};
