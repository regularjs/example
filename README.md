# Regular Example Collection


1. [webpack](#webpack)
2. [NEJ](#NEJ)
3. [browserify](#browserify)


<a name="webpack"></a>
## Webpack

Use [Regular](https://github.com/regularjs/regular) with [webpack](http://webpack.github.io)

```shell

$ cd webpack
$ npm install
$ webpack -w 

```

Then open the `webpack/index.html`. 


<a name="browserify"></a>
## Browserify


Use [Regular](https://github.com/regularjs/regular) with [webpack](http://webpack.github.io)




<a name="NEJ"></a>
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