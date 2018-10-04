'use strict';

module.exports = function(grunt) {

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
          sitePath: 'https://streamy.live',
          urls: [
            "/events-detail/party-for-humanity-2-c69bc143-6c98-4118-9157-8a000181de72",
            "/events-detail/vietnam-digital-economy-forum-2018-vdef-2018",
            "/events-detail/ceo-4-0-surf-or-sink",
            "/events-detail/valkyrie-by-arcan-asian-rave-connection-538a3a54-b900-4865-9acf-63baa41b6c6a",
            "/events-detail/street-icon-ce984f1f-370c-4529-b1cd-c7f9348a8431",
            "/events-detail/ytu-soldiers-2-show-0327e6d4-2fb4-4db0-afb0-3eab2f2a38d6",
            "/events-detail/chocolate-tasting-101-57ad9aaa-f5ef-4a12-9b7d-5b6d1b297647",
            "/events-detail/bachata-is-taking-over",
            "/events-detail/zero-to-hero-season-2-break-the-limit-68595ec5-2842-49bc-8fde-0201b8a20b03",
            "/events-detail/green-live-4-love-concert-9868a66b-4847-4b9e-8676-3faf28021140"
          ],
          dest: 'snapshots/',
          hashed: false,
          puppeteerScript: 'basic'
          // selector: 'head'
          // hashPrefix: '!'
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
