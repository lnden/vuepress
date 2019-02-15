# ECMAScript国际标准

[阮一峰ES6入门](http://es6.ruanyifeng.com/)

[^_^]: # (ES2015[ES6]新特性)
## ES2015[ES6]新特性

### 变量声明 let/const

1).首先他们都是块级作用于，let代替var出现。

2).var会出现变量提升，let不会。

3).let不允许在相同作用于内，重复声明同一个变量

4).const定义一个常量，一旦声明，就不能改变

5).声明变量的六种方法，var/function/  let/const/import/class

6).浏览器环境顶层对象window对象，node环境顶层对象global

### 模板字符串
```js
//Previously
var a = 20;
var b = 30;
var string = a+"+"+b+"="+(a+b)      // "20+30=50"

//Now
const a = 20;
const b = 30;
const string = `${a}+${b}=${a+b}`   // "20+30=50"
```
使用 `` 将整个字符串包裹起来，而在其中使用 ${} 来包裹一个变量或者一个表达式。

### 变量的解构赋值
从数组和对象中提取值，对变量进行赋值，这被称为解构

- **数组的结构赋值**
```js
// Previously
let a = 1;
let b = 2;
let c = 3;

// Now
let [a,b,c] = [1,2,3]
```
本质上，这种写法属于"模式匹配"，只要等号两边的模式相同，左右的变量就会被赋予对应的值，下面是一些使用嵌套数组进行结构的例子
```js
let [foo,[[bar],baz]] = [1,[[2],3]]         // → foo=>1 , bar=>2 , baz=>3
let [,,third] = ['foo','bar','baz']         // → third=> "baz"
let [x,,y] = [1,2,3]                        // → x=>1 , y=>3
let [header,...tail] = [1,2,3,4]            // → head=>1 , tail=>[2,3,4]
let [x,y,...z] = ['a']                      // → x=>"a" , y=>undefined , z=>[]
```
事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

- **对象的结构赋值**
```js
let { foo,bar } = { foo:'aaa',bar:'bbb' }
foo //  'aaa'
bar //  'bbb'
```
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { bar,foo } = { foo:'aaa',bar:'bbb' }   // foo=>"aaa" , bar=>'bbb'
let { foo:baz } = { foo:'aaa',bar:'bbb' }   // baz => 'aaa'

```
- **字符串的解构赋值**
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```js
const [a,b,c,d,e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let { length:len } = 'hello';
len // 5
```
- **数值和布尔值的结构赋值**
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```js
let { toString:s } = 123
s === Number.prototype.toString     // true

let { toString:s } = true
s === Boolean.prototype.toString    // true
```

- **函数参数的结构赋值**
```js
functiuon add([x,y]){
    return x + y
}
add([1,2])

[[1,2],[3,4]].map(([a,b]) => a+b)       // [3,7]
```
**注释：**

&emsp;&emsp;解构赋值均可以添加默认参数

### Symbol
&emsp;&emsp;ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

- **Javascript数据类型**
```js
1).undefined
2).null
3).Boolean
4).String
5).Number
6).Object
7).Symbol
```
- **Symbol.for()/Symbol.keyFor()**

```js
let s1 = Symbol('foo')
let s2 = Symbol('foo')

s1 === s2       // false

Use Symbol.for
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2       // true
```
Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。

```js
let s1 = Symbol.for('foo')
Symbol.keyFor(s1)   // 'foo'

let s2 = Symbol('foo')
Symbol.keyFor(s2)   // undefined
```
Symbol内置了11个属性(暂不学习)


### Set和Map数据结构
- **Set**
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
```js
const set = new Set([1,2,3,4,4])
[...set]    // [1,2,3,4]

const items = new Set([1,2,3,4,5,5,5,5])
items.size  // 5

const set = new Set(document.querySelectorAll('div'));
set.size    // 56

//类似于
const set = new Set()
document.querySelectorAll('div').forEach((div)=>{
    return set.add(div)
})
set.size    // 56
```
set 去重方法
```js
//  Array 去重
[...new Set(aarray)]

//  String 去重
[...new Set('ababbc')].join('')
```
- **Set实例的属性和方法**

Set 实例属性

```js
Set.prototype.constructor   //  构造函数，默认就是Set函数
Set.prototype.size          //  返回Set实例的成员总数
```
Set 实例的方法
```js
//操作方法
- add(value)：添加某个值，返回Set结构本身
- delete(value)：删除某个值，返回一个布尔值，表示删除时会否成功
- has(value)：返回一个布尔值，表示该值是否为Set的成员
- clear()：清楚所有成员，没有返回值

s.add(1).add(2).add(2)      //  注意2被加入了两次

s.size                      //  2

s.has(1)                    //  true
s.has(2)                    //  true
s.has(3)                    //  false

s.delete(2)
s.has(2)                    //  false
```
```js
//遍历方法
- keys()
- values()
- entries()
- forEach()

let set = new Set(['red','green','blue']);
for(let item of set.keys()){
    console.log(item)
}
// red
// green
// blue

for(let item of set.values()){
    console.log(item)
}
// red
// green
// blue

for(let item of set.entries()){
    console.log(item)
}
// ['red','red']
// ['green','green']
// ['blue','blue']
```


### class类

基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
```js
//Previously
function Point(x,y){
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function(){
    return '('+this.x+','+this.y+')'
}
let p = new Point(1,2)

//Now
class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return '('+this.x+','+this.y+')'
    }
}
let p = new Point(1,2)


point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```
上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。这些都与 ES5 的行为保持一致。


定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor方法。
```js
class Point { }
//等同于
class Point {
    constructor(){ }
}
```
- **Class表达式**
与函数一样，类也可以使用表达式的形式定义
```js
const MyClass = class Me {
    getClassName(){
        return Me.name
    }
}
let inst = new MyClass();
inst.getClassName()             // Me
Me.name
```


### 数据类型的扩展

### Module的语法
模块功能主要由两个命令构成：export import

export命令用于规定模块的对外接口，import命令用于输入其它模块提供的功能。

使用export命令输出变量
```js
// bad
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// good
var firstName = 'Michael';
var lastName = 'Jackson';
var  year = 1958;

export { firstName,lastName,year };
```
使用export命令输出函数或类(class)
```js
export function multiply(x,y){
    return x * y;
}
```
- **as关键字**
```js
function v1() {...}
function v2() {...}
export {
    v1 as streamV1,
    v2 as streamV2,
    v2 as streamLatesVersion
}
```
上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不用的名字输出两次！

- **export输出的接口**

export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```
上面代码输出变量foo，值为bar，500 毫秒之后变成baz。


- **javascript defer/async**

defer与async的区别是：

&emsp;&emsp;defer要等到整个页面在内存中正常渲染结束(DOM结构生成，其它脚本执行完成)，才会执行；

&emsp;&emsp;async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，在继续渲染；

&emsp;&emsp;一句话，defer是"渲染完再执行"，async是"下载完就执行"

&emsp;&emsp;如果多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。

### proxy代理

## ES2016[ES7]新特性

### Array.prototype.includes
表示某个数组是否包含给定的值，与字符串includes()方法类似

includes(value,index)
value是要检索的值，index是要检索的位置值


```js
const arr = ['a','b','c','d']
arr.includes('a')           // → true

const num = [2,4,6,8,NaN]
num.includes(NaN)           // → true
```

该方法替换indexOf()出现,indexOf检索值为空返回-1,存在则返回对应下标。

- 如果数组中有NaN,又刚好需要判断是否有存在NaN,这个时候indexOf是无法判断的

```js
var ary1 = [NaN];
console.log(ary1.indexOf(NaN))      //-1
console.log(ary1.includes(NaN))     //true
```

- 当数组有空值的时候，incldes会认为控制是undefined,而indexOf不会

```js
var ary1 = new Array(3);
console.log(ary1.indexOf(undefined));       //-1
console.log(ary1.includes(undefined))       //true

NaN===NaN            // → false
NaN.includes(NaN)    // → true
```

- includes()还有一个怪异的点需要指出，在判断 +0 与 -0 时，被认为是相同的。

在这一点上，indexOf()与includes()的处理结果是一样的，前者同样会返回 +0 的索引值。

```js
[1, +0, 3, 4].includes(-0)    //true
[1, +0, 3, 4].indexOf(-0)     //1
```

### Math.pow 求幂运算符

```js
Math.pow(x,y)
// → 返回 x 的 y 次幂

x**y ==> Math.pow(x,y)

Math.pow(2,4) == 2**4
// → true
```
使用自定义的递归函数进行指数运算
```js
function calculateExponent(base,exponent){
    if(exponent ===1 ){
        return base
    }else{
        return base * calculateExponent(base,exponent - 1);
    }
}

console.log(calculateExponent(2,10))    //  输出  1024    用时0.050048828125ms
console.log(Math.pow(2,10))             //  输出  1024    用时0.004882815125ms
console.log(2**10)                      //  输出  1024    用时0.002056640625ms
```

模仿其他语言 python/ruby


[^_^]: # (分割线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~)



## ES2017[ES8]新特性

### Promise
Promise是异步编程的一种解决方案，主要是解决地狱回调出现的，请求层层嵌套。

Promise对象有以下两个特点

- 对象的状态不受外界影响，pending(进行中)、fulfilled(已成功)和rejected(已失败)，只有异步操作的结果，可以决定当前是哪一种状态
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。只有两种可能：从pending变为fulfilled和从pending变为rejected。
```js
const getJSON = function(url){
    const promise  = new Promise((resolve,reject)=>{
        const handler = () => {
            if(this.readyState !==4 ){
                return
            }
            if(this.state === 200){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText))
            }
        };

        const client = new XMLHttpRequest();
        client.open('GET',url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept','application/json');
        client.send()
    })

    return promise;
}
```

- **Promise.prototype.then()**

Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。


```js
getJSON('/login.json').then(
    res => getJSON(res.commentURL)
).then(
    comments => console.log("resoved：",comments),
    err => console.log("rejected：",err)
)
```

- **Promise.prototype.catch()**

Promise.prototype.catch方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
```js
getJSON('/posts.json').then(
    posts =>    //... do something
).catch(
    error = >   //... console.log(error)
)
```

- **Promise.prototype.finally()**

finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
```js
promise
    .then( result => {...} )
    .catch( error => {...} )
    .finally( () => {...} )
```
上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。

- **Promise.all()**

Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const promise = Promise.all([p1,p2,p3])
```
Promise.all分成两种情况

1.只有p1、p2、p3的状态都变成fulfilled，promise的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给promise的回调函数

2.只要p1、p2、p3之中有一个被rejected，promise的状态就变成rejected，此时第一个reject的实例的返回值，会传递给promise的回调函数。

- **Promise.race()**

Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const promise = Promise.race([p1,p2,p3])
```
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，promise的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给promise的回调函数。
```js
const promise = new Promise.race([
    fetach('/resource-that-may-take-a-white'),
    new Promise((resolve,reject){
        seTimeout(()=>{
            new Error('request timeout')
        },5000)
    })
])
```
上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。


- **Promise.resolve()**

有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。
```js
Promise.resolve('foo')
//等同于
new Promise(resolve => resolve('foo'))
```

- **Promise.reject()**

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
```js
const promise = Promise.reject('出错了');
//等同于
const promise = new Promise((resolve,reject) => reject('出错了'));

promise.then(null,(s)=>{
    console.log(s)
})
//出错了
```
### Object.entries()
- 如果一个对象是具有键值对的数据结构，则每一个键值对都将会编译成一个具有两个元素的数组，这些数组最终会放到一个数组中，返回一个二维数组。
- 简言之，该防范会将某个对象的可枚举属性与值按照二维数组的方式返回。
- 若目标对象是数组时，则会将数组的下表最为键值返回。
```js
Object.entries({one:1,two:2});     // → [['one':1],['two':2]]
Object.entries([1,2])              // → [['0':1],['1':2]]
```
Object.entries()返回的数组的顺序与for-in循环保持一致，即如果对象的key值是数字，则返回值会对key值进行排序，返回的是排序后的结果。
```js
Object.entries({3:'a',4:'b',1:'c'})      // → [['1','c'],['3':'a'],['4',b'']]
```
使用Object.entries(),我们还可以进行对象属性的遍历
```js
let obj = { one: 1, two: 2 };
for(let [k,v] of Object.entries(obj)){
    console.log(`${JSON.stringify(k)}:${JSON.stringify(v)}`);
}

// output
'one':1
'two':2
```

### Object.values()
它的工作原理跟Object.entries()很像，顾名思义，它只返回自己的键值对中属性的值，他返回的数组顺序，也跟Object.entries()保持一致。

```js
Object.values({one:1,two:2})        // → [1,2]
Object.values({3:'a',4:'b',1:'c'})  // → ['c','a','b']
```

### padStart/padEnd() 字符串填充
padStart函数通过填充字符串的首部来保证字符串达到固定的长度，反之，padEnd是填充字符串的尾部来保证字符串的长度的。

该方法提供了两个参数：字符串目标长度和填充字段，其中第二个参数可以不填，默认情况下使用空格填充。

```js
'Vue'.padStart(10)          // → '       Vue'
'React'.padStart(10)        // → '     React'
'JavaScript'.padStart(10)   // → 'JavaScript'
```

```js
'Vue'.padStart(10,'-*')         // → '-*-*-*-Vue'
'React'.padStart(10,'Hello')    // → 'HelloReact'
'JavaScript'.padStart(10,'Hi')  // → 'JavaScript'
'JavaScript'.padStart(8,'Hi')   // → 'JavaScript'
```

从上面结果来看，填充函数只有在字符长度小于目标长度时才有效，若字符长度已经等于或小于目标长度时，填充字符不会起作用，而且目标长度如果小于字符串本身长度时，字符串也不会做截断处理，只会原样输出。

padEnd与之相反，在结尾处添加填充符


### Object.getOwnPropertyDescriptors()
该方法会返回目标对象中所有属性的 **属性描述符**，该属性必须是对象自己定义的，不能是从原型链继承来的

```js
let obj = {
    id: 1,
    name: 'test',
    get gender() {
        console.log('gender')
    },
    set grade(g) {
        console.log(g)
    }
}

Object.getOwnPropertyDescriptors(obj)

{
    gender: {
        configurable: true,
        enu,erable: true,
        get: f gender(),
        set: undefined
    },
    grade: {
        configurable: true,
        enumerbale: true,
        get: undefined,
        set: f grade(g)
    },
    id: {
        configurable: true,
        enumerable: true,
        value: 1,
        writable: true
    },
    name: {
        configurable: true,
        enumerable: true,
        value: 'test',
        writable: true
    }
}
```

Object.getOwnPropertyDescriptor 方法还提供了第二个参数，用来获取指定属性的属性描述符

**[差一个负数s]**

```js
let obj = {
    id: 1,
    name: 'test',
    get gender() {
        console.log('gender')
    },
    set grade(g) {
        console.log(g)
    }
}

Object.getOwnPropertyDescriptor(obj,'id')

{
    id: {
        configurable: true,
        enumerable: true,
        value: 1,
        writable: true
    }
}
```
由上述例子可知，该方法返回的描述符，会有两种类型：数据描述符、存取器描述符。返回结果中包含的键可能的值有：configurable、enumerable、value、writable、get、set。

使用过Object.assign()的同学都知道，assign方法只能拷贝一个属性的值，而不会拷贝它背后的复制方法和取值方法。Object.getOwnPropertyDescriptors()主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

### 结尾逗号，数组定义和函数参数列表

该特性允许我们在定义或者调用函数时添加尾部逗号而不报错。

```js
{
    name:'lily',
    age:26,
    work:coder,
}

function test(a,b,){
    console.log(a)
    console.log(b)
}
test(1,2,)
```


[^_^]: # (分割线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~)


## ES2018[ES9]新特性

### Promise.finally()

`finally` 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

```js
promise
    .then(result => {...})
    .catch(error => {...})
    .finally(() => {...});
```
上面代码中，不管`promise`最后的状态，在执行完成then或caych指定的回调函数以后，都会执行finally方法指定的回调函数。

下面是一个例子，服务器使用 Promise 处理请求，然后使用finally方法关掉服务器。

```js
server.listen(port)
    .then(()=>{
        // ...
    })
    .finally(()=>{
        server.stop;
    })
```
finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
```js
let count = () => {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve(100)
        },1000)
    })
}

let list = () => {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve([1,2,3])
        },1000)
    })
}

let getList = async () => {
    let c = await count();
    console.log('async');
    let l = await list();
    return { count:c,list:l }
}

console.time('start');
getList().then(res=>{
    console.log(res)
})
.catch(err=>{
    console.timeEnd('start');
    console.log(err)
})
.finally(()=>{
    console.log('finally');
})

//执行结果
async
{count: 100, list: [1, 2, 3]}
finally
```

### async/await 异步迭代
```js
login(userName){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('1001')
        },600)
    })
}

getData(userId){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(userI === '1001'){
                resolve('Success')
            }else{
                reject('Fail')
            }
        },600)
    })
}

// No use async/await
doLogin(userName){
    this.login(userName).then(this.getData).then(result=>{
        console.log(result)
    })
}

// Use async/await
async doLogin2(userName){
    const userId = await this.login(userName);
    const result = await this.getData(userId)
    console.log(result)
}


this.doLogin()      //  Success
this.doLogin2()     //  Success
```


### rest/spread属性 添加了对象的方式
在ES6中引入了`...`作用主要是 Rest参数和扩展运算符，作用对象仅用于数组

1.将一个未知数的参数表示一个数组

```js
function restParam(p1,p2,...p3){
    // p1 = 1
    // p2 = 2
    // p3 = [3, 4, 5]
}
restParam(1,2,3,4,5);
```

2.扩展运算符

```js
const values = [99,100,-1,48,16]
console.log(Math.max(...values))    // → 100
```
3.合并对象
```js
const obj1 = {name:'lily',age:26}
const obj2 = {like:'sleep',name:'Tom'}
const newObj = {...obj1,...obj2}
```

### 正则表达式反向断言

在ES9中可以允许反向断言：
```js
const reLookahead = /(?<=\D)[\d\.]+/;
match = reLookahead.exec('$123.45');
console.log(match[0]); // 123.45
```
使用?<=进行反向断言，可以使用反向断言获取货币的价格，而忽略货币符号。

- **肯定方向断言**

上面的案例为肯定反向断言，也就是说\D这个条件必须存在，若是:
```js
const reLookahead = /(?<=\D)[\d\.]+/;
match1 = reLookahead.exec('123.45'),
match2 = reLookahead.exec('12345');
console.log(match1[0]); // 45
console.log(match2);  // null
```
可以看到match1匹配到的是45,这是由于在123前面没有任何符合\D的匹配内容，它会一直找到符合\D的内容，也就是.然后返回后面的内容。
而若是没有满足前面肯定反向断言的条件的话，则返回null.

### 正则表达式dotAll模式
正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现:

```js
/hello.world/.test('hello\nworld');         // false

/hello.world/s.test('hello\nworld');        // true

console.log(/hello.world/s.test(`hello
world`))                                    // true
```

### 正则表达式命名捕获组
Javascript正则表达式中使用exec()匹配能够返回一个对象，一个包含匹配字符串的类数组。

```js
const reDate = /(\d{4})-(\d{2})-(\d{2})/,
const match = reDate.exec('2018-08-06');
console.log(match);
// [2018-08-06, 2018, 08, 06]

// 这样就可以直接用索引来获取年月日：
match[1] // 2018
match[2] // 08
match[3] // 06
```
上面的案例，若是改变正则表达式的结构就有可能改变匹配对象的索引。

如进行如下修改

```js
const reDate = /(\d{2})-(\d{2})-(\d{4})/,
const match = reDate.exec('2018-08-06');
console.log(match);
// [2018-08-06, 08, 06, 2018]

// 但此时年月日的索引就改变了
match[3] // 2018
match[1] // 08
match[2] // 06
```

可以看到上面写法的弊端，因此在ES9中允许命名捕获组使用符号`?<name>`,如下：

```js
const reDate = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = reDate.exec('2018-08-06');
console.log(match);
// [2018-08-06, 08, 06, 2018, groups: {day: 06, month: 08, year: 2018}]

//此时可以使用groups对象来获取年月日
match.groups.year // 2018
match.groups.month // 08
match.groups.day  // 06
```

命名捕获组的写法相当于是把每个匹配到的捕获组都定义了一个名字，然后存储到返回值的groups属性中。

- **结合replace()**

命名捕获也可以使用在replace()方法中。例如将日期转换为美国的 MM-DD-YYYY 格式：

```js
const reDate = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const d = '2018-08-06';
const USADate = d.replace(reDate, '$<month>-$<day>-$<year>');
console.log(USADate);
// 08-06-2018
```

还可以将中文名的姓和名调换：

```js
const reName = /(?<sur>[a-zA-Z]+)-(?<name>[a-zA-Z]+)/;
const Chinese = 'Lin-DaiDai';
const USA = Chinese.replace(reName, '$<name>-$<sur>');
console.log(USA);
// DaiDai-Lin
```


[^_^]: # (分割线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~)


## ES2019[ES10]新特性

### JSON.stringify

更加友好的 JSON.stringify （修复了对于一些超出范围的 unicode 展示错误的问题。）

### Array #{sort}
在以前，sort 函数中，10个以上元素的数组 V8 使用不稳定的QuickSort（快排。现在，使用稳定的TimSort算法。）

### Function #{toString}
Function.prototype.toString()现在返回精确字符，包括空格和注释。
```js
function /* a comment */ foo () {}

//Previously
foo.toString()      // → 'function foo() {}'

// Now
foo.toString()      // → 'function /* acomment */ foo () {}'
```

### Try catch
现在try {} catch {} 有了更加简便的方法，变成了可选型。
```js
//Previously
try{} catch(e){}

// Now
try{
    throw new Error('The flux capacitor is overloaded')
} catch {   // ← Look mom, no binding!
    handleException()
}
```

### String #{trimStart,trimEnd}
前后的空白符可以指定一边去除。

```js
const string = '  hello word  ';
string.trimStart();         // → 'hello word  '

string.trimEnd();           // → '  hello word'

string.trim();              // → 'hello word'
```

### Array #{flat,flatMap}

数组降维，递归地将数组展平到指定的深度，默认为1。

```js
const array = [1,[2,[3]]];

array.flat()        // → [1,2,[3]]
array.flat(2)       // → [1,2,3]
```

```js
[1,2,3,4].flatMap((x) => [x,x*2])         // → [2,4,3,6,4,8]
```

### Object.fromEntries

数据格式转换 Object.fromEntries（Object.entries（object））≈ 对象

```js
const object = { x: 42, y: 50 };
const entries = Object.entries(object);
// → [['x',42],['y',50]]

const result = Object.fromEntries(entries);
// → { x: 42, y: 50 }
```

### Symbol.prototype.description

通过工厂函数Symbol（）创建符号时，您可以选择通过参数提供字符串作为描述：

&emsp;&emsp;const sym = Symbol('The description');

&emsp;&emsp;以前，访问描述的唯一方法是将符号转换为字符串：

&emsp;&emsp;assert.equal(String(sym), 'Symbol(The description)');

&emsp;&emsp;现在引入了getter Symbol.prototype.description以直接访问描述：

&emsp;&emsp;assert.equal(sym.description, 'The description');

