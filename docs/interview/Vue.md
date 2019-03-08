# vue

## 对于MVVM的理解

MVVM 是 Model-View-ViewModel 的缩写。

Model代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。

View 代表UI 组件，它负责将数据模型转化成UI 展现出来。

ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。

## Vue的生命周期
```js

beforeCreate()    //  (创建前) 在数据观测和初始化事件还未开始
created()         //  (创建后) 完成数据观测，属性和方法的运算，初始化事件
beforeMount()     //  (加载前) 挂在开始之前被调用，数据还没有挂在到页面上
mounted()         //  (加载后) 在el被新创建的vm.$el替换，并且挂在到实例上之后调用
beforeUpdate()    //  (更新前) 在数据更新之前调用
updated()         //  (更新后) 在由于数据改动导致的虚拟DOM重新渲染之后调用
beforeDestroy()   //  (销毁前) 在实例销毁之前调用。实例仍然完全可用。
destroyed()       //  (销毁后) 在实例销毁之后调用。调用后，所有的事件监听器会被移除。
```


## vue的数据双向绑定

定义或修改内部属性
```js
var obj = {}
Object.defineProperty(obj,'hello',{
    get:function(){
        console.log('get方法被调用了');
    }
    set:function(val){
        console.log('set方法被调用了，参数是' +val);
    }
})
obj.hello   //get方法被调用了
obj.hello = 'abc'   //set方法被调用了，参数是abc
get 和 set方法内部this指向的都是obj,这意味着get和set可以修改操作对象内部的值。
```
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
```

## watch和computed

1.computed是用于计算的，watch是用于监听数据的。

2.computed计算的数据可以不存在，watch监听的数据必须存在。

3.computed会被缓存，watch不会被缓存

## Vue组件间的参数传递

- 父组件传值给子组件

子组件通过props方法接收数据
```js
// 父组件
<section>
    <Child :content="params"/>
</section>

// 子组件
export default {
    props:{
        params:{
            type:Object,
            default:{}
        }
    },
    data() {
        return { }
    }
}
```

- 子组件传值给父组件$emit/$on来处理传递参数

```js
// 子组件
export default {
    data() {
        return {}
    },
    methods:{
        handleClick(){
            this.$emit('handleevent','123456')
        }
    }
}


// 父组件
<section>
    <Child @handleClick="childEvent"/>
<section/>
```

- 兄弟组件之间传值

eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。项目比较小时，用这个比较合适。（虽然也有不少人推荐直接用VUEX，具体来说看需求咯。技术只是手段，目的达到才是王道。）