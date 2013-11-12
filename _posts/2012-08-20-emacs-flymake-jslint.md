---
layout: post
title: "在emacs中使用jslint"
category: emacs
---

> 关于jslint就不多做介绍了，从事javascript工作的，即使没有使用它，应该也听过它的大名吧。虽然我个人不能完全赞同jslint的约束规则（比如，不能使用++），但是大部分的规则还是很科学的。建议使用jslint之前，先好好看看jslint的作者Douglas Crockford的Javascript The Good Parts一书，书中解释了为什么规则是那样定义的。

在emacs下使用jslint的方法有很多种，大多数方法都可以在这篇[emacs wiki](http://emacswiki.org/emacs/FlymakeJavaScript)中找到。在这里我会介绍其中一种我认为比较不错的方法。

我使用的环境是Debian + emacs23[^for-windows]。

### 安装nodejs

过程略，到[官网](http://nodejs.org/)下载最新版本安装即可。

### 安装node-jslint

使用npm[^npm]安装node-jslint。

    npm -g install jslint

等待安装完成后，在命令行中输入`jslint /path/to/jsfile`，就能看到jslint的检查报告了。我们注意到，jslint的错误报告对每个错误打印了两行的信息[^jslint-error-msg]，而flymake却只能抓取一行的信息。为了让二者兼容，我们需要建立一个wrapper，把jslint的输出格式转换成flymake能够抓取的。建立一个名为jslint-wapper的文件，填入以下内容，保存。

    #!/bin/bash

    jslint $@ | sed 'N;s/\n//'

该文件的作用是对jslint产生的错误报告做一层过滤，把换行符去掉。运行`jslint-wapper /path/to/jsfile`的时候，错误信息就会在一行内显示出来。

### flymake-jslint.el

建立文件flymake-jslint.el，填入以下内容：

{% highlight scheme %}
(defcustom jslint-command "jslint"
  "where jslint locates"
  :type 'string
  :group 'jslint)

(defvar jslint-flags nil)
(defvar jslint-command-options nil)
(defvar jslint-predefs nil)

(when (load "flymake" t)
  (defun flymake-jslint-init ()
    (let* ((temp-file (flymake-init-create-temp-buffer-copy
		       'flymake-create-temp-inplace))
           (local-file (file-relative-name
                        temp-file
                        (file-name-directory buffer-file-name))))
      (list jslint-command (list (jslint-compose-options)
                                 local-file))))

  (defun jslint-compose-options ()
    (defun compose-predefs ()
      (if jslint-predefs
          (mapconcat
           (lambda (x)
             (concat "--predef " x))
           jslint-predefs " ")
        ""))
    (defun compose-flags ()
      (if jslint-flags
          (mapconcat
           (lambda (x)
             (if (consp x)
                 (if (cdr x)
                     (concat "--" (car x))
                   (concat "--" (car x) " false"))
               (concat "--" x)))
           jslint-flags " ")
        ""))
    (defun compose-command-options ()
      (if jslint-command-options
          (mapconcat
           (lambda (x)
             (if (consp x)
                 (concat "--" (car x) " "
                         (number-to-string (cdr x)))))
           jslint-command-options " ")
        ""))
    (concat " " (compose-flags) " "
            (compose-predefs) " "
            (compose-command-options) " "))

  (setq flymake-err-line-patterns
        (cons '("^[[:space:]]+#[[:digit:]]+ \\(.+\\) // Line \\([[:digit:]]+\\), Pos \\([[:digit:]]+\\)$" nil 2 3 1)
              flymake-err-line-patterns))

  (add-to-list 'flymake-allowed-file-name-masks
               '("\\.js\\'" flymake-jslint-init)))

(provide 'flymake-jslint)
{% endhighlight %}

上面的代码，一部分来自emacs-wiki，我又在上面加入了自定义jslint规则的功能，后面会有介绍。

### 配置.emacs

配置如下：

{% highlight scheme %}
;; add flymake-jslint.el to load path
(add-to-list 'load-path "/path/to/flymake-jslint")

(require 'flymake-jslint)

;; jslint-wrapper
(setq jslint-command "/path/to/jslint-wrapper")

(add-hook 'js-mode-hook
	  (lambda () (flymake-mode t)))
{% endhighlight %}

完成后重启emacs，就能看到效果啦！下面是我的屏幕截图：

![flymake-jslint](/img/2012-08-20-emacs.png)

### 自定义规则

上面提到了自定义jslint规则的功能，使用方法如下：

{% highlight scheme %}
;; global variables
(setq jslint-predefs '("$" "backbone"))

;; flags
(setq jslint-flags '("plusplus" "browser"))

;; options
(setq jslint-command-options
      '(("indent" . 4)
        ("maxerr" . 100)
        ("maxlen" . 80)))
{% endhighlight %}

`jslint-predefs`定义了全局变量，jslint-flags定义了一些规则的开关，而jslint-command-options则定义了*缩进*，*最大显示错误数*和*行最大长度*三个参数。详细的规则可以参见[官网的说明](http://www.jslint.com/lint.html)。

[^jslint-error-msg]: node-jslint提供了一个terse参数，可以在一行内显示错误，不过从源码看来，似乎只打印了行号和错误原因，没有具体位置的信息。如果不需要位置信息的话，可以直接跳过本文的jslint-wrapper步骤，对flymake-err-line-patterns稍作修改即可。

[^npm]: nodejs的包管理工具，安装nodejs时会默认安装。

[^for-windows]: 理论上该方法在windows也行得通，但我试了很久，都没能在emacs中调用到jslint命令。:-(
