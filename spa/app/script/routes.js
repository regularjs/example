

var BlogDetail = require('./module/blog.detail');
var BlogList = require('./module/blog.list');
var BlogEdit = require('./module/blog.edit');
var Application = require('./module/app');
var Poster = require('./module/poster');
var Index = require('./module/index');
var Blog = require('./module/blog');
var Regular = require('regularjs');

module.exports = {
  'app': {
    url: '',
    view: Application
  },
  'app.index': {
    url: '',
    view:  Index
  },
  'app.blog': {
    view:  Blog,
  },
  'app.blog.edit': {
    url: ':id/edit',
    view:  BlogEdit,
  },
  'app.blog.detail': {
    url: ':id',
    view:  BlogDetail
  },
  'app.blog.list': {
    url: '',
    view:  BlogList
  },
  // lazy load Chat Module
  'app.chat': {
    view( option, resolve){
      require.ensure([], function(require){
        resolve(require('./module/chat.js'))
      })
      }
    }
}