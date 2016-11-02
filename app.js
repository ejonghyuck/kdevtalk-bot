const RtmClient = require('@slack/client').RtmClient;
const WebClient = require('@slack/client').WebClient;
const token = 'xoxb-99411929717-4h4p7SYFj66w35MqaPUOk50t';

const router = require('./router');
require('./routes/soragodong')(router);
require('./routes/han-river')(router);

const web = new WebClient(token);
const rtm = new RtmClient(token, {logLevel: 'error'});
rtm.start();

const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    router.onMessage(rtm, message);
});
