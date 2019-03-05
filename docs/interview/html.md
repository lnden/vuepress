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
&emsp;&emsp;使用新的API来获取当前设备的位置，返回一个位置对象，用户可以从这个对象中得到一些经纬度的相关信息。

navigator.geolocation 的三个方法

**1.getCurrentPosition()**

**2.watchPosition()**

**3.clearWatch()**


一、使用方法：navigator.geolocation.getCurrentPosition(successCallback, [errorCallback] , [positionOptions]);

**successCallback**

successCallback返回一个地理数据对象position作为参数，该对象有属性timestamp和coords。timestamp表示该地理数据创建时间（时间戳）；coords包括另外七个属性：
```js
function successCallback(position){
    console.log(position.coords.latitude)            //  估计纬度
    console.log(position.coords.longitude)           //  估计经度
    console.log(position.coords.altitude)            //  估计高度
    console.log(position.coords.accuracy)            //  所提供的以米为单位的经度和纬度估计的精确度
    console.log(position.coords.altitudeAccuracy)    //  所提供的以米为单位的高度估计的精确度
    console.log(position.coords.heading)             //  宿主设备当前移动的角度方向，相对于正北方向顺时针计算
    console.log(position.coords.speed)               //  以米每秒为单位的设备的当前对地速度
}
```
**errorCallback**

errorCallback返回一个错误数据对象error作为参数，该对象有属性：

1.code :表示失败原因，返回1 or 2 or 3 ，具体为

&emsp;&emsp;PERMISSION_DENIED (数值为1) 表示没有权限使用地理定位API

&emsp;&emsp;POSITION_UNAVAILABLE (数值为2) 表示无法确定设备的位置

&emsp;&emsp;TIMEOUT (数值为3) 表示超时

2.message：错误提示内容

**positionOptions**

positionOptions 用来设置positionOptions来更精细的执行定位，positionOptions拥有三个属性{enableHighAccuracy:boolean , timeout:long , maximumAge:long}。

enableHighAccuracy 【true or false(默认)】是否返回更详细更准确的结构，默认为false不启用，选择true则启用，但是会导致较长的响应时间及增加功耗，这种情况更多的用在移动设备上。

timeout 设备位置获取操作的超时时间设定（不包括获取用户权限时间），单位为毫秒，如果在设定的timeout时间内未能获取位置定位，则会执行errorCallback()返回code（3）。如果未设定timeout，那么timeout默认为无穷大，如果timeout为负数，则默认timeout为0。

maximumAge 设定位置缓存时间，以毫秒为单位，如果不设置该值，该值默认为0，如果设定负数，则默认为0。该值为0时，位置定位时会重新获取一个新的位置对象；该值大于0时，即从上一次获取位置时开始，缓存位置对象，如果再次获取位置时间不超过maximumAge，则返回缓存中的位置，如果超出maximumAge，则重新获取一个新的位置。

二、使用方法：navigator.geolocation.watchPosition(successCallback, [errorCallback] , [positionOptions]);

watchPosition()是定期轮询设备的位置

**successCallback**

**errorCallback**

**positionOptions**

执行步骤：

1.首先初始化positionOptions内的属性（详细同上）。

2.判断是否有缓存位置对象，该对象年龄是否可用、是否超出maximumAge ，如果可用且未超出，返回缓存位置，否则重新确定设备位置。

3.位置定位操作：

&emsp;&emsp;a).建立一个计时器，进行位置获取操作，如果在timeout之前完成，执行下一步；如果未在timeout之前完成，则执行errorCallback()，code为3，跳出步骤做等待重新激活。

&emsp;&emsp;b).如果在timeout之前获得位置成功，则执行successCallback()，然后重置计时器（从获取位置成功时刻重新算起），继续挂起获取新位置。当有与之前位置有明显不同位置出现时，再次执行successCallback()，并重复操作，该循环直到timeout超时或者获取操作中遇到POSITION_UNAVAILABLE错误执行errorCallback()为止，亦或者执行clearWatch()操作。

三、clearWatch()

配合watchPosition()使用，用于停止watchPosition()轮询。

watchPosition()需要定义一个watchID，var watchID = watchPosition(...)，通过clearWatch(watchID)来停止watchPosition()，使用方法类似setInterval。

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
