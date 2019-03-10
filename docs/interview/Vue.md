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
    data() { return { } }
}
```

- 子组件传值给父组件$emit/$on来处理传递参数

```js
// 子组件
export default {
    data() { return {} },
    methods:{
        handleClick(){
            this.$emit('closes','cancel');
        }
    }
}

// 父组件
<section>
    <Child @closes="childEvent"/>
<section/>

export default {
    data() { return {} },
    methods:{
        closes(){
            console.log('子组件需要父组件处理关闭状态')
        }
    }
}
```

- 兄弟组件之间传值

eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。项目比较小时，用这个比较合适。（虽然也有不少人推荐直接用VUEX，具体来说看需求咯。技术只是手段，目的达到才是王道。）
```js
//  1.创建公共eventBus.js
import Vue from 'vue'
export default new Vue()

//  2.在需要发布值的地方
import eventBus from './eventBus.js'
eventBus.$emit('closes',value)

//  3.接受组件监听
import eventBus from './eventBus.js'
eventBus.$on('closes',(value)=>{...})
```

## vuex详解
vuex 是一种状态管理器，里面有 state、action、mutation、gettter、module、类似redux

- state

state是存储所有状态的地方

action是视图触发事件的地方

vue还专门封装了相关语法糖mapGetters、mapActions、mapStates

```js
//  使用mapGetters

computed:{
    ...mapGetters(['']),
    ...mapStates([''])
}
//  使用mapActions
//  使用mapStates
//  使用mapMutations
```
## vue-router详解

- 路由的钩子函数

beforeEach主要有3个参数to，from，next：

to：route即将进入的目标路由对象，

from：route当前导航正要离开的路由

next：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。


## 一句话就能回答的面试题

- 1.css只在当前组件起作用

答：在style标签中写入scoped即可 例如：`<style scoped></style>`

- 2.v-if 和 v-show 区别

答：v-if按照条件是否渲染，v-show是display的block或none；

- 3.$route和$router的区别

答：$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等。

- 4.vue.js的两个核心是什么？

答：数据驱动、组件系统

- 5.vue几种常用的指令

答：v-for 、 v-if 、v-bind、v-on、v-show、v-else

- 6.vue常用的修饰符？

答：.prevent: 提交事件不再重载页面；.stop: 阻止单击事件冒泡；.self: 当事件发生在该元素本身而不是子元素的时候会触发；.capture: 事件侦听，事件发生的时候会调用

- 7.v-on 可以绑定多个方法吗？

答：可以

- 8.vue中 key 值的作用？

答：当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM。

- 9.什么是vue的计算属性？

答：在模板中放入太多的逻辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。好处：①使得数据处理结构清晰；②依赖于数据，数据更新，处理结果自动更新；③计算属性内部this指向vm实例；④在template调用时，直接写计算属性名即可；⑤常用的是getter方法，获取数据，也可以使用set方法改变数据；⑥相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。

- 10.vue等单页面应用及其优缺点

优点：Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简洁、高效、快速、模块友好。

缺点：不支持低版本的浏览器，最低只支持到IE9；不利于SEO的优化（如果要支持SEO，建议通过服务端来进行渲染组件）；第一次加载首页耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。