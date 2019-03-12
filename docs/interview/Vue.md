# vue

## 对于MVVM的理解

MVVM 是 Model-View-ViewModel 的缩写。

Model代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。

View 代表UI 组件，它负责将数据模型转化成UI 展现出来。

ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。

## Vue有哪些指令

v-if、v-show、v-model、v-for、v-bind（:）、v-on（@）、v-else、v-html、v-clock

## v-if和v-show的区别

v-show 仅仅控制元素的显示方式，将使用css的display属性在block和none来回切换;而v-if会控制这个DOM节点是否存在。

当我们需要经常切换某个元素的显示/隐藏时，使用v-show会更加节省性能上的开销;当只需要一次显示或者隐藏时，使用v-if更加合理。


## watch和computed

1.computed是用于计算的，watch是用于监听数据的。

2.computed计算的数据可以不存在，watch监听的数据必须存在。

3.computed会被缓存，watch不会被缓存


## vue给data中的对象添加一个行属性
```js
<template>
    <div>
        <ul>
            <li v-for="value in obj" :key="value">{{value}}</li>
        </ul>
        <button @click="addObjB">添加obj.b</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: {
                a: 'obj.a'
            }
        }
    },
    methods: {
        addObjB () {
            this.obj.b = 'obj.b'
            console.log(this.obj)
        }
    }
}
</script>
```
点击button会发现，obj.b 已经成功添加，但是视图并未刷新：

原因在于在Vue实例创建时，obj.b并未声明，因此就没有被Vue转换为响应式的属性，自然就不会触发视图的更新，这时就需要使用Vue的全局api $set()：
```js
addObjB () {
    // this.obj.b = 'obj.b'
    this.$set(this.obj, 'b', 'obj.b')
    console.log(this.obj)
}
```
$set()方法相当于手动的去把obj.b处理成一个响应式的属性，此时视图也会跟着改变了

## vue中深度监听某个值

比如现在需要监控data中，obj.a 的变化。Vue中监控对象属性的变化你可以这样：

```js
watch: {
    obj: {
        handler(newValue,oldValue){
            console.log('obj changed')
        },
        deep: true
    }
}
```
deep属性表示深层遍历，但是这么写会监控obj的所有属性变化，并不是我们想要的效果，所以做点修改：
```js
watch: {
    'obj.a': {
        handler(newName,oldName){
            console.log('obj.a changed')
        }
    }
}
```
还有一种方法，可以通过computed来实现，只需要
```js
computed: {
    a1(){
        return this.obj.a
    }
}
```
这种方式利用计算属性的特性来实现，当依赖改变时，便会重新计算一个新值。


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

## 简述Vue的响应式原理

当一个Vue实例创建时，vue会遍历data选项的属性，用 Object.defineProperty 将它们转为 getter/setter并且在内部追踪相关依赖，在属性被访问和修改时通知变化。
每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。

<img src="https://pic3.zhimg.com/80/v2-a9c71394190de96b85d0f1d93480f9de_hd.jpg" width="600" align=center />


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

![avatar](https://vuex.vuejs.org/vuex.png)


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

- 使用方式

vue-router的使用方式和vuex大致相同

```js
//  1.下载安装
cnpm install vue-router -S / cnpm install vuex -S

//  2.新建相应文件
mkdir router,touch index.js / mkdir store,touch index.js

//  3.引入相应模块
import Router from 'vue-router' / import Vuex from 'vuex'
Vue.use(Router) / Vue.use(Vuex)

//  4.导出相应模块
export default new Router({
    mode: 'history',
    routes: []
})
export default new Vuex.Store({
    modules: {},
    state: {},
    actions: {},
    mutations: {},
    getters: {}
})



```

- 路由的钩子函数

beforeEach主要有3个参数to，from，next：

to：route即将进入的目标路由对象，

from：route当前导航正要离开的路由

next：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。


## vue-router实现原理

- hash模式

    早期使用hash来实现路由，url hash 就是类似于
```js
https://www.xxx.com/#/login
```
这种#后面hash值的变化，并不会导致浏览器向服务器发出请求，没发请求就意味着不刷新页面。另外每次hash值的变化，还会出触发`hashchange`这个时间，通过监听事件我们就可以知道hash值发生了哪些变化。
```js
function matchAndUpdate(){
    // todo 匹配 hash 做Domg更新操作
}
window.addEventListener('hashchange',matchaAndUpdate)
```

- history模式

    因为H5的标准发布，新增了两个API，pushState和replaceState，通过这两个API可以改变URL地址且不会发送请求。同时还有`popstate`事件，使用H5的实现，路由就不会多一个#，变得更加美观。
```js
function matchAndUpdate () {
   // todo 匹配路径 做 dom 更新操作
}

window.addEventListener('popstate', matchAndUpdate)
```


## Vue的生命周期

<img src="https://cn.vuejs.org/images/lifecycle.png" width="600" align=center />

在谈到Vue的生命周期的时候，我们首先需要创建一个实例，也就是在 new Vue ( ) 的对象过程当中，首先执行了init（init是vue组件里面默认去执行的），在init的过程当中首先调用了beforeCreate，然后在injections（注射）和reactivity（反应性）的时候，它会再去调用created。所以在init的时候，事件已经调用了，我们在beforeCreate的时候千万不要去修改data里面赋值的数据，最早也要放在created里面去做（添加一些行为）。

当created完成之后，它会去判断instance（实例）里面是否含有“el”option（选项），如果没有的话，它会调用vm.$mount(el)这个方法，然后执行下一步；如果有的话，直接执行下一步。紧接着会判断是否含有“template”这个选项，如果有的话，它会把template解析成一个render function ，这是一个template编译的过程，结果是解析成了render函数：

```js
render (h) { return h('div', {}, this.text) }
```

解释一下，render函数里面的传参h就是Vue里面的createElement方法，return返回一个createElement方法，其中要传3个参数，第一个参数就是创建的div标签；第二个参数传了一个对象，对象里面可以是我们组件上面的props，或者是事件之类的东西；第三个参数就是div标签里面的内容，这里我们指向了data里面的text。

使用render函数的结果和我们之前使用template解析出来的结果是一样的。render函数是发生在beforeMount和mounted之间的，这也从侧面说明了，在beforeMount的时候，$el还只是我们在HTML里面写的节点，然后到mounted的时候，它就把渲染出来的内容挂载到了DOM节点上。这中间的过程其实是执行了render function的内容。

在使用.vue文件开发的过程当中，我们在里面写了template模板，在经过了vue-loader的处理之后，就变成了render function，最终放到了vue-loader解析过的文件里面。这样做有什么好处呢？原因是由于在解析template变成render function的过程，是一个非常耗时的过程，vue-loader帮我们处理了这些内容之后，当我们在页面上执行vue代码的时候，效率会变得更高。

beforeMount在有了render function的时候才会执行，当执行完render function之后，就会调用mounted这个钩子，在mounted挂载完毕之后，这个实例就算是走完流程了。

后续的钩子函数执行的过程都是需要外部的触发才会执行。比如说有数据的变化，会调用beforeUpdate，然后经过Virtual DOM，最后updated更新完毕。当组件被销毁的时候，它会调用beforeDestory，以及destoryed。
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