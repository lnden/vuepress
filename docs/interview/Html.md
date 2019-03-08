# html

## 浏览器内核都有哪些

 - IE trident内核
 - Firefox gecko内核
 - Safari webkit内核
 - Opera  以前是presto内核  现已用chrome的Blink 内核
 - Chrome Blink 基于webkit

## 前端页面有那三层

结构层、表现层、行为层

## 说说你对语义化的理解

直观的认识标签 对于搜索引擎的抓取有好处，用正确的标签做正确的事情！

html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；

在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。

使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

## Doctype作用

doctype告诉浏览器用什么模式来解析文档

标准模式是以浏览器最高级别来解析文档，而兼容模式是以向后兼容的方式来解析文档


## XHTML和HTML有什么区别

HTML是一种基本的WEB网页设计语言，XHTML是一个基于XML的置标语言
最主要的不同：

XHTML 元素必须被正确地嵌套。

XHTML 元素必须被关闭。

标签名必须用小写字母。

XHTML 文档必须拥有根元素


## 块级元素、行内元素、空(void)元素

1.块级元素：div、 section、 main、 footer、 header、 p、 ul、 li、 ol

2.行内元素：span、 input、 a、 b、 strong、 i、 em、 small

3.空元素：br、 meta、 hr、 link、 input、 img

## H5移除的元素

big、 center、 font、 s、 strike、 t、 u

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
<label for="date">日期：</label>
<input id="date" type="date">

<label for="week">周和年：</label>
<input id="week" type="week">

<label for="month">月份：</label>
<input id="month" type="month">

<label for="time">时间：</label>
<input id="time" type="time">

<label for="email">邮箱：</label>
<input id="email" type="email">

<label for="number">数字：</label>
<input id="number" type="number">

<label for="tel">电话：</label>
<input id="tel" type="tel">

<label for="url">网址：</label>
<input id="url" type="url">

<label for="color">颜色：</label>
<input id="color" type="color">

<label for="range">滑动条：</label>
<input id="range" type="range">

<label for="search">搜索：</label>
<input id="search" type="search">
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

**1.getCurrentPosition()**  获取当前位置

**2.watchPosition()**   监听位置

**3.clearWatch()**  清除监听位置


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


### webStorage

webStorage 分 localStorage和sessionSorage 两种存储方式，主要是数据保存时长及数据的共享方式不同
API列表为：

- getItem()       接收一个参数key，获取对应key的本地存储

- setItem()       接收两个参数，key和value，如果不存在则添加，存在则更新

- key()           接收一个整数索引，返回对应本地存储中索引的键

- removeItem()    接收一个参数key，删除对应本地存储的key

- clear()         清空存储中的所有本地存储数据

```js
localStorage.setItem('userId', 'P0125688');
console.log(localStorage.key(0));               // userId
console.log(localStorage.getItem('userId'))     // P0125688
localStorage.removeItem('userId');
localStorage.clear();
```
localStorage    为长期存储

sessionStorage  为短期存储，即浏览器关闭，存储失效

### 浏览器存储的方式及优缺点

浏览器的存储有如下几点

- Cookie

    大小存储4KB左右，
    可以设置过期时间，
    增加流程消耗 每次请求都携带cookie信息，
    安全性不够高 可以被拦截

- localStorage

    长期存储，
    大小存储5M左右，
    在浏览器的隐私模式下面是不可读取的，
    存储字符串


- sessionStorage

    短期存储（即浏览器关闭），
    大小存储5M左右，
    在浏览器的隐私模式下面是不可读取的，
    存储字符串

存储对象转换为字符串JSON.stringify(obj)

获取字符串转换为对象JSON.parse(str)

- indexedDB

    IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。,例如redis、monggo

- web Sql

    webSql 关系型数据库，支持度不好，目前只有chrome支持（但是也够了，浏览器已经被chrome）


### webSocket

websocket实时通讯，聊天室，实时监听后台传递过来的消息，可以节约贷款，不浪费资源，头部信息比较小

属性：
```js
Socket.readState
Socket.bufferedAmount
```
方法：
```js
Socket.send()
Socket.close()
```

事件：
```js
Socket.onopen()
Socket.onmessage()
Socket.error()
Socket.close()
```

### webSocket如何兼容低版本浏览器

Adobe flash socket

Active HTMLFile(IE)

基于Multipart 编码发送 XHR

基于长轮询的XHR


### webWorker

可以实现js多线程处理，避免浏览器卡死现象
