---
layout: post
title: "Right way to clear javascript arrays"
categories: javascript
---
Clear javascript arrays? Isn't it `a = []`? Indeed, this will make *a* an empty array. However, when *a* is referenced by other functions or objects, things become more complicated.

For instance, we have code below

``` javascript
var a = [1, 2, 3];

var obj = {
  b: a
};

// clear array
a = [];

// oops! obj.b is not updated with a
console.assert(obj.b.length === 0);
```

In code above, we created an array *a*, and an object with a property *b*, which is referencing array *a*. Then we tried to clear array *a* by assigning it to an empty array. Since *obj.b* is referencing to *a*, we expect that it is also cleared. But the result is that *obj.b* still keeps the old value of *a*. So, what's happenning here?

As you might have guessed, the reason is that ***a* is just a reference**! When we are creating *obj*, *obj.b* is actually referring to the object that *a* is referencing, not *a* itself. So, when we assign a new empty array to *a*, *obj.b* is not affected at all, it is still referring to the old object.

Since there are no *clear* method in array object, what is the right way to clear it?

One way is to perform *pop* operations until the array is empty. The reason why *pop* works is that it is modifying the object in place, not creating a new object.

``` javascript
var a = [1, 2, 3];

var obj = {
  b: a
};

// pop element until array is empty
while (a.length) {
  a.pop();
}

console.assert(obj.b.length === 0);
```

But it may seems a little awkward to do such a simple operation. Here is a tricky way to get the job done.

``` javascript
var a = [1, 2, 3];

var obj = {
  b: a
};

a.length = 0;

console.assert(obj.b.length === 0);
```

In code above, we are taking advantage of *array.length* property, when it is assigned to a length that is shorter than the real length, the array is truncated. So `a.length = 0` will truncate all the elements in array.

Sources:

- [Mozilla - Array.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
