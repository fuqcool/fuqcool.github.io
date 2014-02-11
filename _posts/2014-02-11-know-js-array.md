---
layout: post
title: "Things you need to know about javascript arrays"
categories: javascript array
---

### Array is Object

Yes, you know that. But do you know `typeof([]) === 'object'`? Wow, that's strange, shouldn't it be 'array'. Yes it is, but it is also an object.
Then how should we test if an object is an array? Here is a trick that is used widespreadly in javascript world:

``` javascript
if (Object.prototype.toString.call(a) === '[object Array]') {
  ...## Things you need to know about javascript arrays


### Array is Object

Yes, you know that. But do you know `typeof([]) === 'object'`? Wow, that's strange, shouldn't it be 'array'. Yes it is, but it is also an object.
Then how should we test if an object is an array? Here is a trick that is used widespreadly in javascript world:

``` javascript
if (Object.prototype.toString.call(a) === '[object Array]') {
  ...
}

```

To understand code above, we first need to know what `Object.prototype.toString.call(a)` does. `Object.prototype.toString` is a method that,
if not overriden, return string `[object TypeOfObj]`. Since array's `toString` has already been overriden to print array elements more friendly, 
we need to get the original method that is located on object, and explicitly pass the object we want to test as the context. In other words, we have 
forced javascript to execute the **toString** method before overrident.

Similar ways can be used on **Date**, **Function** and other types that cannot be tested using *typeof* operator.

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
when array is assigned on an integer key, such as 100, it will check if it has exceed current length of the array, if so, the array length is updated to **101**.
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

In this case, the array will keep only elements from index **0 to newLen**, elements after that are abandoned.


### *for in* trap

``` javascript
var a = [1, 2, 3, 4, 5];
a.other = 'hello';

for (var el in a) {
  console.log(el);
}
```

### *arguments* is not array


### Stack vs Queue
``` javascript

var a = [1, 2, 3, 4, 5];

a.pop();
a.push(6);

a.shift();
a.unshift(0);

```

### test empty

``` javascript
if (a.length) {
  ...
}
```
}

```
