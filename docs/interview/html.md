# html

## 说说你对语义化的理解
1.去掉或样式丢失的时候能让页面呈现清晰的结构：html本身是没有表现的，我们看到例如是粗体，字体大小2em，加粗；是加粗的，不要认为这是html的表现，这些其实html默认的css样式在起作用，所以去掉或样式丢失的时候能让页面呈现清晰的结构不是语义化的HTML结构的优点，但是浏览器都有有默认样式，默认样式的目的也是为了更好的表达html的语义，可以说浏览器的默认样式和语义化的HTML结构是不可分割的。

2.屏幕阅读器（如果访客有视障）会完全根据你的标记来“读”你的网页。

3.PDA、手机等设备可能无法像普通电脑的浏览器一样来渲染网页（通常是因为这些设备对CSS的支持较弱）。

4.有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重。

5.便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

## CSS清除浮动的方式
1.给父亲元素定义高度height

2.使用clear:both

3.使用:after添加伪类元素

4.使用overflow:hidden

5.使用overflow:auto

6.父元素也跟着浮动

## 减少操纵DOM的实例，事件委托
1.点击li弹出li面的内容，例如页面有100分li。

  1).获取ul下面所有的li元素（操作一次）

  2).给所有的li绑定一个点击事件（操作一次）

  3).如果有100个li，我们需要（操作100次/或者说循环绑定100次）
```js
window.onload = function(){
    var oUl = document.getElementById('ulBox');
    var allLi = oUl.getElementsByTagName('li');
    for(var i=0;i<allLi.length;i++){
        allLi[i].onclick = function(){
            alert(123);
        }
    }
}
```
解决方案：使用事件的委托
```js
window.onload = function(){
    var oUl = document.getElementById("ul1");
    oUl.onclick = function(ev){
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == 'li'){
            alert(123);
            alert(target.innerHTML);
            //可以继续判断
            switch(target.id){
                case 'add':
                alert('添加事件');
                break;
            }
        }
    }
}
```

## H5新特性

### 语义标签
```html
<section></section>
<aside></aside>
<article></article>
<nav></nav>
<header></header>
<footer></footer>
<canvas></canvas>
<audio></audio>
<video></video>
<amin></amin>
<figure></figure>
<figcaption></figcaption>
```

### 增强型表单

```html
<label for="color">颜色：</label>
<input id="color" type="color">

<label for="date">日期：</label>
<input id="date" type="date">

<label for="email">邮箱：</label>
<input id="email" type="email">

<label for="month">月份：</label>
<input id="month" type="month">

<label for="number">数字：</label>
<input id="number" type="number">

<label for="range">滑动条：</label>
<input id="range" type="range">

<label for="search">搜索：</label>
<input id="search" type="search">

<label for="tel">电话：</label>
<input id="tel" type="tel">

<label for="time">时间：</label>
<input id="time" type="time">

<label for="url">网址：</label>
<input id="url" type="url">

<label for="week">周和年：</label>
<input id="week" type="week">
```

### 视频和音频
```html
<audio src="music.mp3">该浏览器不支持</audio>
<!-- 常用属性如下 -->
    src         <!-- 要播放的音频的 URL。 -->
    autoplay    <!-- 马上播放。 -->
    controls    <!-- 显示控件，比如播放按钮。 -->
    loop        <!-- 音频结束时重新开始播放。 -->
    preload     <!-- 音频在页面加载时进行加载，并预备播放。 -->

<!-- 常用事件H5媒介事件 -->
<video src="music.mp4">该浏览器不支持</video>
```
### Canvas绘图
&emsp;&emsp;该标签用于绘制图像（通过脚本，通常是Javascript）

常用方法有
```js
var ctx = canvas.getContext('2d');
ctx.rect()              //  画矩形
ctx.lineCap="round";    //  设置线结束的样式
ctx.moveTo()
ctx.linTo()             //  路径移动，不创建线条，创建线条
ctx.scale()
ctx.rotate()            //  转换，缩放and旋转
ctx.font="40px Arial";  //  可以写文本
ctx.drawImage()         //  向画布上绘制图像、画布或视频
```

### 地理位置
### Map图像
```html
<img src="/i/eg_planets.jpg" border="0" usemap="#planetmap" alt="Planets" />

<map name="planetmap" id="planetmap">
    <area shape="circle" coords="180,139,14" href ="/example/html/venus.html" target ="_blank" alt="Venus" />
    <area shape="circle" coords="129,161,10" href ="/example/html/mercur.html" target ="_blank" alt="Mercury" />
    <area shape="rect" coords="0,0,110,260" href ="/example/html/sun.html" target ="_blank" alt="Sun" />
</map>
```
**注释：** img 元素中的 "usemap" 属性引用 map 元素中的 "id" 或 "name" 属性（根据浏览器），所以我们同时向 map 元素添加了 "id" 和 "name" 属性。
### 拖放API

### web storage

### web socket

### web worker
