var path = require('path');
var url = require('url');

module.exports = curlI;

function buildUAString() {
  var conf = require(path.join(__dirname, 'package.json'));
  return conf.name + ' / ' + conf.version;
}

function curlI(opts, callback) {
  var options = typeof opts === 'string' ? url.parse(opts) : opts;
  if (!options.protocol) return callback(new Error('protocol not specified'));
  var protocol = options.protocol === 'http:' ? require('http') : require('https');
  options.method = 'HEAD';
  options.headers = {
    'User-Agent': buildUAString()
  };

  protocol.request(options, function response(res) {
    return callback(null, res.headers);
  }).on('error', function error(err) {
    return callback(err);
  }).end();
}

