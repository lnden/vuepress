# weChat

## mpvue所在的问题

1.不支持v-html，小程序里所有的 BOM／DOM 都不能用，也就是说 v-html 指令不能用。

2.不支持过滤器，渲染部分会转成 wxml ，wxml 不支持过滤器，所以这部分功能不支持。

3.不支持在 template 内使用 methods 中的函数。

4.不支持 官方文档：Class 与 Style 绑定 中的 classObject 和 styleObject 语法

5.暂不支持在组件上使用 Class 与 Style 绑定

6.列表渲染，只是需要注意一点，嵌套列表渲染，必须指定不同的索引！