
const fetch = require('../util/fetch')

function getList( page ){

  page = parseInt(page) - 1;


  return fetch( '/api/blogs', {
    data : {
      limit: 20,
      offset: page * 20
    }
  })
}

function get( id ){
  return fetch(`/api/blogs/${id}`)  
}

function update(id, blog){
  return fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    data: blog
  })  
}


function add( blog ){

  return fetch('/api/blogs', {
    method: 'POST',
    data: blog
  })  
}

function remove( id ){
  return fetch(`/api/blogs/${id}`, {
    method: 'DELETE'
  })  
}


module.exports = { getList, get, update, remove, add }