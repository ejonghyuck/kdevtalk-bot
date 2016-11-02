const RtmClient = require('@slack/client').RtmClient;
const token = process.env.BOT_TOKEN || '';

const router = require('./router');
require('./routes/soragodong')(router);
require('./routes/han-river')(router);

const rtm = new RtmClient(token, {logLevel: 'error'});
rtm.start();

const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    router.onMessage(rtm, message);
});
