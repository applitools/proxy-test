const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

// HTTP endpoint for the proxy to connect to
var endpoint = process.argv[2];
console.log('attempting to GET %j', endpoint);

// HTTP/HTTPS proxy to connect to
var proxy = process.argv[3];
console.log('using proxy server %j', proxy);

const agent = new HttpsProxyAgent(proxy);

(async function() {
  try {
    const res = await fetch(endpoint, {agent})
      .then(resp => resp.json());
    console.log(res);

  } catch(err) {
    console.log('err', err);

    console.log('trying again with text');

    try {
      const res = await fetch(endpoint, {agent})
        .then(resp => resp.text());
      
      console.log(res);
    } catch (err) {
      console.log('err with text', err);
    }

  }
})();


