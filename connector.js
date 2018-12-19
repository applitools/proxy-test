const {ServerConnector, Logger, ConsoleLogHandler} = require('@applitools/eyes-sdk-core');
const url = require('url');

const serverUrl = process.argv[2];
const apiKey = process.argv[3];
const proxy = process.argv[4];

let proxyToUse = (proxy && proxy !== 'false') ? proxy : false;

console.log('serverUrl:', serverUrl);
console.log('apiKey:', apiKey);
console.log('proxy:', proxyToUse === false ? 'no proxy' : proxy);

const logger = new Logger();
logger.setLogHandler(new ConsoleLogHandler(true));
const serverConnector = new ServerConnector(logger, serverUrl);
serverConnector.setApiKey(apiKey);
serverConnector.setProxy(proxyToUse);

(async function() {
  try {
    const res = await serverConnector.renderInfo();
    console.log('res', res);
  } catch(err) {
    console.log('err', err);
  }
})();

// node connector.js https://nabeyes.applitools.com 6SvxZ7ek105ayDxK53qSKE9B68TG66yQrWYlTyqSFdujg110 http://proxy1.nab.com.au:10091
// node connector.js https://eyesapi.applitools.com lScDOEqp3FfyO9wjESeSdLlIzeN109PBHYNSGZICfEUPU110 http://localhost:8888