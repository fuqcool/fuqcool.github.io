---
layout: post
title: "Two ways of defining javascript functions"
category: javascript
---

Serveral days ago, my friend asked me a question about the difference between defining a function via `var foo = function () { ... }` and `function foo() { ... }`.

Since both statement will define a function named "foo", there should be no difference at all. Normally, it is OK to see them as equivalent. But in some subtle cases, it does make a difference.

Suppose we want to define and run a function. We may write:

{% highlight javascript %}
function foo() {
  console.log('it works');
}

foo();
{% endhighlight %}

or

{% highlight javascript %}
var foo = function () {
  console.log('it works');
}

foo();
{% endhighlight %}


Undoubtly, both cases will work. However, if we put function invokation before definition, which may looks like:

{% highlight javascript %}
foo();

function foo() {
  console.log('it works');
}
{% endhighlight %}

or

{% highlight javascript %}
foo();

var foo = function () {
  console.log('it works');
}
{% endhighlight %}

The first case will work, but the second will crash with error message like "function foo is not defined."
This seems wield, **how can we invoke a function without even defining it?**

Yet it does make sense in javascript. When the javascript intepreters is processing a piece of code, function definitions are always collected before running any other statements. So, in the first case above, the function definition actually gets executed before invoking it. As for the second case, the function is defined via variable assignment, we are actually creating a anonymous function and assign it to a named variable. Hence the invoking statement is executed first, which results in an error.
