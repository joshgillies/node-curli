var url = require('url');
var fs = require('fs');

module.exports = curlI;

function buildUAString() {
  var conf = fs.readFileSync(__dirname + '/package.json', { encoding: 'utf-8' });
  conf = JSON.parse(conf);
  return conf.name + ' / ' + conf.version;
}

function curlI(uri, callback) {
  uri = url.parse(uri);
  if (!uri.protocol) return callback(null, new Error('protocol not specified'));
  var request = uri.protocol === 'http:' ? require('http').request : require('https').request;
  var options = {
    method: 'HEAD',
    host: uri.host,
    path: uri.path,
    headers: {
      'User-Agent': buildUAString()
    }
  };

  request(options, function(res) {
    return callback(res.headers, null);
  }).on('error', function(err) {
    return callback(null, err);
  }).end();
}

