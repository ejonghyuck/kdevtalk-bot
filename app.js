const util = require('util');
const RtmClient = require('@slack/client').RtmClient;

const config = require('./config.json');
const token = config['slack-api-token'];

const router = require('./router');
for (var i = 0; i < config['route-list'].length; i++) {
    require(config['route-list'][i])(router);
}

const rtm = new RtmClient(token, {logLevel: 'error'});
rtm.start();

const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    if (message.subtype === "channel_join") {
        router.onChannelJoin(rtm, message);
    }
    else if (util.isNullOrUndefined(message.subtype)) {
        router.onMessage(rtm, message);
    }
});
