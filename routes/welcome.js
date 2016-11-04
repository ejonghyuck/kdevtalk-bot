const common = require('../common');

module.exports = function (router) {
    router.enter(function (rtm, message) {
        var channel = message.channel;
        if (channel === 'C2WLY2QDT') {
            var user = message.user;
            common.getUsernameFromID(user, function (err, username) {
                if (err) return;
                rtm.sendMessage('개발덕후들의 협곡에 오신 것을 환영합니다, ' + username + '님!!\n\n<#C2WLY2QDT|general> 채널 외에도 다양한 주제의 채널들이 존재하니까~~\n관심 있는 채널로 들어가서 마음껏 대화를 즐겨주세욧!!!!', channel);
            });
        }
    });
}
