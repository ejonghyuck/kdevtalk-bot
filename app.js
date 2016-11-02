var RtmClient = require('@slack/client').RtmClient;
var WebClient = require('@slack/client').WebClient;
var token = 'xoxb-99411929717-RjCiSPhsoYtNjbhYGQsoXzJc';

var web = new WebClient(token);
var rtm = new RtmClient(token, {logLevel: 'error'});
rtm.start();

var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    var channel = message.channel;
    var user = message.user;
    var text = message.text;
    if (text.includes('소라고동님'))
        rtm.sendMessage('안 돼.', channel);
});
