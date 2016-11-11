const hearList = new Array();
const enterList = new Array();

module.exports.hear = function (reg, callback) {
    hearList.push({
        reg: reg,
        callback: callback
    });
};

module.exports.enter = function (callback) {
    enterList.push(callback);
}

module.exports.onMessage = function (rtm, message) {
    var text = message.text;
    for (var i = 0; i < hearList.length; i++) {
        if (hearList[i].reg.test(text)) {
            var match = text.match(hearList[i].reg);
            var result = {
                match: match,
                send: (msg) => {
                    rtm.sendMessage(msg, message.channel);
                }
            };
            hearList[i].callback(result);
        }
    }
}

module.exports.onChannelJoin = function (rtm, message) {
    for (var i = 0; i < enterList.length; i++) {
        enterList[i](rtm, message);
    }
}
