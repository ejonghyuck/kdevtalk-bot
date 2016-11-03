const hearList = new Array();
const enterList = new Array();

module.exports.hear = function (callback) {
    hearList.push(callback);
};

module.exports.enter = function (callback) {
    enterList.push(callback);
}

module.exports.onMessage = function (rtm, message) {
    for (var i = 0; i < hearList.length; i++) {
        hearList[i](rtm, message);
    }
}

module.exports.onChannelJoin = function (rtm, message) {
    for (var i = 0; i < enterList.length; i++) {
        enterList[i](rtm, message);
    }
}
