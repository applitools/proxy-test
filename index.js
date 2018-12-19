var url = require('url');
var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');


// HTTP endpoint for the proxy to connect to
var endpoint = process.argv[2];
console.log('attempting to GET %j', endpoint);
var opts = url.parse(endpoint);

// HTTP/HTTPS proxy to connect to
var proxy = process.argv[3];
console.log('using proxy server %j', proxy);

// create an instance of the `HttpProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy);
opts.agent = agent;

https.get(opts, function (res) {
  console.log('"response" event!', res.headers);
  res.pipe(process.stdout);
});