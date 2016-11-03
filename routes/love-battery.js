var stringSimilarity = require('string-similarity');

module.exports = function (router) {
    router.hear(function (rtm, message) {
        var channel = message.channel;
        var text = message.text;

        var detecting = ['배터리', '빠떼리', '빠때리', '박대리', '밧대리', '밧데리'];
        var matches = stringSimilarity.findBestMatch(text, detecting).bestMatch;
        if (matches.rating < 0.5) return;

        var answers = ['흐흐흥', 'https://youtu.be/DbLpG9x_dho?t=20s', 'https://www.youtube.com/watch?v=ubT0CPjIxZY', 'https://www.youtube.com/watch?v=hi0_Bd6C9k4','https://www.youtube.com/watch?v=6Uod3PsbHQQ'];
        rtm.sendMessage(answers[Math.floor(Math.random() * answers.length)], message.channel);
    });
};
