---
layout: post
title: Use enviroment variables in OpenShift
categories: web
---

> Make everything as simple as possible, but not simpler. -- Albert Einstein

OpenShift supports a bunch of programming languages. Here we take *javascript/node.js* for example.

Settings an env variable is as easy as one line in your terminal.

```
rhc env set NODE_ENV=production -a YOUR_APP_NAME
```

Then you can read the variable through `process.env.NODE_ENV` in your javascript file.

For more details, please refer to [https://developers.openshift.com/en/managing-environment-variables.html](https://developers.openshift.com/en/managing-environment-variables.html)
