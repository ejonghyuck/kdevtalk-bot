const util = require('util');
const firebase = require('../firebase');
const common = require('../common');

const getMenu = function (rtm, channel) {
    var ref = firebase('menu_recommend');
    ref.once('value', function (snapshot) {
        var data = snapshot.val();
        if (!util.isNullOrUndefined(data)) {
            var keys = Object.keys(data);
            var index = Math.floor(Math.random() * keys.length);
            for (var key in data) {
                if (key === keys[index]) {
                    rtm.sendMessage(data[key], channel);
                    return;
                }
            }
        }
        else {
            rtm.sendMessage('추천할 메뉴가 하나도 없네유 ㅠㅠ', channel);
        }
    }, function (err) {
        console.log(err);
        rtm.sendMessage('db에 에러가 발생하심 ㅠㅠ', channel);
    });
}

const addMenu = function (rtm, channel, menu) {
    var ref = firebase('menu_recommend');
    ref.push(menu, function () {
        rtm.sendMessage('추가 완료!', channel);
    });
}

module.exports = function (router) {
    router.hear(function (rtm, message) {
        var channel = message.channel;
        var text = message.text;

        if (text === '메뉴추천!') {
            getMenu(rtm, channel);
        }
        else {
            var command = common.getCommandParam('메뉴추가!', text);
            if (!util.isNullOrUndefined(command)) {
                addMenu(rtm, channel, command);
            }
        }
    });
}
