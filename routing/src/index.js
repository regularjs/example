
import restate from 'regular-state';
import Regular from 'regularjs';

import Application from './module/app.js';
import Blog from './module/blog.js';
import Chat from './module/chat.js';
// if the module only perform as a layout, you can pass raw template
import Index from './module/index.html'; 
import User from './module/user.js';
import BlogDetail from './module/blog.detail.js';
import BlogList from './module/blog.list.js';
import BlogEdit from './module/blog.edit.js';

import filters from './util/filter.js';

let dom = Regular.dom;


Regular
  .filter( filters )
  .directive( {  } )
  .event({
    'enter': function(elem, fire){
      function update( ev ) {
        if ( ev.which === 13 ) {
          ev.preventDefault();
          fire(ev);
        }
      }
      dom.on( elem, "keypress", update );

      return function() {
        dom.off( elem, "keypress", update );
      }
    }
  })


// Start Stateman.

let stateman = restate({
  view: document.getElementById("#app"), 
  Component: Regular
});

  // store infomation in local storage
try{

    let username = localStorage.getItem("username");

    if(username) stateman.user = {name: username, id: -1}

}catch(e){}


stateman
  // application core
  .state("app", Application, "")

  // home page
  .state("app.index", Index, { url: ""}) // equal to ""

  // blog
  .state("app.blog", Blog)
  .state("app.blog.detail", BlogDetail, {url: ":id/detail" })
  .state("app.blog.list", BlogList, "")
  .state("app.blog.edit", BlogEdit, ":id/edit")

  //chat 
  .state("app.chat", Chat)

  // user
  .state("app.user", User, "user/:uid")

  // redirect when notfound
  .on("notfound", function(){
    this.go("app.index", {replace: true})
  })

  // authen, need login first
  .on("begin", function(option){
    if(option.current.name !== "app.index" && !this.user){
      option.stop();
      alert("You need Login first")
      this.go("app.index", {replace: true})
    } 
  })

  // start the application
  .start( { html5: true, root: '/', prefix: '!' } )



