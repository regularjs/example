# Regular Example Collection


1. [webpack](#webpack)
2. [单页范例](#routing)
3. [NEJ](#NEJ)


<a name="webpack"></a>
## Webpack

Use [Regular](https://github.com/regularjs/regular) with [webpack](http://webpack.github.io)

```shell

$ cd webpack
$ npm install
$ webpack -w 

```

Then open the `webpack/index.html`. 

<a name="routing"></a>
## 单页系统范例


Use [Regular](https://github.com/regularjs/regular) with [webpack](http://webpack.github.io)

### 启动

```shell

cd routing
npm install  # or cnpm
npm start    # will open the browser

```


### 使用到的技术

- webpack + ES6:  你当然也可以替换为别的模块系统. 
- fetch:  用来处理异步请求
- puer:  前端开发服务器 ： 静态 + mock接口等


### 命令介绍

__在`/routing`根目录下__ 

如果npm 无法运行， 请配置为淘宝的源`https://registry.npm.taobao.org`, 或者直接使用[`cnpm`](http://cnpmjs.org/)代替`npm`


### `npm install` : 安装所有依赖(注意第一次安装可能时间较长)


### `npm start`

开启模拟服务器， 并且开启webpack. 




## NEJ

直接进入NEJ文件夹, 并开启一个静态服务器(加载html资源是使用的ajax), 建议使用[puer](https://github.com/leeluolee/puer)


代码范例

```

define(['text!./login.html', 'pro/regularjs/dist/regular'] ,function( tpl ){

  // 注意Regular是全局取的，而不是注入的
  return Regular.extend({

    name: 'login-nej',

    template: tpl
    
  })


})
```

打包不会有任何区别.





