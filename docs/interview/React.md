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

