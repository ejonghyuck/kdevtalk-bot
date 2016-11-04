const request = require('request');
const common = require('../common');

const url = 'http://hangang.dkserver.wo.tc';

module.exports = function (router) {
    router.hear(function (rtm, message) {
        var channel = message.channel;
        var text = message.text;

        var detecting = ['자살각', '지금한강은', '한강온도'];
        if (!common.stringContains(detecting, text)) return;

        request.get({url: url}, function (err, res, body) {
            try {
                var json = JSON.parse(body);
                rtm.sendMessage('현재 한강물의 온도는 `' + json.temp + '`℃ 입니다', message.channel);
            }
            catch (e) {
                rtm.sendMessage('한강온도 API를 불러올 수 없습니다.', message.channel);
            }
        });
    });
};
