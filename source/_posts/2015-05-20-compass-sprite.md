---
title: "compass-sprite"
date: 2015-05-20 11:07:01
tags: [css,sass,compass]
categories: compass
---

![](/images/2015/compass.jpg)

compass-sprite技术简单笔记

<!--more-->

### 语法

```css
@include all-<map>-sprites;
@include <map>-sprite($name);
```

注意这里的map是一个占位符，表示精灵的名称

example:

```css
@import "icons/*.png";
@include all-icons-sprites;
```

这样`all-icons-sprites`混合器将会为精灵地图中的每个精灵撰写必要的CSS（以icons-图片名称为class）

你也可以通过使用`@include <map>-sprite($name);`混合器来针对单个的精灵输出 CSS。

example:

```css
@import "icons/*.png";
element {
    @include icons-sprites(xxx);
}
```

icons是存放精灵原始图片的文件夹，compass会以这个名字作为生成的精灵的名称，如果你从嵌套文件夹导入了精灵，那么Compass会使用最末端的包含精灵的文件夹名。

### 配置

```css
$<map>-<property>: setting;
$<map>-<sprite>-<property>: setting;
```

example:

```css
$icons-spacing: 10px;
```

**warning:**配置必须放在精灵生成之前，即`@import "icons/*.png";`之前。

其它的可配置项为:

+ 重复性`$<map>-repeat: no-repeat/repeat-x;`,`$<map>-<sprite>-repeat: no-repeat/repeat-x;`

+ 精灵的位置`$<map>-position: 0px;`,`$<map>-<sprite>-position: 0px;`

+ 精灵布局（默认为垂直布局）`$<map>-layout: vertical/horizontal/diagonal/smart;`采用智能布局不可以设置精灵间距

+ 精灵基础类`$<map>-sprite-base-class: ".class-name";`默认每个精灵地图的基础类都以其文件夹的名字命名

+ 魔术精灵选择器（默认true）`$disable-magic-sprite-selectors: true/false;`

**位置和重复性的设置只会应用到横向或纵向布局的精灵地图中。对于采用智能布局或对角线布局的精灵地图，位置和重复性的设置是无效的。**

### 工具

获取宽高`<map>-sprite-height($name)`,`<map>-sprite-width($name)`如果你想要为精灵地图中的每个精灵**自动**设置尺寸，你可以为这个精灵地图设置一个配置变量。`$<map>-sprite-dimensions: true/false;`

### 辅助器

+ Step1:创建精灵
```css  
$icons: sprite-map("icons/*.png", $layout: smart);
```
+ Step2:撰写样式
```css
sprite($map, $sprite, [$offset-x], [$offset-y]);
```