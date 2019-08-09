# react

## React组件间信息传递

- (父组件) 向 (子组件)传递参数

- (父组件) 向更深层的 (子组件) 进行传递信息 >>> 利用(content)

- (子组件) 向 (父组件) 传递参数

- 没有任何嵌套关系的组件质检传值 (比如：兄弟组件之间传值)

- 利用react-redux进行组件质检的状态信息共享

一、父组件向子组件传递信息 >>> 主要是通过prop进行传值
```js
//  父组件
import React,{ Component } from 'react'
export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'lily',
            age:26,
            address:'china'
        }
    }

    render(){
        const userInfo = this.state;
        return (
            <section>
                <Child title="我是父组件" data={ ...userInfo } />
            </section>
        )
    }
}

//  子组件
export default class Childs extends Component{
    constructor(props){
        super(props)
    }

    render(){

        const extitle = this.props.title;
        const dataList = this.props.userInfo;
        return (
            <div>
                <h3>{extitle}</h3>
                <ul>
                    {
                        dataList.map((val,index)=>{
                              <li>{val}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
```


## React生命周期

## React 中有及三种构建组件的方式

- React.createClass()

- ES6 class 

- 无状态函数组件 function() {}

## React组件的划分

- 根据住家弄得职责通常把组件分为UI组件和容器组件。
- UI组件负责UI的呈现，容器组件负责管理数据和逻辑
- 两个通过 React-redux 提供 connect 方法联系起来

## 构造函数调用 super(props) 的目的是什么

在 super() 被调用之前，子类是不能使用 this 的，在ES2015中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因这是便于(在子类中)能在 constructor 访问 this.props

## 何为受控组件(controlled component)

类似 `<input>`, `<textarea>`, `<select>`  这样的表单元素会维护自身的状态，并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送。但在react中会有些不同，包含表单元素的组件将会在state中追踪输入的值，并且每次调用回调函数时，如onChange会更新state，重新渲染组件。一个输入表单元素，他的值通过react的这种方式来控制，这样的元素就被称为"受控元素"

## react diff原理

- 把树形结构按照层级分解，之比较同级元素
- 给列表结构的每个单元添加唯一的key属性，方便比较。
- react只会匹配相同 class 的 component （这里面的class指的是组件的名字）
- 合并操作，调用 component 的 setState 方法的时候，React 将其标记为 dirty 到每一个事件循环结束，React检查所有dirty的component重新绘制
- 选择性子树渲染，开发人员可以重写 shouldComponentUpdate 提高 diff 的性能