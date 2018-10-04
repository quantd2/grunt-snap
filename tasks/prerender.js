'use strict';

module.exports = function(grunt) {

  var fs          = require('fs'),
      path        = require('path'),
      async       = require('async'),
      snapshot    = require('../lib/snapshot-wrapper');

  var asset = path.join.bind(null, __dirname, '..');

  grunt.registerMultiTask('prerender', 'Generate HTML snapshots', function() {
    var options = this.options({
      dest: '',
      sitemap: '',
      urls: [],
      sitePath: '',
      hashed: true,
      hashPrefix: '',
      timeout: 7000,
      limit: 5,
      haltOnError: false,
      puppeteerScript: '',
      selector: '',
      interval: 300
    });

    var done = this.async();

    var sitePath = options.sitePath;

    grunt.log.writeln('Prerendering ...');

    var snapshotOptions = {
      puppeteerScript: options.puppeteerScript,
      timeout: options.timeout,
      selector: options.selector,
      interval: options.interval
    };

    if (options.sitemap) {
      var urlObj = require('url').parse(options.sitemap);
      sitePath = urlObj.protocol + '//' + urlObj.host;

      require('sitemapper').getSites(options.sitemap, function(err, urls) {
        if (err) {
          var urls = options.urls;
        }
        urls = urls.map(function(url) {
          return require('url').parse(url).pathname;
        });
        crawlUrls(urls);
      });
    } else {
      // strip site path of trailing slash
      if (sitePath[sitePath.length-1] === '/') sitePath = sitePath.slice(0, -1);

      var urls = options.urls;
      crawlUrls(urls);
    }

    function processUrl(sitePath, url) {
      if (options.hashed) {
        if (url === '' || url === '/') return sitePath + url;
        return sitePath + '/#' + options.hashPrefix + url;
      } else {
        return sitePath + url;
      }
    }

    function crawlUrls(urls) {
      async.eachLimit(urls, options.limit, function(url, callback) {
        crawlUrl(url, callback);
      }, function(err) {
        if (err) {
          grunt.log.warn('Halted with error', err);
          done(false);
        } else {
          done();
        }
      });
    };

    function crawlUrl(url, callback) {
      var plainUrl = url.replace(sitePath, '');
      if (plainUrl.indexOf('/') === 0) plainUrl = plainUrl.substr(1);
      var fileName = 'index.html';
      var lastPath = plainUrl.split('/').pop();
      if (lastPath.indexOf('.') > -1) {
        fileName = options.dest + plainUrl;
      } else {
        if (plainUrl === '') {
          fileName = options.dest + 'index.html';
        } else if (plainUrl[plainUrl.length-1] === '/') {
          fileName = options.dest + plainUrl + 'index.html';
        } else {
          fileName = options.dest + plainUrl + '/index.html';
        }
      }
      grunt.log.writeln('Generating', processUrl(sitePath, url), 'at', fileName);

      snapshot.takeShot(processUrl(sitePath, url), fileName, snapshotOptions, function(err) {
        if (err) {
          grunt.log.warn('Failed to snapshot', processUrl(sitePath, url));
          if (options.haltOnError) {
            return callback(err);
          }
        }
        callback();
      });
    }
  });

};
