---
layout: post
title: "Font size problem caused by text-size-adjust"
categories: css3
---
Today, I have encountered a wierd issue while I was testing my blog on my iPhone5s. The font size on Safari for iOS is about 75% larger than that on Safari for desktop. I checked this issue with the inspector for a long time, but still cannot figure out the reason. After searching the web for a while, I got the answer.

The Safari on mobile devices has the css property `tex-size-adjust` enabled, in which, if font size is smaller than the minimum readable size, the browser will automatically multiplies the font size with a certain ratio. After I increased the font size a little bit, the issue was gone.

However, you may disagree with Safari's interests on font. In that case, we can simple disable it by adding css below.

``` css
@media screen and (max-width: 600px) {
  body {
    text-size-ajust: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-ajust: none;
    -o-text-size-ajust: none;
    -ms-text-size-ajust: none;
  }
}
```

In code above, we are using a media query, which will only be executed if device display width is no more than 600 pixels. In *body* tag, we set *text-size-adjust* to none, which will disable such feature.


Sources:

- [W3C text-size-adjust](http://dev.w3.org/csswg/css-size-adjust/)
