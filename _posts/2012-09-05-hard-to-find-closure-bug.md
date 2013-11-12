---
layout: post
title: "一个隐晦的关于闭包的bug"
category: javascript
---

今天同事碰到了一个比较难于发现的闭包的bug，我觉得有必要记录一下。

同事大概写了这样一段代码[^1]：

{% highlight javascript %}

var procs = [];

function foo() {
    var i;

    for (i = 1; i < 4; i++) {
        procs.push(function () {
            console.log(i);
        });
    }
}

function bar() {
    var i;

    for (i = 0; i < procs.length; i++) {
        procs[i]();
    }
}

foo();
bar();

{% endhighlight %}

在第一个函数中，我们构造了三个匿名函数，函数的功能是打印出一个数字。在第二个函数中，我们分别调用了这三个函数，希望打印出结果`1 2 3`。

上面的代码似乎很正确，可执行的结果却出人意料的是`4 4 4`。为什么呢？

首先，我们要了解闭包的工作原理。

当我们在构造闭包的时候，闭包里面对外部变量的引用，并不是值传递，而是直接对该变量的引用，类似于C语言的指针。也就是说，当我们在闭包的外面对变量做出修改的同时，闭包里面引用的变量也跟着变化了，因为它们根本就是同一个对象。

对于上面的例子，匿名函数中引用的变量i，在每次迭代后的值都增加为i + 1。for语句执行完后，i的值变成了4，也就是说，我们之前定义的三个匿名函数中的变量i也悄悄地变成了4。所以在执行的时候，产生了同样的结果。

那么如何避免这样的bug呢？

我们可以利用参数传递的方式，为每个匿名函数都构造一份私有的变量，三个函数分别引用各自的i，这样就不会有问题了。

代码如下：

{% highlight javascript %}

var procs = [];

function foo() {
    var i;

    for (i = 1; i < 4; i++) {
        procs.push(
            (function (j) {
                return function () {
                    console.log(j);
                };
            }(i))
        );
    }
}

function bar() {
    var i;

    for (i = 0; i < procs.length; i++) {
        procs[i]();
    }
}

foo();
bar();

{% endhighlight %}

上面的代码在构造匿名函数时，先把i的值传递给了一个匿名函数作为参数j，由于整型在参数传递的过程中是值传递的，匿名函数中的j是一个全新的变量，不会因为i的改变而改变。然后在这个匿名函数中再构造出我们想要的匿名函数，就能达到我们预期的目的了。

[^1]: 为了便于讨论和保密，我对代码做了简化。
