# css

## 标准和IE低版本盒模型

```js
//标准盒子模型：宽度=内容的宽度
（content）+ border + padding + margin

//低版本IE盒子模型：宽度=内容宽度
（content + border + padding）+ margin
```
##  box-sizing属性
用来控制元素的盒子模型的解析模式，默认为content-box

context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽

border-box：IE传统盒子模型。设置元素的height/width属性指的是border + padding + content部分的高/宽

## CSS选择器有哪些

id选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)

子选择器（ul > li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a[rel=”external”]）、伪类选择器（a:hover, li:nth-child）

## 那些属性可以继承

可继承的属性：font-size, font-family, color

不可继承的样式：border, padding, margin, width, height

## css优先级

优先级（就近原则）：!important > [ id > class > tag ]     !important 比内联优先级高

## 页面字体清晰程度

让页面里的字体变清晰 -webkit-font-smoothing 在window系统下没有起作用，但是在IOS设备上起作用

-webkit-font-smoothing：antialiased是最佳的，灰度平滑

## png jpg gif图片格式

- png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。

- jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。

- gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.

- webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

## style标签为什么放在body前面

页面加载自上而下 当然是先加载样式。

写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

## ::before和 :after双冒号和单冒号区别

- 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
- ::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。

:before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after

## rgba()和opacity的透明效果

rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的透明度，而rgba()只作用于元素的颜色或起背景色。设置rgba透明的元素的子元素不会继承透明效果。

## link和@import区别

- 页面被加载时，link会同时被加载；而@import引用的CSS会等到页面被加载完成后再加载。
- link是XHTML标签，没有兼容问题；而@import只有在IE5以上才能被识别
- link支持使用JavaScript控制DOM修改样式；而@import不支持。
## css3.0新特性

## CSS清除浮动的方式
1.给父亲元素定义高度height

2.使用clear:both

3.使用:after添加伪类元素

4.使用overflow:hidden

5.使用overflow:auto

6.父元素也跟着浮动

## BFC概念

格式化上下文，是W3C css2.1规范中的一个概念，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

只要元素满足下面任一条件即可触发 BFC 特性：

body 根元素

浮动元素：float 除 none 以外的值

绝对定位元素：position (absolute、fixed)

display 为 inline-block、table-cells、flex

overflow 除了 visible 以外的值 (hidden、auto、scroll)