# curli

Simple HTTP HEAD requests in node.js, just like you would with `curl -I`.

[![build status](https://secure.travis-ci.org/joshgillies/node-curli.svg)](http://travis-ci.org/joshgillies/node-curli)

# Example

```js
var curli = require('curli');

curli('http://www.google.com', function(err, headers) {
  if (err) return console.error(err);
  console.log(headers);
});
```

# Install

`npm install curli`

# License

MIT
