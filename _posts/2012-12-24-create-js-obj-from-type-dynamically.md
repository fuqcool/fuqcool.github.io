---
layout: post
title: "动态创建javascript对象"
category: javascript
---

首先，我们必须了解javascript对象创建的机制，在通过new操作符创建对象的时候，会发生两件事：首先，一个空的对象会产生出来，这个对象的原型会指向constructor的prototype属性；然后，新创建的对象会作为上下文传入到constructor的函数体中，执行完函数体后，对象作为new操作的返回值返回。

通过模拟这个步骤，我们就可以实现动态地创建对象。

假设，我们要创建一个类型为Type对象。第一步，先创建一个空函数，把这个空函数的prototype属性设置成为Type的prototype属性，然后对空函数做new操作，这样，我们就能得到一个空的对象，它的原型指向Type的原型。

``` javascript
var Constructor = function () {};
Constructor.prototype = Type.prototype;

var obj = new Constructor();
```

然后，我们需要进行对象创建的第二步，把刚创建的对象做为上下文，调用Type的函数体。这里，我们没有使用new操作，只是把它作为普通函数来调用。

``` javascript
Type.apply(obj, args);
```

函数执行完后，对象的属性被创建，整个对象的构造也就完成了。

下面是我在jsFiddle上创建的实例：

<div style="width: 100%">
<iframe style="max-width: 100%" height="650px" src="http://jsfiddle.net/fuqcool/73qaA/embedded/js,html,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</div>
