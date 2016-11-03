const request = require('request');

module.exports = function (router) {
    router.enter(function (rtm, message) {
        console.log(message.user + ' has joined to ' + message.channel);
        if (channel === 'C2WLY2QDT') {
            var channel = message.channel;
            var user = message.user;
            var url = 'https://slack.com/api/users.info?token=' + process.env.BOT_TOKEN + '&user=' + user;
            request.get({url: url}, function (err, res, body) {
                try {
                    var json = JSON.parse(body);
                    var username = json.user.name;
                    rtm.sendMessage('개발덕후들의 협곡에 오신 것을 환영합니다, ' + username + '님!!\n\n<#C2WLY2QDT|general> 채널 외에도 많은 채널들이 존재하니까~~\n관심 있으신 채널로 들어가서 마음껏 대화를 즐겨주세욧!!!!', message.channel);
                }
                catch (e) {
                    console.log('body : ' + body + '\n' + e);
                }
            });
        }
    });
}
