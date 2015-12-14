import Regular from 'regularjs';

const tpl = `
<h1 class="page-header">Blog</h1>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li  class={ this.$state.is("app.blog.list")? 'active':'' }>
          <a href={'app.blog.list'|encode}>List</a>
        </li>
        <li  class={ this.$state.is("app.blog.detail")? 'active':'' }>
          <a href="javascript:;">Detail</a>
        </li>
        <li  class={ this.$state.is("app.blog.edit")? 'active':'' }>
          <a href={'app.blog.edit'|encode: {id: -1}}>Edit</a>
        </li>
      </ul>
    </div>
    </div>
</nav>
<menu state={$state} menu={menus} ></menu>
<div class="col-sm-12" ref=view></div>
`


export default Regular.extend({

  template: tpl,

  config (){
    this.$state.on("end", this.$update.bind(this,null));
  }
})