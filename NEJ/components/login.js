
define(['text!./login.html', 'pro/regularjs/dist/regular'] ,function( tpl ){

  // 注意Regular是全局取的，而不是注入的
  return Regular.extend({

    name: 'login-nej',

    template: tpl
    
  })


})