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
function greet(){
    var reply = [this.animal,'typically sleep between',this.sleepDuration].json(' ');
    console.log(reply)
}

var obj = {
    animal: 'cats',
    sleepDuration: '12 and 16 hours'
};

greet.call(obj)     //  cats typically sleep between 12 and 16 hours
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