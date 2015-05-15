title: compass-stretching
date: 2014-12-15 13:20:12
tags: [css,sass,compass]
categories: compass
---
Compass Layout模块下有三个子模块，Grid Background,Sticky Footer和Stretching，可以在scss文件中添加：

    @import "compass/layout";

引用Layout模块，如果想更加精确的控制模块的引用，也可以单独引用某个子模块，如：

    @import "compass/layout/grid-background";

or

    @import "compass/layout/sticky-footer";

or

    @import "compass/layout/stretching";

### Compass Stretching

之前用`position:absolute`时，因为只要确定一个元素的`X`和`Y`轴就能确定这个元素的位置，所以自己对`position`的使用也是一直停留在：

	position:...
    left:...
    top:...

这种形式上，直到最近研究compass时才知道`position`的又一个新用法，看一个例子：
	
	<div class="wrap">
	  <div class="inner"></div>
	</div>

假设`.wrap`的宽高为`width:200px;height:200px;`(实际情况是`.wrap`的宽高不定)现在要求`.inner`的边框为`10px`并且充满`.wrap`

第一种解决方式可以给`.inner`设置`box-sizing:border-box`

第二种解决方式就是我们今天的主角`Compass Stretching`

先引用`Compass Stretching`模块：

	@import "compass/layout/stretching";

`.wrap`的css:

	position:relative;

`.inner`的css

	.inner{
		@include stretch;
		border: 10px solid red;
	}

编译的css如下：

	.inner {
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  border: 10px solid red;
	}

Compass Stretching的完整语法如下：

---

#### stretch-y

语法：

	stretch-y($offset-top, $offset-bottom)

usage:

	elements{
	  @include stretch-y;
	}

css:

	elements {
	  position: absolute;
	  top: 0;
	  bottom: 0;
	}

or

	elements{
	  @include stretch-y(20px,10px);
	}

css:

	elements {
	  position: absolute;
	  top: 20px;
	  bottom: 20px;
	}

#### stretch-x

语法：

	stretch-x($offset-left, $offset-right)

#### stretch

语法：

	stretch($offset-top, 
	  $offset-right, $offset-bottom, $offset-left)

如需转载，请注明出处：[LrEmo's notes](https://metrohub.github.io)




