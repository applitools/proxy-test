'use strict';
const axios = require('axios');
const url = require('url');
const endpoint = process.argv[2];
const apiKey = process.argv[3];
const proxy = process.argv[4];

let proxyToUse, httpsAgent, transport;
if (proxy && (proxy !== 'false')) {
  const {hostname, port, protocol} = url.parse(proxy);
  proxyToUse = {
    host: hostname,
    port,
    protocol
  };
  httpsAgent = new require('http').Agent({  
    rejectUnauthorized: false
  });
  transport = require('http');
} else {
  proxyToUse = false;
  httpsAgent = new require('https').Agent({  
    rejectUnauthorized: false
  });
}

console.log('url:', endpoint);
console.log('apiKey:', apiKey);
console.log('proxy:', proxyToUse === false ? 'no proxy' : proxy);

(async function() {
  try {
    const resp = await axios({
      proxy: proxyToUse,
      method: 'GET',
      url: endpoint,
      params: {apiKey},
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      httpsAgent,
      transport // patch
    });
  
    console.log(resp.data);
    console.log('\nSuccess!\n');
  } catch(err) {
    console.log('err', err.message);
  }
})();
