const request = require('request');

const config = require('./config.json');

module.exports.getUsernameToID = function (userID, callback) {
    var url = 'https://slack.com/api/users.info?token=' + config['slack-api-token'] + '&user=' + userID;
    request.get({url: url}, function (err, res, body) {
        try {
            var json = JSON.parse(body);
            var username = json.user.name;
            callback(false, username);
        }
        catch (e) {
            console.log('[body] ' + body + '\n[e] ' + e);
            callback(true);
        }
    });
}

module.exports.stringContains = function (detects, target) {
    for (var i = 0; i < detects.length; i++) {
        if (target.includes(detects[i])) {
            return true;
        }
    }
    return false;
}

module.exports.stringCompareList = function (detects, target) {
    for (var i = 0; i < detects.length; i++) {
        if (target === detects) {
            return true;
        }
    }
    return false;
}