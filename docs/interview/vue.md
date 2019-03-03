# vue

## Vue的生命周期

## vue的数据双向绑定

定义或修改内部属性
```js
var obj = {}
Object.defineProperty(obj,'hello',{
    get:function(){
        console.log('get方法被调用了');
    },
    set:function(val){
        console.log('set方法被调用了，参数是' +val);
    }
})
obj.hello   //get方法被调用了
obj.hello = 'abc'   //set方法被调用了，参数是abc
get 和 set方法内部this指向的都是obj,这意味着get和set可以修改操作对象内部的值。
```js
实例：极简双向数据的实现
```js
<input type="text" id="a">
<span id="b"></span>

<script>
    var obj = {}
    Object.defineProperty(obj,'hello',{
        set:function(newVal){
            document.getElementById('a').value = newVal;
            document.getElementById('b').innerHTML = newVal;
        }
    });
    document.addEventLister('keyup',function(e){
        obj.hello = e.target.value;
    })
</script>
```js