const request = require('request');
const url = 'http://hangang.dkserver.wo.tc';

module.exports = function (router) {
    router.hear(/자살각|지금한강은|한강온도$/i, (msg) => {
        request.get({url: url}, function (err, res, body) {
            try {
                var json = JSON.parse(body);
                msg.send('현재 한강물의 온도는 `' + json.temp + '`℃ 입니다');
            }
            catch (e) {
                msg.send('한강온도 API를 불러올 수 없습니다.');
            }
        });
    });
};
