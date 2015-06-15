---
layout: post
title: 在Jekyll中使用Pygments(Windows)
category: tech
---

> 先吐槽一下，在windows上搭建各种开发环境，绝对是一种痛苦。要不是Linux上没有好用的输入法，而我又买不起Mac，打死我也不在windows上折腾这个东东。

文本假设你已经搭建好了Jekyll的环境，并且安装了Python 2.6 +。

### 安装easy_install
下载[setuptools-0.6c11.tar.gz](http://pypi.python.org/packages/source/s/setuptools/setuptools-0.6c11.tar.gz#md5=7df2a529a074f613b509fb44feefe74e)和[setuptools-0.6c11-py2.6.egg](http://pypi.python.org/packages/2.6/s/setuptools/setuptools-0.6c11-py2.6.egg#md5=bfa92100bd772d5a213eedd356d64086)，从setuptools-0.6c11.tar.gz中提取出ez_setup.py，放在与setuptools-0.6c11-py2.6.egg同一个目录下，运行命令：

    python ez_setup.py setuptools-0.6c11-py2.6.egg

运行之后，在`C:\PythonXX\Scripts`文件夹下就能看到easy_install了。然后，把`C:\PythonXX\Scripts`加入到Windows的环境变量中。

### 安装Pygments
通过easy_install安装Pygments，打开命令提示符，运行

    easy_install Pygments

，Pygments就会被安装到刚才的`C:\PythonXX\Scripts`目录下。

### 打补丁
Windows下，需要打一个补丁，才能让pygments正常工作。下载[补丁](https://gist.github.com/gists/1185645/download)，解压出patch文件到

    C:\RubyXXX\lib\ruby\gems\1.x.x\gems\albino-1.3.3\lib

然后运行

    patch -p1 < 0001-albino-windows-refactor.patch

打上补丁[^patch]。

### 配置Jekyll
Pygments已经安装好之后，我们需要配置Jekyll让Pygments生效。

有两种方法可以实现，第一种，打开_config.yml文件，加入配置：

    pygments: true

第二种，在Jekyll的启动命令参数中加入`--pygments`。

### 生成css样式
由于Pygments是通过css样式来实现代码高亮的，我们还需要在页面中引入Pygments的css文件。
首先，运行命令：

    pygmentize -S default -f html > pygments.css

运行之后，会在当前的目录下生成pygments.css文件，把这个文件放到站点的目录中，确保页面能够引用到它。

### 使用
Pygments的使用非常简单，把代码用highlight tag包住，highlight后面跟上语言的种类[^pygments-support-lang]，下面是例子：

    {{ "{% highlight javascript " }}%}
    function foo() {
        var bla;

        console.log("Hello, world!");
    }
    {{ "{% endhighlight " }}%}

运行`jekyll --server --auto`，得到的效果就像这样：

{% highlight javascript %}
function foo() {
    var bla;

    console.log("Hello, world!");
}
{% endhighlight %}


[^patch]: Windows默认没有patch命令，需要自行安装。
[^pygments-support-lang]: pygments支持的语言列表：<http://pygments.org/languages/>
