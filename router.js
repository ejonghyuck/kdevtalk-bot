'use strict';

const hearList = new Array();
const enterList = new Array();

module.exports.hear = (reg, callback) => {
    hearList.push({
        reg: reg,
        callback: callback
    });
};

module.exports.enter = (callback) => {
    enterList.push(callback);
}

module.exports.onMessage = (rtm, message) => {
    let text = message.text;
    for (let hear of hearList) {
        if (hear.reg.test(text)) {
            let match = text.match(hear.reg);
            let result = {
                match: match,
                send: (msg) => {
                    rtm.sendMessage(msg, message.channel);
                }
            };
            hear.callback(result);
        }
    }
}

module.exports.onChannelJoin = (rtm, message) => {
    for (let enter of enterList) {
        enter(rtm, message);
    }
}
