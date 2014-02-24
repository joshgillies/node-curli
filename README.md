# curli

Simple HTTP HEAD requests in node.js, just like you would with `curl -I`.

# Example

```js
var curli = require('curli');

curli('http://www.google.com', callback(headers, err) {
  if (err) console.error(err);
  console.log(headers);
};
```

# Install

`npm install curli`
