# 简单Regular 单页结构范例(非服务端渲染版本)


## 目录介绍

```
├── app   // 源码目录
│   ├── assets   // 静态资源，发布会复制到public
│   ├── mcss     // 预处理器css文件
│   └── script   // 源码目录
│       ├── components  // 所有组件
│       │       └──  modal   // 例: 对应的modal组件
│       ├── module           // 模块，对应一个路由节点
│       ├── util             // 帮助函数列表，例如fetch等
│       ├── service          // 请求的封装
│       ├── page             // 页面入口文件
│       └── index.js         // 入口文件（如果是单页只需要此文件）
├── script       // 脚本, 部署、发布、gulp-task等
│       └── webpack.config          // webpack配置文件
├── public       // 静态资源发布目录 『资源放在app/assets，不要放这里』
├── gulpfile.js  // gulp任务脚本
├── package.json // npm配置文件
└── README.md    // 说明文件

```


## 注意

1. 范例的组件都是js, 模板使用模板字符串管理， 复杂组件请将模板与脚本分离

## 启动


```js

cnpm install # 安装缓慢请使用cnpm, cnpm安装请google, 或者直接使用nenpm http://npm.hz.netease.com/
cnpm run watch # 启动watch脚本
cnpm start # 打开浏览器

```




## 单页书写

请参考`app/script/routes.js`

1. 配置的每个节点对应一个Regular组件
2. 组件生命周期
   - enter: 进入对应state时候触发
   - mount: 进入或更新参数时候触发(最常用生命周期)
   - leave: 退出时调用

