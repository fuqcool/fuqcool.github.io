---
layout: post
title: "Things you need to know about javascript arrays"
categories: javascript array
---

### Array is Object

Yes, you know that. But do you know `typeof([]) === 'object'`? Wow, that's strange, shouldn't it be 'array'. Yes it is, but it is also an object.
Then how should we test if an object is an array? Here is a trick that is used widely in javascript world:

``` javascript
if (Object.prototype.toString.call(a) === '[object Array]') {
  ...
}

```

To understand code above, we first need to know what `Object.prototype.toString.call(a)` does. `Object.prototype.toString` is a method that,
if not overridden, return string `[object TypeOfObj]`. Since array's `toString` has already been overridden to print array elements more friendly, 
we need to get the original method that is located on object, and explicitly pass the object we want to test as the context. In other words, we have 
forced javascript to execute the *toString* method before overrident.

Similar ways can be used on *Date*, *Function* and other types that cannot be tested using *typeof* operator.

### Wield length property
Look at code below:

``` javascript
var a = [];

a[100] = 5;
a[200] = 10;

console.assert(a.length === 201);
console.assert(typeof(a[50]) === 'undefined');
```

It can't be! Doesn't it even overflow? Well, again array is just object. What we can do on object can also be done on array. The only difference is that
when array is assigned on an integer key, such as 100, it will check if it has exceed current length of the array, if so, the array length is updated to *101*.
The slots on the vacancies is left *undefined*.

This not the end.

In most programming languages, array length is read-only property. However, in javascript, sadly as we expected, is not.

If we set array length to be larger than current length:

``` javascript
var a = [];

a.length = 100;

console.assert(a.length === 100);
console.assert(typeof(a[50]) === 'undefined');
```

Like in previous example, all the vacancies are undefined.

If we set array length to be smaller than current length:

``` javascript
var a = [1, 2, 3, 4, 5];

a.length = 0;

console.assert(a.length === 0);
console.assert(typeof(a[2]) === 'undefined'); 
```

In this case, the array will keep only elements from index *0 to newLen*, elements after that are abandoned.

### *for in* trap

``` javascript
var a = [1, 2, 3, 4, 5];
a.other = 'hello';

for (var el in a) {
  console.log(el);
}
```

If you run above in code, in browser, you will see *a.other* is also printed. *for in* will try to find all the properties and methods in the prototype chain, except for built-in Object methods. Its behavior does not change from object to array. Therefore, use *for loop* whenever possible.

### *arguments* is not array
For every function, there is an *arguments* variable. It looks like an array, it has a length property and values in indexes. But it is not array, because it has no array methods.

Why it is designed to be not an array? We want to use it as an array!!! Don't worry, there is always a trick to amend the flaws in javascript.

``` javascript
function makeArray(args) {
  return Array.prototype.slice.call(args, 0);
}
```

In above code, we forced *Array.prototype.slice* to be executed under the context of *args*. The reason why it works lies on the implementation of *slice*, which looks like this:

``` javascript
// slice actually has two arguments
Array.prototype.slice = function (beg) {
  var result = [];
  var i;
  for (i = beg; i < this.length; i++) {
    result.push(this[i]);
  }

  return result;
}
```
No matter *this* is a real array, or an *arguments* object, the result returned are the same!

### Conclusion
Array is a very interesting topic in javascript, it has many features that is completely different from programming languages we knew. This article may not cover all of them(I didn't intend to do so), but it does mentioned the major uses of arrays. Sometimes it is very hard to say one of these features is flaw or merit, it differs from case to case. No matter how you see these features, they are already there and it looks like they will continue to be there for a long time. All we can do is truly understand them and use them with our intelligence. :)
