var url = require('url');

module.exports = curlI;

function buildUAString() {
  var conf = require(__dirname + '/package.json');
  return conf.name + ' / ' + conf.version;
}

function curlI(uri, callback) {
  uri = url.parse(uri);
  if (!uri.protocol) return callback(null, new Error('protocol not specified'));
  var protocol = uri.protocol === 'http:' ? require('http') : require('https');
  var options = {
    method: 'HEAD',
    host: uri.host,
    path: uri.path,
    headers: {
      'User-Agent': buildUAString()
    }
  };

  protocol.request(options, function(res) {
    return callback(null, res.headers);
  }).on('error', function(err) {
    return callback(err);
  }).end();
}

