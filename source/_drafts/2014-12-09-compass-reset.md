title: compass-reset
date: 2014-12-09 11:02:06
tags: [css,sass,compass]
categories: compass
---
Compass Reset模块用于重置浏览器的默认样式

<!--more-->

## Compass Reset

在scss文件中添加：

```css
@import "compass/reset";
```

即可引用reset模块，编译生成如下的css代码：

```css
html,body,h1,div,...{
  margin:0;
  padding:0;
  border:0;
  font-size:100%;
  vertical-align:baseline;
}
html{
  line-height:1;
}
...
```

### Compass Reset Utilities

Reset Utilities模块属于Reset模块的子模块，在scss文件中添加：

```css
@import "compass/reset/utilities";
```

编译并不会在css文件中生成任何代码，有点类似于按需加载，比如，在scss中继续添加：

```css
div.test {
  @include reset-font;
}
```

此时编译，会在css中生成如下代码：

```css
div.test {
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}
```

### Compass Reset Utilities的子模块可以参考[这里](http://compass-style.org/reference/compass/reset/utilities/)

大部分的模块都是很容易理解的，下面记录的是一些不容易理解的模块。

### reset-quotation

**example:**

```css
div {
  @include reset-quotation;
}
```

**css:**

```css
div:before, div:after {
  content: "";
  content: none;
}
```

### reset-display

这个模块暂时还不是很明白，大概理解为：

我们可能会改变元素的默认`display`值，比如把`span`的`display`修改为`block`，而reset-display的作用就是，把所有选中的默认`display`为`inline`的元素的`display`设为`inline`,同时把所有选中的默认`display`为`block`的元素的`display`设为`block`。

**usage:**

```css
@include reset-display(".test");
```

**or**

```css
@include reset-display(".test",true);
```

**css:**

```css
a.test, abbr.test, acronym.test, 
...{
  display: inline;
}

address.test, article.test, h2.test
...{
  display: block;
}
```

### 总结

对于Compass Reset Utilities中的所有子模块其实都可以像下面这样引用：

```css
elements {
  @include ...
}
```

这样在生成的css中会把elements元素作为选择器的父级，比如以reset-html5模块为例：

```css
body {
  @include reset-html5;
}
```

**css:**

```css
body article,body aside,body details,
...{
  display: block;
}
```

### Compass Reset和Compass Reset Utilities的关系？

下载compass的源码打开core\stylesheets\compass\_reset.scss里面只有两行：

```css
@import "reset/utilities";
@include global-reset;
```

可以把Compass Reset理解为Compass Reset Utilities更高一层的封装。





