const {ServerConnector, Logger, ConsoleLogHandler} = require('eyes.sdk');
const {PromiseFactory} = require('eyes.utils');
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
const serverConnector = new ServerConnector(new PromiseFactory(function (asyncAction) {
  return new Promise(asyncAction);
}, undefined), serverUrl, logger);
serverConnector.setApiKey(apiKey);
serverConnector.setProxy(proxyToUse);

(async function() {
  try {
    const res = await serverConnector.startSession({
      agentId: 'some_agentid',
      appIdOrName: 'some_app',
      scenarioIdOrName: 'some_scenario'
    });
    console.log('res', res);
  } catch(err) {
    console.log('err', err);
  }
})();