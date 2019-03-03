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