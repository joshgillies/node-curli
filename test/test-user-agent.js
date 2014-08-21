var test = require('tape');
var url = require('url');
var path = require('path');
var curli = require(path.join(__dirname, '..'));
var testServer = require(path.join(__dirname, 'server.js'));

test('Default user agent being set', function(t) {
  var server = testServer.createServer();

  var conf = require(path.join(__dirname, '../package.json'));
  var ua = conf.name + ' / ' + conf.version;

  server.listen(0, function() {
    var port = server.address().port;
    var host = '//localhost:' + port;
    var href = 'http:' + host + '/';

    server.on('/', function(req, res) {
      t.equal(req.headers['user-agent'], ua, 'Default user agent set to "' + ua + '"');
      res.writeHead(200);
      res.end();
    });

    curli(href, function(err, headers) {
      t.ok(headers, 'Headers sent');
      t.error(err, 'Shouldn\'t error');
      server.close();
      t.end();
    });
  });
});

test('Custom user agent', function(t) {
  var server = testServer.createServer();

  server.listen(0, function() {
    var port = server.address().port;
    var host = '//localhost:' + port;
    var href = 'http:' + host + '/';
    var options = url.parse(href);
    options.headers = {
      'User-Agent':  'Node'
    };
    var ua = options.headers['User-Agent'];

    server.on('/', function(req, res) {
      t.equal(req.headers['user-agent'], ua, 'Custom user agent set to "' + ua + '"');
      res.writeHead(200);
      res.end();
    });

    curli(options, function(err, headers) {
      t.ok(headers, 'Headers sent');
      t.error(err, 'Shouldn\'t error');
      server.close();
      t.end();
    });
  });
});

test('Custom user agent, funky header', function(t) {
  var server = testServer.createServer();

  server.listen(0, function() {
    var port = server.address().port;
    var host = '//localhost:' + port;
    var href = 'http:' + host + '/';
    var options = url.parse(href);
    options.headers = {
      'UsER-AgeNt':  'kNode'
    };
    var ua = options.headers['UsER-AgeNt'];

    server.on('/', function(req, res) {
      t.equal(req.headers['user-agent'], ua, 'Custom user agent set to "' + ua + '"');
      res.writeHead(200);
      res.end();
    });

    curli(options, function(err, headers) {
      t.ok(headers, 'Headers sent');
      t.error(err, 'Shouldn\'t error');
      server.close();
      t.end();
    });
  });
});
