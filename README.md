# kdevtalk-bot

개발잡담(kdevtalk)은 다양한 주제의 채널에서 즐겁게 대화할 수 있는 슬랙 채팅방 입니다.
이 저장소는 개발잡담 슬랙 채널에서 좀 더 재미난 채팅을 위해 만들어진 bot 소스입니다.

개발잡담 슬랙 채팅방에서 더 재밌는 대화를 위하여 다양한 기능을 구현하셔서 `Pull Request`를 날려주시거나, 재밌는 아이디어가 있다면 `Issues`에 등록해 주세요!

- [개발잡담 slack](https://kdevtalk.slack.com/)

문의사항은 ejonghyuck@live.co.kr 에게 보내주시거나, 개발잡담의 `#test` 채널에 남겨주세요.



## local에서 실행하기

봇 실행을 위해서 bot의 `slack-api-token`을 config.json에 등록해야 합니다.

그 다음, kdevtalk-bot 디렉토리로 이동한 다음, 아래와 같은 명령어를 입력합니다.

```bash
$ npm install # node 의존성 모듈들을 설치합니다.
$ node app.js # 봇 앱을 실행합니다.
```



Reference site
-
* [SlackAPI](https://github.com/slackhq/node-slack-sdk) : Node Library for the Slack APIs
* [Quick javascript sample 1/3](https://drive.google.com/file/d/0B47gpfbG1MCVZFpwMVB2LVVXU0U) : 0. javascript_quick_read.js
* [Quick javascript sample 2/3](https://drive.google.com/file/d/0B47gpfbG1MCVZTZIY2pBNldsd1E) : 1. ModuleExample.js
* [Quick javascript sample 3/3](https://drive.google.com/file/d/0B47gpfbG1MCVQUU0dGZ0Y2wxV3c) : 2. FunctionObjectExam.js
* [Quick Markdown example](http://www.unexpected-vortices.com/sw/rippledoc/quick-markdown-example.html) : .md file example
* [Quick gravizo example](https://github.com/TLmaK0/gravizo) : How to include graphviz graphs in github README




Flowchart
-
![Alt text](http://g.gravizo.com/g?
  digraph G {
    message [label="RTM_EVENTS.MESSAGE"];
    onJoin [label="router.onChannelJoin"];
    onMessage [label="router.onMessage"];
    ;
    hearCallbacks [label="router.exports.hear callbacks"];
    enterCallbacks [label="router.exports.enter callbacks"];
    message -> onJoin [label="subtype is channel_join"];
    message -> onMessage [label="subtype is not null/undefined"];
    ;
    enterWelcome [label="/routers/welcome.js"];
    hearSoragodong [label="/routers/soragodong.js"];
    hearHanRiver [label="/routers/han-river.js"];
    ;
    onMessage -> hearCallbacks;
    onJoin -> enterCallbacks;
    ;
    enterCallbacks -> enterWelcome;
    ;
    hearCallbacks -> hearSoragodong;
    hearCallbacks -> hearHanRiver;
  }
)



# License

MIT License
