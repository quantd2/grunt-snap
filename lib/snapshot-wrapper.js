var path = require( 'path' );
var spawn = require( 'child_process' ).spawn;
var nodeCmd = "node";
var puppeteerScript = path.resolve( path.join( __dirname, 'puppeteer/basic.js' ) );

exports.takeShot = function( url, output, options, cb ){
  var proc;

  if (options && options.puppeteerScript) {
    if (options.puppeteerScript === 'basic') {}
    else if (options.puppeteerScript === 'selector') {
      puppeteerScript = path.resolve( path.join( __dirname, 'puppeteer/selector.js' ) );
    } else {
      puppeteerScript = path.resolve(options.puppeteerScript);
    }
  }

  proc = spawn( nodeCmd, [
    puppeteerScript,
    url,
    output,
    options.timeout,
    options.selector,
    options.interval
  ], { cwd: process.cwd(), detached: true });

  proc.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  proc.stderr.on('data', function(data) {
    console.error(data.toString());
  });

  proc.on('error', function(err) {
    console.error(err);
    return cb(err);
  });

  proc.on('exit', function(code) {
    return cb(null, code);
  });
};
