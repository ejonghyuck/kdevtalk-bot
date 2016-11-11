const util = require('util');
const firebase = require('../firebase');

const getMenu = function (msg) {
    var ref = firebase('menu_recommend');
    ref.once('value', (snapshot) => {
        var data = snapshot.val();
        if (!util.isNullOrUndefined(data)) {
            var keys = Object.keys(data);
            var index = Math.floor(Math.random() * keys.length);
            for (var key in data) {
                if (key === keys[index]) {
                    msg.send(data[key]);
                    return;
                }
            }
        }
        else {
            msg.send('추천할 메뉴가 하나도 없네유 ㅠㅠ');
        }
    }, (err) => {
        console.log(err);
        msg.send('db에 에러가 발생하심 ㅠㅠ');
    });
}

const addMenu = function (msg, menu) {
    var ref = firebase('menu_recommend');
    ref.push(menu, () => {
        msg.send('추가 완료!');
    });
}

module.exports = function (router) {
    /*
    router.hear(/메뉴추천!$/i, (msg) => {
        getMenu(msg);
    });
    router.hear(/메뉴추가! (.*)$/i, (msg) => {
        addMenu(msg, msg.match[1]);
    });
    */
}
