'use strict';

const util = require('util');
const firebase = require('../firebase');

const getMenu = (msg) => {
    let ref = firebase('menu_recommend');
    ref.once('value', (snapshot) => {
        let data = snapshot.val();
        if (!util.isNullOrUndefined(data)) {
            let keys = Object.keys(data);
            let index = Math.floor(Math.random() * keys.length);
            for (let key in data) {
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

const addMenu = (msg, menu) => {
    let ref = firebase('menu_recommend');
    ref.push(menu, () => {
        msg.send('추가 완료!');
    });
}

module.exports = (router) => {
    router.hear(/메뉴추천!$/i, (msg) => {
        getMenu(msg);
    });
    router.hear(/메뉴추가! (.*)$/i, (msg) => {
        addMenu(msg, msg.match[1]);
    });
}
