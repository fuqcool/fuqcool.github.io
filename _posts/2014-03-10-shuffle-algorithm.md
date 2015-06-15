---
layout: post
title: 洗牌算法的一种实现
categories: tech
---

最近自己在做一个小的程序，需要把一个集合里面的元素全部随机地打散。自己想了一个方法，复杂度是n，觉得不太快。后来参照了一下python关于shuffle的算法，发现我的方法跟它的是一样的。

下面就来介绍洗牌算法，用C语言描述。

算法的前提是有一个产生随机数的函数

``` c++
// generates a random integer between beg and end.
int get_random(int beg, int end);
```

假设我们有一堆扑克牌，怎么才能把这副牌完全打乱呢？计算机当然不能像人手那样洗牌。但是它可以产生随机数，随机地从一副牌中抽出一张牌是可以的。既然这样那就好办了，我们不停地从牌堆中随机抽取一张扑克牌，然后把这些牌堆起来，直到原来的牌堆只剩下一张牌的时候为止。这样不就完成了洗牌的动作了吗。

下面是C代码：

``` c++
int shuffle(int[] a, int len) {
    for (int i = len - 1; i > 0; i--) {
        // select an element from index 0 to i randomly;
        int index = get_random(0, i);

        // swap a[i] with a[index]
        swap(a[index], a[i]);
    }
}
```

顺便也贴出python的random单元关于shuffle的实现：

``` python
def shuffle(self, x, random=None, int=int):
    """x, random=random.random -> shuffle list x in place; return None.

    Optional arg random is a 0-argument function returning a random
    float in [0.0, 1.0); by default, the standard random.random.
    """

    if random is None:
        random = self.random
    for i in reversed(xrange(1, len(x))):
        # pick an element in x[:i+1] with which to exchange x[i]
        j = int(random() * (i+1))
        x[i], x[j] = x[j], x[i]
```
