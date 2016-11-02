const hearList = new Array();

module.exports.hear = function (callback) {
    hearList.push(callback);
};

module.exports.onMessage = function (rtm, message) {
    for (var i = 0; i < hearList.length; i++) {
        hearList[i](rtm, message);
    }
}
