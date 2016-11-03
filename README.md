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
>>>>>>> a76c3dc9ad5c37d913dd8b900630b1d1d9dbc084
