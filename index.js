var url = require('url');
var path = require('path');
var http = require('http');
var https = require('https');

function buildUAString() {
  var conf = require(path.join(__dirname, 'package.json'));
  return conf.name + ' / ' + conf.version;
}

function curlI(opts, callback) {
  var options = typeof opts === 'string' ? url.parse(opts) : opts;
  var request;

  if (!options.protocol)
    return callback(new Error('protocol not specified'));

  options.method = 'HEAD';

  request = options.protocol === 'https:' ? https.request : http.request;

  if (!options.headers)
    options.headers = {};

  for (var key in options.headers) {
    if (/user-agent/i.test(key)) {
      options.headers['user-agent'] = options.headers[key];
      delete options.headers[key];
    }
  }

  if (!options.headers['user-agent'])
    options.headers['user-agent'] = buildUAString();

  request(options, function response(res) {
    res.on('end', function() {
      return callback(null, res.headers);
    });
    res.resume();
  }).on('error', function error(err) {
    return callback(err);
  }).end();
}

module.exports = curlI;

