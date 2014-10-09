---
layout: post
title: javascript函数式编程的陷阱
categories: javascript
---

今天同事碰到一个很奇怪的问题，找我请教。他写了这样一行代码

```
['1', '2', '3'].map(parseInt)
```

期望得到的结果是`[1, 2, 3]`，可实际确是`[1, NaN, NaN]`。

我想了一会儿，觉得没什么问题啊，这是很简单的函数式编程。

后来，Cory想到了其中的原因。因为我们忽略了`map`和`parseInt`这两个函数的input。

`map`接收一个callback作为传入参数(第二个参数是this，这里不重要)，对每一个元素，会调用callback，并且传入三个参数

- currentValue 当前元素的值
- index 当前的index
- array 被调用的数组

再来看看`parseInt`，它接收两个参数

- string 目标字符串，对应当前元素的值
- radix 目标字符串代表的进制，对应当前的index

于是parseInt被调用了三次，分别为

```
parseInt('1', 0)
parseInt('2', 1)
parseInt('3', 2)
```

不难看出，为什么后面两个的结果为NaN了，因为2无法用一进制表示，而3也无法用二进制表示。

其实这样的bug非常难于发现，因为我们很多时候不会联想到这些参数的对应关系，或是根本就不知道这些函数的全部参数。

-----------------------

将函数作为param，还可能导致另外一种bug。

```
function Class() {
  ['a', 'b', 'c'].forEach(this.handler)
}

Class.prototype.handler = function (p) {
  this.output(p)
}

Class.prototype.output = function (p) {
  console.log(p)
}

new Class()
```

上面的代码，期待的结果是，依次打印出`abc`，可是结果确是

```
undefined is not a function
```

这里的函数参数是完全匹配的。那为什么还是不行呢？

因为在上面代码中，`this.handler`是被当作一个普通的函数来调用的，在没有指定context的情况下，默认的this是global对象。
而global对象中是没有output方法的，于是才会有上面的错误。

要解决这个问题也很简单

```
// explicitly specify context
['a', 'b', 'c'].forEach(this.handler, this)

// or, call through self

var self = this
['a', 'b', 'c'].forEach(function () { self.handler() })
```

### 结论

把函数当作input param，虽然看起来很简洁，但是却会导致一些肉眼很难发现的bug。在实际编码中，一定要小心。如果害怕出错，可以坚持使用显式调用。
