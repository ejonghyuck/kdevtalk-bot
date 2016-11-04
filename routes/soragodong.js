const common = require('../common');

module.exports = function (router) {
    router.hear(function (rtm, message) {
        var channel = message.channel;
        var text = message.text;

        var detecting = ['소라고동님', '소라고둥님', '마법의 소라고동님', '마법의 소라고둥님', '마법의소라고동님', '마법의소라고둥님'];
        if (!common.stringContains(detecting, text)) return;

        var answers = ['안 돼.', '그래.', '하지마.', '아니.', 'No.', '다시 한 번 물어봐.', '포기해.', '돼.', '하지마.', '포기해.'];
        rtm.sendMessage(answers[Math.floor(Math.random() * answers.length)], message.channel);
    });
};
