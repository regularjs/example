

const restate = require('regular-state');
const Login = require('./module/login');
const Regular= require('regularjs');
const routes = require('./routes');
const dom = require('./util/dom');
require('./util/extension');


// 第一种: 直接从组件启动
if(location.pathname === '/login'){

  new Login({ }).$inject('#app');

}else{
  // 第二种，即配置单页路由
  const router = restate({ routes:routes });
  router.start({ 
    html5: true, 
    view: dom.find('#app')
  });
}





