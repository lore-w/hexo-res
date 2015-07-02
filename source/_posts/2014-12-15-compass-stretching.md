---
title: "compass-stretching"
date: 2014-12-15 13:20:12
tags: [css,sass,compass]
categories: compass
---

![](/images/2014/compass.jpg)

之前用`position:absolute`时，因为只要确定一个元素的`X`和`Y`轴就能确定这个元素的位置，所以自己对`position`的使用也是一直停留在：

```css
div {
    top: 10px;
    left: 10px;
    position: absolute;
}
```

<!--more-->

这种形式上，直到最近研究compass才学习到`position`的 一个小技巧，例子如下：

```html	
<div class="wrap">
    <div class="inner"></div>
</div>
```

假设`.wrap`的宽高为`width:200px;height:200px;`(实际情况是`.wrap`的宽高不定)现在要求`.inner`的边框为`10px`并且充满`.wrap`

第一种解决方式可以给`.inner`设置`box-sizing:border-box`

第二种解决方式就是我们今天的主角`Compass Stretching`


`.wrap`的css:

```css
.wrap {
    position: relative;
}
```

`.inner`的css

```css
.inner {
    @include stretch;
    border: 10px solid red;
}
```

编译的css如下：

```css
.inner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 10px solid red;
}
```

`Compass Stretching`的完整语法如下：

---

### stretch-y

语法：

```css
stretch-y($offset-top, $offset-bottom)
```

usage:

```css
elements {
    @include stretch-y;
}
```

css:

```css
elements {
    position: absolute;
    top: 0;
    bottom: 0;
}
```

or

```css
elements{
    @include stretch-y(20px,10px);
}
```

css:

```css
elements {
    position: absolute;
    top: 20px;
    bottom: 20px;
}
```

### stretch-x

语法：

```css
stretch-x($offset-left, $offset-right)
```

### stretch

语法：

```css
stretch($offset-top,$offset-right, $offset-bottom, $offset-left)
```




