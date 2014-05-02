---
layout: post
title: Install ELPA package from command-line
categories: emacs
---

ELPA is a package manager of Emacs. It becomes a built-in package since version *24.0*.

So, what I want to do is installing an ELPA package without opening Emacs.

First, let's create a script named `install.el`.

``` scheme
(require 'package)

; find package information from following archives
(setq package-archives '(("gnu" . "http://elpa.gnu.org/packages/")
                         ("marmalade" . "http://marmalade-repo.org/packages/")
                         ("melpa" . "http://melpa.milkbox.net/packages/")))

(package-initialize)

(mapcar (lambda (package)
          ; install package if not already installed
          (unless (package-installed-p package)
            (package-install package)))

        ; list of packages to be installed
        '(yasnippet
          color-theme))
```

To invoke the script, use command

``` bash
emacs --script install.el
```

`--script` option tells emacs to run the given script without showing the GUI interface,
which is quite useful when we simply want to run some emacs-lisp outside Emacs.

For more details of my Emacs configuration, please visit: [https://github.com/fuqcool/emacs-setting](https://github.com/fuqcool/emacs-setting)
