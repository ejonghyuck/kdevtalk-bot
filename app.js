'use strict';

const util = require('util');
const RtmClient = require('@slack/client').RtmClient;
const fs = require('fs');
const path = require('path');

const config = require('./config.json');
const token = config['slack-api-token'];

const router = require('./router');
fs.readdir('./routes/', (err, files) => {
    for (var i = 0; i < files.length; i++) {
        var f = '.' + path.join('/routes/', files[i]).replace(/\\/g, '/'); // to support window os
        require(f)(router);
    }
});

const rtm = new RtmClient(token, {logLevel: 'error'});
rtm.start();

const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    if (message.subtype === "channel_join") {
        router.onChannelJoin(rtm, message);
    }
    else if (util.isNullOrUndefined(message.subtype)) {
        router.onMessage(rtm, message);
    }
});
