# ECMAScript国际标准

## ES2015[ES6]新特性

## ES2016[ES7]新特性

### Array.prototype.includes
表示某个数组是否包含给定的值，与字符串includes()方法类似

includes(value,index)
value是要检索的值，index是要检索的位置值


```js
const arr = ['a','b','c','d']
arr.includes('a')
// → true

const num = [2,4,6,8,NaN]
num.includes(NaN)
// → true
```

该方法替换indexOf()出现,indexOf检索值为空返回-1,存在则返回对应下标。

1.如果数组中有NaN,又刚好需要判断是否有存在NaN,这个时候indexOf是无法判断的

```js
var ary1 = [NaN];
console.log(ary1.indexOf(NaN))      //-1
console.log(ary1.includes(NaN))     //true
```

2.当数组有空值的时候，incldes会认为控制是undefined,而indexOf不会

```js
var ary1 = new Array(3);
console.log(ary1.indexOf(undefined));       //-1
console.log(ary1.includes(undefined))       //true
```

3.NaN===NaN     // → false
NaN.incldes(NaN)    // → true

4.includes()还有一个怪异的点需要指出，在判断 +0 与 -0 时，被认为是相同的。

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

模仿其他语言 python/ruby

## ES2017[ES8]新特性

### Promise
Promise是异步编程的一种解决方案，主要是解决地狱回调出现的，请求层层嵌套。

Promise对象有以下两个特点

- 对象的状态不受外界影响，pending(进行中)、fulfilled(已成功)和rejected(已失败)，只有异步操作的结果，可以决定当前是哪一种状态
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。只有两种可能：从pending变为fulfilled和从pending变为rejected。

::: tip Promise.prototype.then()
Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
:::



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

### 字符串填充 padStart 和 padEnd()
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

方法还提供了第二个参数，用来获取指定属性的属性描述符

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

Object.getOwnPropertyDescriptors(obj,'id')

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

### 异步迭代 async/await

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


### 正则表达式反向断言（lookbehind）

### RegExp相关功能




## ES2019[ES10]新特性

### Array #{flat,flatMap}

数组降维，递归地将数组展平到指定的深度，默认为1。

```js
const array = [1,[2,[3]]];
array.flat()
// → [1,2,[3]]
array.flat(2)
// → [1,2,3]
```

```js
[1,2,3,4].flatMap((x)=>[x,x*2])
// → [2,4,3,6,4,8]
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

### String #{trimStart,trimEnd}
前后的空白符可以指定一边去除。

```js
const string = '  hello word  ';
string.trimStart();
// → 'hello word  '

string.trimEnd();
// → '  hello word'

string.trim();
// → 'hello word'
```

### Symbol.prototype.description
