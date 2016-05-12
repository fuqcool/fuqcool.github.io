---
layout: post
title: 新时代的js兼容性问题
categories: javascript
---

以往碰到的js兼容性问题，都出现在老一点的浏览器，比如IE8-，Firefox3.x这种。随着时代的发展，主流的浏览器已经能支持绝大部分的ES5特性，并且开始向ES6，甚至ES7/8发展。

就当我以为不用再操心js兼容性问题的时候，却碰到了意外。

某一日，同事找到我，跟我说我们的功能网站在Firefox下显示不出来。怎么可能！？让我看看。

代码（机密机密）大概是这样的。

```
if (true) {
  hello()

  function hello() {
    console.log('hello')
  }
}
```

我看到的错误信息是`hello is undefined`。WTF，这种把函数定义后置的写法是很常见的，没毛病啊。把`hello`的定义改成前置就没问题了，可是为什么*function hoist*在Firefox下失效了呢，难道Firefox是傻X？

原来问题出在`if`语句上，ECMAScript对于这种定义在block里面的函数是没有明确的规则的。也就是说，js引擎可以随便解释，没有对错之分。虽然Firefox的解析方式有点奇怪，但完全是合理合情合法的！

> NOTE Several widely used implementations of ECMAScript are known to support the use of FunctionDeclaration as a Statement. However there are significant and irreconcilable variations among the implementations in the semantics applied to such FunctionDeclarations. Because of these irreconcilable differences, the use of a FunctionDeclaration as a Statement results in code that is not reliably portable among implementations. It is recommended that ECMAScript implementations either disallow this usage of FunctionDeclaration or issue a warning when such a usage is encountered. Future editions of ECMAScript may define alternative portable means for declaring functions in a Statement context.

所以，为了portability，请不要再把函数定义到block里面了！
