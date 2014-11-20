---
layout: post
title: How to connect mongodb on Openshift
categories: web
---

Openshift provides us a lot of environment variables, we should use them whenever possible, so that we don't have to hard code anything in our code.

The following two env variables can helps us connect to mongodb easily

- `OPENSHIFT_APP_NAME` the name of your current app, for instance `foo`
- `OPENSHIFT_MONGODB_DB_URL` the full address of mongodb server, which looks like `mongodb://admin:abcdefg@127.1.2.3:27017/`

The complete connection string will be

```
OPENSHIFT_MONGODB_DB_URL + OPENSHIFT_APP_NAME

=> mongodb://admin:abcdefg@127.1.2.3:27017/foo
```

Pass the connection string to your mongodb client, and you should be able to use mongodb on Openshift!
