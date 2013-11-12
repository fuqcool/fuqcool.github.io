---
layout: post
title: "emacs配置集锦"
category: emacs
---

我的一些emacs的设置，不断更新中。。。

### 设置文件编码

{% highlight scheme %}
;; prefer utf-8
(setq prefer-coding-system 'utf-8)
(setq default-buffer-file-coding-system 'utf-8)
{% endhighlight %}

第一行的意思是，设置utf8为优先级最高的编码格式，只要可能，emacs就会以utf8编码来读取文件。
第二行的意思是，设置buffer的默认编码为utf8，这样在保存文件的时候，就会以utf8来保存。

### 查找文件时忽略大小写

{% highlight scheme %}
;; ignore buffer name cases
(setq read-buffer-completion-ignore-case t)
;; ignore file name cases
(setq read-file-name-completion-ignore-case t)
{% endhighlight %}

### 输入法插件设置
安装英文版Ubuntu的同学，可能会遇到无法输入中文的问题。

如果使用的是ibus，可以下载ibus.el这个插件，在配置文件中加入：

{% highlight scheme %}
(add-to-list 'load-path "/path/to/ibus")
(require 'ibus)
(add-hook 'after-init-hook 'ibus-mode-on)
{% endhighlight %}

如果重启emacs后还是无法使用，则可能是缺少一个python的库，导致无法启动ibus，安装那个库就好了，库的名字可以在\*Message\*中看到。

除了ibus平台，其他输入法平台也有相应的插件，可以很完美地解决中文输入的问题。

### 复制和剪切一行

使用emacs编码的过程中，经常需要复制和剪切一整行代码，如果用默认的快捷键，要复制一行，需要`C-a C-@ C-e M-w`4步操作才能完成，很麻烦。

考虑到这个操作实在是太频繁了，改造了一下原有的快捷键，当没有选中区域的时候，按`C-w`就剪切一行，按`M-w`就复制一行。

代码如下：

{% highlight scheme %}
;; copy region or whole line
(global-set-key "\M-w"
                (lambda ()
                  (interactive)
                  (if mark-active
                      (kill-ring-save (region-beginning)
                                      (region-end))
                    (progn
                     (kill-ring-save (line-beginning-position)
                                     (line-end-position))
                     (message "copied line")))))

;; kill region or whole line
(global-set-key "\C-w"
                (lambda ()
                  (interactive)
                  (if mark-active
                      (kill-region (region-beginning)
                                   (region-end))
                    (progn
                     (kill-region (line-beginning-position)
                                  (line-end-position))
                     (message "killed line")))))
{% endhighlight %}


### 高亮显示超过80个字符的行

虽然我不太喜欢这个限制，但是如果超过80行，我们会被扣分。

{% highlight scheme %}
(add-hook 'scheme-mode-hook   ;; can be any mode as you like
          (lambda () (highlight-lines-matching-regexp ".\\{81\\}" "red")))
{% endhighlight %}

由于`highlight-lines-matching-regexp`接收的是一个正则表达式，理论上我们可以高亮任意能用表达式匹配的行。
比如我们要高亮markdown文本中所有的标题，可以这样写：
{% highlight scheme %}
(highlight-lines-matching-regexp "^#\\{1,\\}" "red")
{% endhighlight %}
