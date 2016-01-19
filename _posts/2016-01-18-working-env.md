---
layout: post
title: 新的开发环境的思考
categories: general
---

过去的几年，我基本上都在使用Emacs + iTerm2的组合。Emacs主要用来编辑各种代码，iTerm2则用来跑各种工具，命令，git，以及目录管理等等，用得也算挺开心的。只是有一点，在Emacs和iTerm2之间切换非常频繁，视觉上压力很大。一直想把开发工作放到一个地方进行，避免切来切去的。

尝试过很多种方法，但都不太成功。

- 用Emacs的terminal mode，一直不是很适应，功能也不如专门的terminal。
- 用terminal版的Emacs，其实功能都可以满足，只是alt键使用起来有些不便。
- 换到terminal版的Vim，在同一个tab下需要频繁地打开关闭vim，感觉太麻烦。

最近接触到的Tmux让我的想法变成了可能。

Tmux是一款管理命令行session的工具。它能够让你很容易地在不同terminal窗口之间切换，并且支持split窗口。

于是，我现在想把工作环境变成Vim + iTerm2 + Tmux。

对每一个project都可以开一个tmux session，即使关闭iTerm2，这些session依然存在。

每一个session里面，可以把屏幕分成若干个窗口，一个大的窗口作为编辑器，其他几个小的，用来跑各种命令，工具。使用Tmux快捷键能够让我非常快速地在不同窗口中间切换。只要开一个iTerm2的tab就可以方便地做各种事情。

想法是很美好的，但实际怎么样得用了才知道，用了那么久的Emacs，要转到Vim还真是有点不舍呀！
