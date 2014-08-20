var path = require('path');
var url = require('url');
var http = require('http');
var https = require('https');

module.exports = curlI;

function buildUAString() {
  var conf = require(path.join(__dirname, 'package.json'));
  return conf.name + ' / ' + conf.version;
}

function curlI(opts, callback) {
  var options = typeof opts === 'string' ? url.parse(opts) : opts;
  if (!options.protocol) return callback(new Error('protocol not specified'));
  var protocol = options.protocol === 'https:' ? https : http;
  options.method = 'HEAD';
  if (!options.headers) options.headers = {};

  for (var key in options.headers) {
    if (/user-agent/i.test(key)) {
      options.headers['user-agent'] = options.headers[key];
      delete options.headers[key];
    }
  }

  if (!options.headers['user-agent']) options.headers['user-agent'] = buildUAString();

  var req = protocol.request(options, function response(res) {
    res.on('end', function() {
      return callback(null, res.headers);
    });
    res.resume();
  });
  req.on('error', function error(err) {
    return callback(err);
  });
  req.end();
}
