# Javascript

## call继承

call()和apply()的区别就在于，两者之间的参数。

call()在第一个参数之后的  后续所有参数就是传入该函数的值。apply() 只有两个参数，第一个是对象，第二个是数组，这个数组就是该函数的参数。

bind()方法和前两者不同在于：bind()方法会返回执行上下文被改变的函数而不会立即执行，而前两者是直接执行该函数。它的的参数和call()相同

这三个方法的作用都是改变函数的执行上下文！

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

## 面向对象编程（一）封装

**一、生成实例对象的原始模式**

假定我们把猫看成一个对象，它有'名字'和'颜色'两个属性。
```js
var Cat = {
    name: '',
    color: ''
}
```
现在，我们需要根据这个原型对象的规格，生成两个实例对象。
```js
var cat1 = {};
    cat1.name = '大毛';
    cat1.color = '黄色'

var cat2 = {};
    cat2.name = '二毛';
    cat2.color = '黑色';
```
好了，这就是最简单的封装了，在两个属性封装在一个对象里面。但是，这样的写法有两个缺点，一是如果多生成几个实例，写起来就非常麻烦；二是实例与原型之间，没有任何办法，可以看出有什么联系。

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
javascript 还提供了一个 `instanceof` 运算符，验证原型对象与实例对象之间的关系。
```js
alert(cat1 instanceof Cat)      //  true
alert(cat2 instanceof Cat)      //  true
```

**四、构造函数模式的问题**

构造函数方法很好用，但是存在一个浪费内存的问题

请看，我们现在为Cat对象添加一个不变的属性 type (种类)，在添加一个方法eat(吃) 。那么，原型对象Cat就变成了下面这样：
```js
function Cat(name,color){
    this.name = name;
    this.color = color;
    this.type = '猫科动物',
    this.eat = function(){ alert('吃老鼠'); };
}
```
还是采用同样的方法，生成实例：
```js
var cat1 = new Cat('大毛','黄色');
var cat2 = new Cat('二毛','黑色');
alert(cat1.type);       // 猫科动物
alert(cat1.eat());      // 吃老鼠
```
表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。那就是对每一个实例对象，type属性和eat方法都是一模一样的内容，每一次生成一个实例，都必须要为重复的内容，多占用一些内存。这样既不环保，也缺乏效率。
```js
alert(cat1.eat == cat2.eat)     // false
```
能不能让 type 属性和eat() 方法在内存中只生成一次，然后所有实例都指向那个内存地址呢？回答是可以的。


**五、Prototype模式**

javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。

这意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上
```js
function Cat(name,color){
    this.name = name;
    this.color = color;
}
Cat.prototype.type = '猫科动物';
Cat.prototype.eat = function() { alert('吃老鼠') };
```
然后，生成实例
```js
var cat1 = new Cat('','');
var cat2 = new Cat('','');
alert(cat1.type);
alert(cat1.eat())
```

这时所有实例的type属性和eat()方法，其实都是同一个内存地址，指向prototype对象，因此就提高了运行效率。
```js
alert(cat1.eat == cat2.eat);    //  true
```

**六、Prototype模式的验证方法**

为了配合prototype属性，javascript定义了一些辅助方法，帮助我们使用它。

6.1 isPrototypeOf()

这个方法用来判断，某个prototype对象和某个实例质检的关系

```js
alert(Cat.prototype.isPrototypeOf(cat1));   //  true
alert(Cat.prototype.isPrototypeOf(cat2));   //  true
```

6.2 hasOwnProperty()

每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。

```js
alert(cat1.hasOwnProperty('name'));     //  true
alert(cat1.hasOwnProperty('type'));     //  false
```

6.3 in运算符

in运算符可以用来判断，某个实例是都含有某个属性，不管是不是本地属性

```js
alert('name' in cat1);      //  true
alert('type' in cat1);      //  true
```

## 面向对象编程（二）构造函数的继承

**思考题**

怎么才能使 "猫" 继承 "动物" 呢?

```js
//  一个 "动物" 对象的构造函数
function Animal(){
    this.species = '动物'
}

//  一个 "猫" 对象的构造函数
function Cat(name,color){
    this.name = name;
    this.color = color;
}
```

**一、构造函数绑定**

第一种方法也是最简单的方法，使用call和apply方法，将对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：
```js
function Animal(){
    this.species = '动物'
}

function Cat(name,color){
    Animal.apply(this,arguments);
    this.name = name;
    this.color = color;
}
var cat1 = new Cat('大毛','黄色');
alert(cat1.species)                 //  动物

//  也可以换一种写法，在最后使用继承call / apply

function Animal(){
    this.species = '动物'
}

function Cat(name,color){
    this.name = name;
    this.color = color;
}

var cat1 = new Cat('大毛','黄色');
Animal.call(cat1);
console.log(cat1)        //  {name: "大毛", color: "黄色", species: "动物"}
```

**二、Prototype模式**

第二种方法更常见,使用prototype属性

如果"猫"的prototype对象，指向一个Animal的实例，那么所有的"猫"的实例，就能继承Animal了。
```js
function Animal(){
    this.species = '动物'
}

function Cat(name,color){
    this.name = name;
    this.color = color;
}

//  它相当于完全删除了prototype 对象原先的值，然后赋予一个新值。
Cat.prototype = new Animal();

//  任何一个prototype对象都有一个constructor属性，指向它的构造函数。
//  如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor是指向Cat的；
//  加了这一行以后，Cat.prototype.constructor指向Animal。
Cat.prototype.constructor = Cat;

var cat1 = new Cat('大毛','黄色');
alert(cat1.species);                //  动物

```
```js
alert(Cat.prototype.constructor == Animal);     //  true
```
更重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。
```js
　alert(cat1.constructor == Cat.prototype.constructor);  //  true
```
因此，在运行"Cat.prototype = new Animal();"这一行之后，cat1.constructor也指向Animal！
```js
alert(cat1.constructor == Animal); // true
```

**三、直接继承prototype**

第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Aimal.prototype 所以，我们可以让Cat()跳过Animal()，直接继承Animal.prototype。

现在，我们先将Animal对象改写
```js
function Animal(){}
Animal.prototype.species = '动物';

function Cat(name,color){
    this.name = name;
    this.color = color;
}
```
然后，将Cat的prototype对象指向Animal的prototype对象，这样就完成了继承。

```js
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat('大毛','黄色');
alert(cat1.species);        //  动物
```
与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

所以，上面这一段代码其实是有问题的。请看第二行

```js
Cat.prototype.constructor = Cat;
```
这一句实际上把Animal.prototype对象的constructor属性也改掉了！

```js
alert(Animal.prototype.constructor); // Cat
```

**四、利用空对象作为中介**

由于"直接继承prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介

```js
function Animal(){ }
Animal.prototype.species = '动物';

function Cat(name,color){
    this.name = name;
    this.color = color;
}

var F = function(){}
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;

var cat1 = new Cat('大毛','黄色')
```
F是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。
```js
alert(Animal.prototype.constructor);    //  Animal
```
我们将上面的方法，封装成一个函数，便于使用。
```js
function extend(Child,Parent){
    var F = function(){}
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;

    /* 意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。
       这等于在子对象上打开一条通道，可以直接调用父对象的方法。
       这一行放在这里，只是为了实现继承的完备性，纯属备用性质。 */

    Child.uber = Parent.prototype;
}

```
使用的时候，方法如下
```js
extend(Cat,Animal);
var cat1 = new Cat('大毛','黄色');
alert(cat1.species)
```

**五、拷贝继承**

上面是采用prototype对象，实现继承。我们也可以换一种思路，纯粹采用 "拷贝"方法实现继承。简单来，如果把父亲对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？

首先，还是把Animal的所有不变属性，都放到它的prototype对象上
```js
function Animal(){}
Animal.prototype.species = '动物';
```
然后，再写一个函数，实现属性拷贝的目的
```js
function extend2(Child,Parent){
    var p = Parent.prototype;
    var c = Child.prototype;
    for(var i in p){
        console.log(i)
        c[i] = p[i]
    }
    c.uber = p
}
```
这个函数的作用，就是将福对象的prototype对象的属性，一一开呗给Child对象的prototype对象。
使用的时候，这样写：
```js
extend2(Cat,Animal);
var cat1 = new Cat('大毛','黄色');
alert(cat1.species);                // 动物
```

## 面向对象编程（三）非构造函数继承

**一、什么是"非构造函数"的继承**
```js
var Chinese = {
    nation: '中国'
}

var Doctor = {
    career: '医生'
}
```
让"医生"去继承"中国人"，也就是说，我怎样才能生成一个"中国医生"的对象？

这里要注意，这两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现"继承"。

**二、object()方法**

json格式的发明人提出了一个object()函数，可以做到这一点。
```js
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
```
这个object函数，其实只是做一件事，就是把 子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起

```js
// 使用的时候，第一步先在父对象的基础上，生成子对象：
var Doctor = object(Chinese);
// 然后，再加上子对象本身的属性：
Doctor.career = '医生';
// 这时，子对象已经继承了父对象的属性了。
alert(Doctor.nation)            //  中国
```

**三、浅拷贝**

除了使用 prototype 链以外，还有另一种思路：把对象的属性，全部拷贝给子对象，也能实现继承。

```js
var Chinese = {
    nation: '中国'
}
function extendCopy(){
    var c = {};
    for(var i in p){
        c[i] = p[i]
    }
    c.uber = p;
    return c
}
```

使用的时候，这样写：

```js
var Doctor = extendCopy(Chinese);
Doctor.career = '医生';
alert(Doctor.nation);               //  中国
```
但是，这样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。

给Chinese添加一个"出生地"属性，它的值是一个数组
```js
Chinese.birthPlaces = ['北京','上海','香港'];
```
通过extendCopy()函数，Doctor继承了Chinese
```js
var Doctor = extendCopy(Chinese);
```
然后，我们为Doctor的"出生地"添加一个城市
```js
Doctor.birthPlaces.push('厦门')
```
look~look~look!
```js
alert(Doctor.birthPlaces);      //  北京，上海，香港，厦门
alert(Chinese.birthPlaces);     //  北京，上海，香港，厦门
```
所以，extendCopy只是拷贝基本类型的数组，我们把这种拷贝叫做"浅拷贝"，这个是早起jQuery实现继承的方式。

**四、深拷贝**

所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝，它的实现并不难，只要递归调用浅拷贝就可以了

```js
var Chinese = {
    nation: '中国'
}
function deepCopy(p,c={}){
    for(var i in p){
        if(typeof p[i] === 'object'){
            c[i] = (p[i].constructor === Array) ? [] : {}
            deepCopy(p[i],c[i])
        }else{
            c[i] = p[i]
        }
    }
    return c
}
```

使用的时候这样写：现在，给父亲对象加一个属性，值为数组。然后，在子对象上修改这个属性
```js

Chinese.birthPlaces = ['北京','上海','厦门'];
var Doctor = deepCopy(Chinese[, Doctor]);
Doctor.birthPlaces.push('厦门');
```
现在就不会被影响了

```js
alert(Doctor.birthPlaces);      //  北京, 上海, 香港, 厦门
　　
alert(Chinese.birthPlaces);     //  北京, 上海, 香港
```

## 原生ajax的请求步骤

&emsp;&emsp;1.创建一个ajax对象 var xhr = new XMLHttpRequest()

&emsp;&emsp;2.使用open发送一个请求 xhr.open('GET','url',true) //异步还是同步

&emsp;&emsp;3.设置传递头 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

&emsp;&emsp;4.发送参数 xhr.send(data)

&emsp;&emsp;5.检测状态改变事件 xhr.onreadystatechange = function(){}

```js
var xhr = new XMLHttpRequest()
xhr.open('POST', options.url, true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send(params)
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        var status = xhr.status
        if (status >= 200 && status < 300) {
            options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML)
        } else {
            options.fail && options.fail(status)
        }
    }
}
```
## readyState状态

0: 请求未初始化

1: 服务器连接已建立

2: 请求已接收

3: 请求处理中

4: 请求已完成，且响应已就绪

## status状态

1xx：信息响应类，表示接收到请求并且继续处理

2xx：处理成功响应类，表示动作被成功接收、理解和接受

3xx：重定向响应类，为了完成指定的动作，必须接受进一步处理

4xx：客户端错误，客户请求包含语法错误或者是不能正确执行

5xx：服务端错误，服务器不能正确执行一个正确的请求

## jquery ajax

```js
$(function(){
    $.ajax({
        ur:'index.php',
        type:"POST",
        data:{},
        dataType:'json',
        success:function(res){
            
        },
        error:function(err){
            
        },
        timeout:3000,   //延迟3000毫秒加载
        async:true,     //表示请求异步还是同步
        catch:true,     //表示浏览器是否缓存被请求页面
        beforeSend:function(xhr){
            //发送请求前运行的函数。
        },
        complate:function(){
            //在请求完成时运行该函数，在success,error之后  
        },
        jsonp:'',
        jsonpCallback:'',
        password:'123456',
        username:'admin',
        xhr:function(){
            //用于创建 XMLHttpRequest 对象的函数。
        }
        
    })
})
```

## axios ajax
```js
axios({
    url:'',
    methods:'GET',
    data:{},
    transformRequest:[function(data){
        return data
    }],
    headers:{
    
    },
    timeout:3000,
    adapter:function(){
        
    },
    responseType:'json',
    auth: {
        username: 'janedoe',
        password: 's00pers3cret'
    },
    baseUrl:'',
    transformRequest:[function(data){
        return data
    }],
    transformResponse:[function(data){
        return data
    }],
    params  :{
        ID:123466
    }
})
```
## axio拦截器

你可以截取请求或响应在被 then 或者 catch 处理之前
```js
//添加请求拦截器
axios.interceptors.request.use（function（config）{
    //在发送请求之前做某事
    return config;
}，function（error）{
    //请求错误时做些事
    return Promise.reject（error）;
}）;

//添加响应拦截器
axios.interceptors.response.use（function（response）{
    //对响应数据做些事
    return response;
}，function（error）{
    //请求错误时做些事
    return Promise.reject（error）;
}）;
```
如果你以后可能需要删除拦截器。
```js
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

你可以将拦截器添加到axios的自定义实例。
```js
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```
## JS的数据类型 6种

- 引用数据类型

    Object、Array、Function

- 基本数据类型

    String、Number、Boolean、Undefined、Null、symbol

var str = '我是字符串'

判断数据类型使用 typeOf str

## zepto和jQuery的区别8条

```js
1.Zepto 的选择器表达式: [name=value] 中value 必须用 双引号 " or 单引号 ' 括起来

2.Zepto 是根据标准浏览器写的，所以对于节点尺寸的方法只提供 width() 和 height()，省去了 innerWidth(), innerHeight(),outerWidth(),outerHeight()

3.Zepto 的each 方法只能遍历 数组，不能遍历JSON对象

4.Zepto.js: 无法获取宽高；jQuery: 可以获取。

5.使用 jQuery 时 load 事件的处理函数不会执行，使用 Zepto 时 load 事件的处理函数 会 执行。
```

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

## JS时间机制

- 阻止事件默认行为
```js
event.preventDefault()
```

- 取消事件冒泡
```js
event.stopPropagation()      /       event.cancelBubble = true;
```

## JS的浅拷贝和深拷贝

浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

## for of 和for in的区别

1.for…in 遍历每一个属性名称,而 for…of遍历每一个属性值。

2.使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性，所以for in更适合遍历对象，不要使用for in遍历数组。

3.for of遍历的只是数组内的元素，而不包括数组的原型属性method和索引name

## in 和 instanceOf的区别

1.in某个实例 是否有某个属性

function Cat(name,color){
    this.name = name;
    this.color = color;
    this.style = '猫科动物';
    this.eat = function(){
        alert('吃老鼠');
    }
}
Cat.prototype.type = function(){
    console.log('我是挂在原型上的类型')
}
var cat1 = new Cat('大毛','黄色');

alert('name' in cat1)
alert('type' in cat1)  //这里不管是本地属性还是继承属性
2.instaceOf 判断某个对象是否是右侧的实例

function Cat(name,color){
    this.name = name;
    this.color = color;
}
var cat1 = new Cat('大毛','黄色');

alert(cat1 instanceOf Cat);  //cat1是Cat的实例
alert(cat1 instanceof Object)  //true:因为所有的类都是继承自Object

## isPrototypeOf 和 hasOwnProperty的区别

1.某个proptotype对象和某个实例之间的关系

alert(Cat.prototype.isPrototypeOf(cat1))      //true:
alert(Cat.prototype.isPrototypeOF(cat2))      //true:
2.实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。

alert(cat1.hasOwnProperty("name"))      //true
alert(cat1.hasOwnProperty("type"))      //false
注释：这里in 和 hasOwnProperty 放在一起容易记，他们都是判断实例上的元素

  1. in 是判断某个元素是否存在实例上面(不区分本地属性和继承属性)

  2. hasOwnProperty 是判断某个实例里是否存在某个元素(区分本地属性和继承)

注释：这里instanceOf 和 isPrototyOf 放在一起容易记，他们都是判断谁是谁的实例

  1. instanceOf 是判断实例是否是Cat的实例(所有实例都是object的实例)

  2. isPrototypeOf 是判断构造函数原型是否有这个实例

## 表单没有跨域，ajax有跨域？

因为原页面用 form 提交到另一个域名之后，原页面的脚本无法获取新页面中的内容。

所以浏览器认为这是安全的。

而 AJAX 是可以读取响应内容的，因此浏览器不能允许你这样做。

如果你细心的话你会发现，其实请求已经发送出去了，你只是拿不到响应而已。

所以浏览器这个策略的本质是，一个域名的 JS ，在未经允许的情况下，不得读取另一个域名的内容。但浏览器并不阻止你向另一个域名发送请求。

## =、==和===的区别

= 表示赋值的意思。

== 在表达式两边的数据类型不一致时,会隐式转换为相同数据类型,然后对值进行比较。

=== 不会进行类型转换,在比较时除了对值进行比较以外,还比较两边的数据类型。

## js排序算法

- 冒泡排序

解析：

&emsp;&emsp;1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。

&emsp;&emsp;2.第一轮的时候最后一个元素应该是最大的一个

&emsp;&emsp;3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较

```js
function sort(ele){
    for(var i=0,le=ele.length-1;i<le;i++){
        for(var j=0,lg=ele.length-i-1;j<lg;j++){
            if(ele[j]>ele[j+1]){
                let swap = ele[j];
                ele[j] = ele[j+1];
                ele[j+1] = swap;
            }
        }
    }
}

let elements = [3,1,5,7,2,4,9,6,10,8];
console.log('sort before：'+elements)
sort(elements)
console.log('sort after：'+elements)
```

- 快速排序

解析：

&emsp;&emsp;快排是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小，然后递归调用，在变量都实行快速排序

```js
function quickSort(ele){
    if(ele.length<=1){
        return ele;
    }

    var piovtIndex = Math.floor(ele.length/2);

    var pivot = ele.splice(piovtIndex,1)[0];
    var left = [];
    var right = [];
    for(var i=0;i<ele.length;i++){
        if(ele[i]<pivot){
            left.push(ele[i])
        }else{
            right.push(ele[i])
        }
    }

    return quickSort(left).concat([pivot],quickSort(right));

}

var elements = [5, 6, 2, 1, 3, 8, 7, 1.2, 5.5, 4.5]

document.write(quickSort(elements))
```

- 插入排序

解析：

&emsp;&emsp;1.从第一个元素开始，该元素可以认为已经被排序

&emsp;&emsp;2.取出下一个元素，在已经排序的元素序列中从后向前扫描

&emsp;&emsp;3.如果该元素（已排序）大于新元素，将该元素移动下一位置

&emsp;&emsp;4.重复步骤3，直接找到已排序的元素小于或者等于新元素的位置

&emsp;&emsp;5.将新元素插入到下一位置中

&emsp;&emsp;6.重复步骤2

```js
function sort(ele){
    // 假设第0个元素是一个有序的数列，第一个以后的是无需的序列，
    // 所有从第一个元素开始将无序列的元素插入到有序数列中
    for(var i=1;i<ele.length;i++){
        // 升序
        if(ele[i]<ele[i-1]){
            var guard = ele[i];
            var j = i-1;
            ele[i] = ele[j];
            while(j>= 0 && guard < ele[j]){
                ele[j+1] = ele[j]
                j--
            }
            ele[j+1] = guard;
        }
    }
}

var elements = [5, 9, 3, 6, 7, 4, 1, 8, 2];

document.write('没调用之前：'+elements)
document.write('<br />')
sort(elements)
document.write('没调用之前：'+elements)
```

https://www.cnblogs.com/beli/p/6297741.html