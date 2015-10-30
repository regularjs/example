
define(function(require, exports){

  var tpl = require('./login.rgl');
  var Regular = require('regularjs');

  exports.LoginAMD = Regular.extend({
    name: 'login-amd',
    template: tpl
  })

})