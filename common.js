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
