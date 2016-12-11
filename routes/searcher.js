'use strict';

const google = require('google');

// set google search option
google.lang = 'kr';
google.resultsPerPage = 1;

module.exports = (router) => {
    router.hear(/구글! (.*)$/i, (msg) => {
        google(msg.match[1], function (err, res) {
            if (err) msg.send('에러발생! 검색에 실패했어요 흐규흐규');
            else {
                msg.send('검색 결과 : \n');
                for (var i = 0; i < res.links.length; ++i) {
                    var link = res.links[i];
                    if (!link.href) {
                        continue;
                    }
                    msg.send(link.title + ' - ' + link.href);
                    msg.send(link.description + "\n");
                }
            }
        });
    });
};
