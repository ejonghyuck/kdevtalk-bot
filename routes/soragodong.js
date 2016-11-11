module.exports = function (router) {
    router.hear(/소라고동님|마법의 소라고동님|마법의소라고동님$/i, (msg) => {
        var answers = ['안 돼.', '그래.', '하지마.', '아니.', 'No.', '다시 한 번 물어봐.', '포기해.', '돼.', '하지마.'];
        msg.send(answers[Math.floor(Math.random() * answers.length)]);
    });
};
