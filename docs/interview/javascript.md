# Javascript

## call继承

首先，我们要知道 `call()` 方法是存在于 `Function` 中，Function.prototype.call 是 f call() { [native code] }

```js
function f1() {
    console.log(1)
    this.num = 111;
    this.sayHey = function() {
        console.log('say hey.')
    }
}

function f2() {
    console.log(2)
    this.num = 222;
    this.sayHello = functio() {
        console.log('say hello')
    }
}

fn1.call(fn2)  //1

fn1()           //  1
fn1.num;        //  undefined
fn1.sayHey()    //  fn1.sayHey is not a function

fn2()           //  2
fn2.num;        //  111
fn2.sayHello()  //  fn2.sayHello is not a function
fn2.sayHey()    //  fn2.sayHey()
```
通过 fn1.call(fn2) 我们发现 fn1 / fun2都改变了，call() 就好比一个小三，破坏了fn1和fn2和睦的家庭

现在，fn1除了打印自己的console，其他的一无所有。而fn2拥有了fn1 console之外的所有东西 num 以及sayHello

> 记住：在这里， call 改变了this的指向

- 实例1

```js
function Product(name,price){
    this.name = name;
    this.price = price;
}

function Food(name,price){
    Product.call(this,name,price);
    this.category = 'food';
}

let food1 = new Food('chees',5)

food1;      //  Food { name:'chees',price:5,category:'food' }
```

可以看出，通过在 Food 构造方法里面调用 call()，成功使 Food 拓展了 name 以及 price 这两个字段。所以：

**准则一：可以使用 call() 方法调用父构造函数**

- 实例2

```js
var animals = [
    {
        species: 'Lion',
        name: 'King'
    },
    {
        species: 'Whale',
        name: 'Fail'
    }
]

for(var i = 0;i<animals.length;i++){
    (function(i){
        this.print = function(){
            console.log('#' + i + ' ' + this.species + '：' + this.name);
        }
        this.print();
    }).call(animals[i],i)
}
```
可以看到，在匿名函数中，我们通过call()，成功将animals中的this指向到了匿名函数中，从而循环打印出了值

**准则二：使用call方法调用匿名函数**

- 实例3

```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats',
  sleepDuration: '12 and 16 hours'
};

greet.call(obj);        //  cats typically sleep between 12 and 16 hours


```
**准则三：使用call()方法调用函数并且制定上下文的this**

最后，讲到这里，小伙伴们应该知道 call() 的一些用途了。

说到 call()，我们还要讲讲跟它相似的 apply()，其实这两者都是相似的，只是 apply() 调用的方式不同，例如：
```js
function add(a, b){
  return a + b;
}
function sub(a, b){
  return a - b;
}

// apply() 的用法
var a1 = add.apply(sub, [4, 2]); // sub 调用 add 的方法
var a2 = sub.apply(add, [4, 2]);

a1; // 6
a2; // 2

// call() 的用法
var a1 = add.call(sub, 4, 2);

```
是的，apply() 只能调用两个参数：新 this 对象和一个数组 argArray。即：function.call(thisObj, [arg1, arg2]);

以上，我们知道 apply() 和 call() 都是为了改变某个函数运行时的上下文而存在的（就是为了改变函数内部的 this 指向）。然后，因为这两个方法会立即调用，所以为了弥补它们的缺失，还有个方法 bind()，它不会立即调用：

```js
<script>
    window.onload = function() {
        var fn = {
        num: 2,
        fun: function() {
            document.getElementById("box").onclick = (function() {
            console.log(this.num);
            }).bind(this);
            // }).call(this);
            // }).apply(this);
        }

        /*
        * 这里的 this 是 fun，所以可以正确地访问 num,
        * 如果使用 bind()，会在点击之后打印 2；
        * 如果使用 call() 或者 apply()，那么在刷新网页的时候就会打印 2
        */
    }
    fn.fun();
}
</script>
```
再回想下，为什么会有 call()、apply() 呢，我们还会发现它牵扯上了 this 以及箭头函数（=>），所以下面我们来了解了解吧~

## 内存泄漏

没有及时释放，就叫做内存泄漏（memory leak）

js提供自动内存管理，减轻程序员的负担，不再用到的内存，垃圾回收机制（garbage collector）。

"引用计数"（reference counting） ：语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是0，就表示这个值不再用到了，因此可以将这块内存释放。

如果一个值不再需要了，引用数却不为0，垃圾回收机制无法释放这块内存，从而导致内存泄漏。

```js
const arr = [1,2,3,4]
console.log('hello world');
```

数组 [1,2,3,4] 是一个值，会占用内存。变量arr 是仅有的对这个值的应用，因此引用次数为1。尽管后面的代码没有用到arr，他还是会保持占用内存。
//  arr 是一个变量地址   [1,2,3,4] 是内存占用

如果增加一行代码，接触arr对[1,2,3,4]引用，这块内存就可以被垃圾回收机制释放了。
```
const arr = [1,2,3,4]
console.log(''hello  world);
arr = null;
```

## 垃圾回收机制

### 标记清除

&emsp;&emsp;这是javascript中最常用的垃圾回收方式

&emsp;&emsp;当变量进入执行环境时标记为“进入环境”，当变量离开执行环境时则标记为“离开环境”，被标记为“进入环境”的变量是不能被回收的，因为它们正在被使用，而标记为“离开环境”的变量则可以被回收

```js
function func3(){
    const a = 1;
    const b = 2;
    //  函数执行时，a b 分别被标记 进入环境
}

func3()     //  函数执行结束，a b 被标记 离开环境，被回收
```
### 引用计数
&emsp;&emsp;统计引用类型变量声明后被引用的次数，当次数为 0 时，该变量将被回收
```js
function func4(){
    const c = {};   //  引用类型变量 c 的引用计数为 0
    let d = c;      //  c 被 d 引用 c 的引用计数为 1
    let e = c;      //  c 被 2 引用 c 的引用计数为 2
    d = {};         //  d 不再引用 c c 的引用计数减为 1
    e = null;       //  e 不再引用 c c 的引用计数减为 0 将被回收
}
```
但是引用计数的方式，有一个相对明显的缺点--循环引用
```js
function func5(){
    let f = {};
    let g = {};
    f.prop = g;
    g.prop = f;
    //  由于 f 和 g 互相引用，计数永远不可能为 0
}
```
像上面这种情况就需要手动将变量的内存释放掉
```
p.prop = null;
g.prop = null;
```

## 闭包

要理解闭包，首先必须理解javascript的特殊的变量作用域。

变量的作用域无非就是两种，**全局作用域(全局变量)** 和 **局部作用域(局部变量)**

并且javascript 语言的特殊之处，就在于函数内部可以直接读取全局变量。
```js
var n = 999;
function f1(){
    alert(n)
}
f1();           //  输出 999
```
另一方面，在函数外部自然无法读取函数内的局部变量
```js
function f1(){
    var n = 999;        //  此处声明一定要使用var命令。如果不用的话，你实际上声明了一个全局变量，挂在上window上。
}
alert(n)        //  error
```
想在函数外使用函数内的变量，称为闭包，闭包就是将函数内部和函数外部链接起来的一座桥梁。

**闭包的用途**

一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中

**思考题**
```js
var name = 'The Window';
var object = {
    name: 'My Object',
    getNameFunc: function(){
        return function(){
            return this.name
        }
    }
}
console.log(object.getNameFunc()())     //  输出 'The Window'

// 因为匿名函数中的this指向window

```

```js
var name = 'The Window';
var object = {
    name: 'My Object',
    getNameFunc: function(){
        var that = this;
        return function(){
            return that.name;
        }
    }
}
console.log(object.getNameFunc()())     //  输出  'My Object'

// object内定义this变量，在匿名函数中使用，环境变量this仍然是object
```

## javascript面向对象编程（一）：封装

**一、生成实例对象的原始模式**

假定我们把猫看成一个对象，它有'名字'和'颜色'两个属性。
```js
var Cat = {
    name: '',
    color: ''
}
```
现在，我们需要根据资格原型对象的规格，生成两个实例对象。
```js
var cat1 = {};
    cat1.name = '大毛';
    cat1.color = '黄色'

var cat2 = {};
    cat2.name = '二毛';
    cat2.color = '黑色';
```
好了，这就是最简单的封装了，在两个属性封装在一个对象里面。但是，这样的写法有两个缺点，一是如果多生成几个实例，写起来就非常麻烦；二是实例于原型之间，没有任何办法，可以看出有什么联系。

**二、原始模式的改进**

我们可以写一个函数，解决代码重复的问题。
```js
function Cat(name,color){
    return {
        name:name,
        color:color
    }
}

var cat1 = Cat('大毛','黄色');
var cat2 = Cat('二毛','黑色');

//这种方法的问题依然是，cat1和cat2之间没有内在的联系，不能反映出它们是同一个原型对象的实例。

// ES6简写
const Cat = (name,color) => {
    return {
        name,
        color
    }
}
```

**三、构造函数模式**

为了解决从原型对象生成实例的问题，JavaScript提供了一个构造函数模式。
所谓构造函数，其实就是一个普通的函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。
```js
function Cat(name,color){
    this.name = name;
    this.color = color;
}
```
我们现在就可以生成实例对象了
```js
var cat1 = new Cat('大毛','黄色');
var cat2 = new Cat('二毛','黑色');
alert(cat1.name);   //  大毛
alert(cat1.color);  //  黄色
```
这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数。
```js
alert(cat1.constructor == Cat);     //  true
alert(cat2.constructor == Cat);     //  true
```