---
layout: post
title: "Javascript namespaces"
categories: general
---

As we all know, global variables are evil, we should always try to make them as less as possible. 
The simplest way of doing this in javascript is through namespaces.

What is namespace in javascript? Well, it can be anything that is an object. 
Since properties can be dynamically added to objects, we can implement namespaces
through object chains.

Basically, it looks like this:

``` javascript
window.a = window.a || {};
window.a.b = window.a.b || {};
window.a.b.c = function () {};
```

`window.a = window.a || {}` means that if `window.a` is already defined, assign it to `window.a`, 
which does to change the value of `window.a`; otherwise, an empty object is created and assigned to `window.a`.

The reason we do this is because `window.a` may have already been defined in previous javascript files,
if we just assign it with an empty object, we might override existing definitions.

This way is so easy to understand and theoretically you can have as many levels as you want. However, 
it is a little awkward to write object chains from time to time. 

Since this is so commonly used, we can create a shortcut for it.

``` javascript
function namespace(str, fn) {
  if (!(typeof str === 'string' && str !== '')) {
    throw 'invalid namepsace: ' + str;
  }
  
  var fields = str.split('.');
  var i;
  var obj = window;
  for (i = 0; i < fields.length - 1; i++) {
    obj[fields[i]] = obj[fields[i]] || {};
    obj = obj[fields[i]];
  }

  obj[fields[i]] = (typeof fn === 'function') ? fn() : {};
}
```

Here is how to use the function:

``` javascript
namespace('a.b.c', function () {
  return 'hello world';
});

console.assert(window.a.b.c === 'hello, world', 'should create namespace "a.b.c"');
```

