---
layout: post
title: "let与let*的区别"
category: scheme
---

两者的语法完全相同，不同之处在于variable列表的初始化方式不一样。

- let 先计算出所有的右边的值，然后赋值给左边的变量。
- let*：按照顺序一个一个地赋值。

在简单使用场景下，两者的效果是一样的。比如：

{% highlight scheme %}

(let ((a 1) (b 2))
  (+ a b))
;; ==> 3

(let* ((a 1) (b 2))
  (+ a b))
;; ==> 3

{% endhighlight %}

当初始值的计算涉及到列表中的其他变量时，运算机制的不同就会造成不同的结果。比如：

{% highlight scheme %}

(define a 1)
(define b 2)

(let ((a 3) (b (+ a 1)))
  (+ a b))
;; ==> 5

(let* ((a 3) (b (+ a 1)))
  (+ a b))
;; ==> 7

{% endhighlight %}

在let语句中，先计算右边的值，此时，a为1，b为2，计算得到右边的值分别为3和2，然后分别赋值给a和b。

在let*语句中，赋值是一个一个来的。先把a赋值为3，然后计算b的值，结果为`b = a + 1 = 3 + 1 = 4`。
