
var tpl = require('./login.rgl');
var Regular = require('regularjs');

var LoginCommon = Regular.extend({

  name: 'login-common',
  
  template: tpl
})

exports.LoginCommon = LoginCommon

