title: compass-sticky-footer
date: 2014-12-12 15:07:39
tags: [css,sass,scss,compass]
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


### Compass Sticky Footer

语法：

	sticky-footer($footer-height, 
	  $root-selector, $root-footer-selector, 
	  $footer-selector)

在前面的[compass教程索引](../../09/compass)中我提了一个在开发中经常碰到的场景，并且也说了我自己的，蛋疼的解决方案。现在来瞅瞅Compass Sticky Footer模块是怎么实现的。

html:

	<div class='example'>
      <div id='layout'>
        <div id='header'>
          <h1>Sticky Footer Example</h1>
        </div>
        <p>
          This is the main content area.
        </p>
        <p>
          This is the main content area.
        </p>
        <p>
         This is the main content area.
        </p>
        <div id='layout_footer'></div>
      </div>
      <div id='footer'>
        This is the footer area.
      </div>
	</div>

scss:

	@import "compass/reset.scss";
	@import "compass/layout.scss";
 
	@include sticky-footer(72px, 
	  "#layout", "#layout_footer", "#footer");
 
	#header {
	  background: #999999;
	  height: 72px;
	}
 
	#footer {
	  background: #cccccc;
	}
 
	.example {
	  height: 500px;
	  border: 3px solid red;
	  p {
	    margin: 1em 0.5em;
	  }
	}

css:(主要)

	html, body {
	  height: 100%;
	}
	 
	#layout {
	  clear: both;
	  min-height: 100%;
	  height: auto !important;
	  height: 100%;
	  margin-bottom: -72px;
	}
	#layout #layout_footer {
	  height: 72px;
	}
	 
	#footer {
	  clear: both;
	  position: relative;
	  height: 72px;
	}
	 
	#header {
	  background: #999999;
	  height: 72px;
	}
	 
	#footer {
	  background: #cccccc;
	}
	 
	.example {
	  height: 500px;
	  border: 3px solid red;
	}
	.example p {
	  margin: 1em 0.5em;
	}

从css文件可以看出最关键的代码有以下这些：

	#layout {
	  clear: both;
	  min-height: 100%;
	  height: auto !important;
	  height: 100%;
	  margin-bottom: -72px;
	}
	#layout #layout_footer {
	  height: 72px;
	}

+ `min-height: 100%`保证了`#layout`可以充满外层
+ 在谷歌、火狐等浏览器的盒模型中，如果内容的高度超过父层的高度，会        导致内容溢出，所以针对这类浏览器使用了`height: auto !important;`
+ 在IE（大概这个意思）浏览器的盒模型中，如果内容的高度超过父层的高度，会把父层的高度撑大，所以针对这类浏览器使用了`height: 100%;`
+ `margin-bottom: -72px`利用了盒模型的负外边距
+ 因为使用了`margin-bottom: -72px`，`#footer`有可能会遮住`#layout`的底部，所以加上：

	html:

		<div id='layout_footer'></div>

	css:

		#layout #layout_footer {
		  height: 72px;
		}

	进行修复

*other:我之前捣鼓这个模块的时候记得`height: 72px;`还有另外一个作用，貌似是修复，给`#layout`里的p加上`line-height`或者`margin`还或者`padding`时引起的布局问题，但是我现在貌似失忆了，想不起来了，也不能让问题重现了，哪位大神知道？*

如需转载，请注明出处：[LrEmo's notes](https://metrohub.github.io)
