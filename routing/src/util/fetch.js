
import Progress from '../components/progress.js';
import 'whatwg-fetch';
import _ from './helper.js'


let fetchBase = window.fetch;

let progress;

/**
 * 建议所有的产品都为xhr设置一个统一入口， 方便加上统一逻辑. 
 */
function fetch(url, opt = {}){

  if(!progress) progress = new Progress;

  opt.method = opt.method || 'GET';



  // 1. 根据规范， 我们fix一些参数
  let queryString;
  if(opt.data) {
    if(/GET|HEAD/.test(opt.method)){
      url = `${url}?${_.obj2query(opt.data)}`;
    }else{

    opt.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    opt.body = JSON.stringify( opt.data );

    }
  }


  let indicator;

  if(opt.noProgress !== false) {
    indicator = progress;
    indicator.start();
  }

  return fetchBase(url, opt).then(function( ret ){

    indicator && indicator.end();
    return ret.json()

  }).catch(function( err ){

    indicator && indicator.end(true);
    throw err

  })


}

const blog = {

  fetchList( page ){

    page = parseInt(page) - 1;


    return fetch( '/api/blogs', {
      data : {
        limit: 20,
        offset: page * 20
      }
    })
  },

  get(id){
    return fetch(`/api/blogs/${id}`)  
  },

  update(id, blog){
    return fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      data: blog
    })  
  },


  add( blog ){

    return fetch(`/api/blogs`, {
      method: 'POST',
      data: blog
    })  
  },

  remove( id ){
    return fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    })  
  }

}

const user = {

  login: function(){
    return fetch('/api/user/login')
  },
  logout: function(){
    return fetch('/api/user/logout')
  }
}

const chat = {
  fetchList(){
    return fetch('/api/chat')
  },
  remove(id){
    return fetch(`/api/chat/${id}`, {
      method: 'DELETE'
    })
  }
}

export {fetch, blog, user, chat};




