
const Regular = require('regularjs');
const Pager = require('../components/pager.js');
const blogService = require('../service/blog');

const tpl = `
  <h2 class="sub-header">Bloging List <a  r-link='app.blog.edit({id:-1})' class='btn btn-primary'>(Add a blog)</a></h2>
<div class="table-responsive">

<pager total={total}  current={page} on-nav={this.refresh($event.page, true)}></pager>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>id</th>
        <th>author</th>
        <th>time</th>
        <th>title</th>
        <th>abstract</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {#list blogs as blog by blog_index}
      <tr on-click={activeIndex = blog_index} class={activeIndex === blog_index? 'active': 'disabled'}>
        <td>{blog.id}</td>
        <td>{blog.user.name}</td>
        <td>{blog.time|format}</td>
        <td>{blog.title}</td>
        <td>{blog.content.slice(0,30) + "..."}</td>
        <td>
        <div class="btn-group" role="group" aria-label="...">
          <a r-link='app.index()' class="btn btn-sm btn-default">edit</a>
          <a r-link='app.blog.detail({id: blog.id})'  class="btn btn-sm btn-default">view</a>
          <a href='#' on-click={this.remove(blog.id, blog_index)} class="btn btn-sm btn-danger">delete</a>
        </div>
      </td>
      </tr>
      {#else}
      <tr><td colspan=6>no blogs here</td></tr>
      {/list}
    </tbody>
  </table>
  <pager total={total} current={page} on-nav={this.refresh($event.page)}></pager>
</div>
`;

module.exports =  Regular.extend({

  template: tpl,

  mount( option ){

    let page = parseInt(option.param.page) || 1;
    const data = this.data;

    return blogService.getList( page || 1 ).then((res) => {
      data.blogs = res.blogs;
      data.total = Math.ceil(res.total / 20);
      data.current = page;
      // 异步获取的数据 ，在目前版本需要手动$update()
    }).catch((err) =>{
      throw err
    })

  },

 
  // get particular page
  refresh( page, redirect ){

    const data = this.data;

    return this.$state.go('app.blog.list', { param: {page: page} });
  },
  remove( id, index ){
    const data = this.data;

    return blogService.remove({id: id}).then( ()=> {
      data.blogs.splice( index,1 );
      this.$update(); // 由于是异步响应，所以需要主动update
    })
    return false
  }

})



