const request = require('request');
const url = require('url');
const endpoint = process.argv[2];
const proxy = process.argv[3];

let proxyToUse;
if (proxy && (proxy !== 'false')) {
  const {hostname, port, protocol} = url.parse(proxy);
  proxyToUse = {
    host: hostname,
    port,
    protocol
  };
} else {
  proxyToUse = false;
}

console.log('uri:', endpoint);
console.log('proxy:', proxyToUse === false ? 'no proxy' : proxy);

const resp = request({
  proxy: proxyToUse,
  method: 'GET',
  uri: endpoint,
  strictSSL: false
}, (err, resp, body) => {
  if (err) {
    console.log('err', err.message);
  } else {
    console.log(resp.statusCode, resp.body);
    console.log('\nSuccess!\n');
  }
})
