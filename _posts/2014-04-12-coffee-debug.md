---
layout: post
title: "Debug coffeescript using node inspector"
categories: general
---

First, make sure node inspector is running.

``` bash
node-inspector &
```

Note that the default port of node inspector is 5858.

To debug coffe script, use command:

``` bash
coffee --nodejs --debug-brk path/to/file
```

To debug jasmine test cases written in coffee, use command:

``` bash
node --debug-brk node_modules/jasmine-node/bin/jasmine-node --coffee spec/parserSpec.coffee
```

Then open `http://127.0.0.1:8080/debug?port=5858` in your browser. That's it!