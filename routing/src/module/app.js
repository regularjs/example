import Regular from 'regularjs';
import fetch from 'whatwg-fetch';
import Menu from '../components/menu.js';


let tpl = `
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <span class="navbar-brand" href="#">theme from <a href="http://getbootstrap.com/examples/dashboard/">[bootstrap]</a> </span>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        {#if !this.$state.user}
        <form class="navbar-form navbar-right">
          <input type="text" class="form-control" placeholder="User name" r-model='username'>
          <input type="text" class="form-control" placeholder="Password..." r-model='password'>
          <a href="javascript:;"class="btn btn-primary" on-click={this.login(username, password)}>login</a>
        </form>
        {#else}
        <div class="navbar-brand navbar-right">Welcome, {this.$state.user.name} <a href="#" class='btn btn-primary' on-click={this.logout()}>logout</a></div>
        {/if}
      </div>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3 col-md-2 sidebar">
        <app-menu menus={menus} state={@(this.$state)}></app-menu>
      </div>
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" >
        <div ref=view></div>
        <footer>
          <p>© Company 2014</p>
        </footer>
      </div>
    </div>
  </div>`;



export default  Regular.extend({

    template: tpl,

    config (data) {
      data.menus = [
        {url: '/',name: "Home", state: "app.index" },
        {url: '/blog', name: "Blog", state: 'app.blog'},
        {url: '/chat', name: "Chat", state: 'app.chat'}
      ]
    },
    login (username, password){
      // tip: this.$state can be touched in any module
      this.$state.user = {
        name: username,
        id: -1,
        avatar: "https://avatars1.githubusercontent.com/u/731333?v=3&s=460"
      }

      try{
        localStorage.setItem("username", username);
      }catch(e){}
      

      return false;
    },
    logout (){

      this.$state.user = null;
      this.$state.go("app.index");
      try{
        localStorage.setItem("username", "");
      }catch(e){}
      return false;

    }
  })