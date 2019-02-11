# ECMAScript

## ES2015[ES6]新特性

## ES2016[ES7]新特性

### Array.prototype.includes
表示某个数组是否包含给定的值，与字符串includes()方法类似

includes(value,index)
value是要检索的值，index是要检索的位置值

```
const arr = ['a','b','c','d']
arr.includes('a')
// → true

const num = [2,4,6,8,NaN]
num.includes(NaN)
// → true
```
该方法替换indexOf()出现,indexOf检索值为空返回-1,存在则返回对应下标。

1.如果数组中有NaN,又刚好需要判断是否有存在NaN,这个时候indexOf是无法判断的
```
var ary1 = [NaN];
console.log(ary1.indexOf(NaN))//-1
console.log(ary1.includes(NaN))//true
```
2.当数组有空值的时候，incldes会认为控制是undefined,而indexOf不会
```
var ary1 = new Array(3);
console.log(ary1.indexOf(undefined));//-1
console.log(ary1.includes(undefined))//true
```

### Math.pow 求幂运算符

```
Math.pow(x,y)
// → 返回 x 的 y 次幂

x**y ==> Math.pow(x,y)

Math.pow(2,4) == 2**4
// → true
```

## ES2017[ES8]新特性

### Promise

### Object.values()

### Object.entries()

### Object.getOwnPropertyDescriptions()

### padStart 和 padEnd()

### 结尾逗号，数组定义和函数参数列表


## ES2018[ES9]新特性

### Promise.finally()

`finally` 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
```
promise
    .then(result => {...})
    .catch(error => {...})
    .finally(() => {...});
```
上面代码中，不管`promise`最后的状态，在执行完成then或caych指定的回调函数以后，都会执行finally方法指定的回调函数。

下面是一个例子，服务器使用 Promise 处理请求，然后使用finally方法关掉服务器。
```
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



### rest/spread属性 添加了对象的方式

### 正则表达式反向断言（lookbehind）

### RegExp相关功能




## ES2019[ES10]新特性

### Array #{flat,flatMap}

数组降维，递归地将数组展平到指定的深度，默认为1。
```
const array = [1,[2,[3]]];
array.flat()
// → [1,2,[3]]
```

```
[1,2,3,4].flatMap((x)=>[x,x*2])
// → [2,4,3,6,4,8]
```

### Object.fromEntries

数据格式转换 Object.fromEntries（Object.entries（object））≈ 对象
```
const object = { x: 42, y: 50 };
const entries = Object.entries(object);
// → [['x',42],['y',50]]

const result = Object.fromEntries(entries);
// → { x: 42, y: 50 }
```

### String #{trimStart,trimEnd}
前后的空白符可以指定一边去除。
```
const string = '  hello word  ';
string.trimStart();
// → 'hello word  '

string.trimEnd();
// → '  hello word'

string.trim();
// → 'hello word'
```

### Symbol.prototype.description
