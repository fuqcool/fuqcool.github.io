---
layout: post
title: "高效地操作DOM"
category: javascript
---

下面介绍一个我最近使用到的页面优化技术，它帮助我把本来要十几秒才能完成的操作，在不到三秒的时间内就完成了，效果非常显著。

这项优化技术简单又实用，简而言之，就是**尽量减少浏览器DOM操作的次数**。由于DOM操作的开销十分巨大，当我们频繁地插入DOM对象时，页面就会变慢，甚至出现javascript运行超时。所以，我们应当尽量避免频繁地插入DOM对象。

比如，我们要在页面中插入一个长度为5000的列表，低效的做法是往页面中插入5000次DOM对象；而更高效的做法则是，在内存中先构建好该DOM对象或者html字符串，然后一次性插入到页面中。


下面是我在jsFiddle上创建的实例：

<embed type="text/html" width="100%" height="500px" src="http://jsfiddle.net/fuqcool/Qdmnq/embedded/js,html,result"></embed>
