import Regular from 'regularjs';
import Pager from '../components/pager.js';
import {blog} from '../util/fetch.js';

const tpl = `
  <h2 class="sub-header">Bloging List <a  href={'app.blog.edit'|encode: {id: -1}} class='btn btn-primary'>(Add a blog)</a></h2>
<div class="table-responsive">

<pager total={total} current={current} on-nav={this.refresh($event.page, true)}></pager>
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
      {#list blogs as blog}
      <tr>
        <td>{blog.id}</td>
        <td>{blog.user.name}</td>
        <td>{blog.time|format}</td>
        <td>{blog.title}</td>
        <td>{blog.content.slice(0,30) + "..."}</td>
        <td>
        <div class="btn-group" role="group" aria-label="...">
          <a href={'app.blog.edit'|encode: {id: blog.id} } class="btn btn-sm btn-default">edit</a>
          <a href={'app.blog.detail'|encode: {id: blog.id} } class="btn btn-sm btn-default">view</a>
          <a href='#' on-click={this.remove(blog.id, blog_index)} class="btn btn-sm btn-danger">delete</a>
        </div>
      </td>
      </tr>
      {#else}
      <tr><td colspan=6>no blogs here</td></tr>
      {/list}
    </tbody>
  </table>
  <pager total={total} current={current} on-nav={this.refresh($event.page, true)}></pager>
</div>
`;

export default Regular.extend({

  template: tpl,

  enter( option ){

    this.update(option);
  },
  update( option ){

    this.refresh(option.param.page || 1);

  },
  // get particular page
  refresh( page, redirect ){

    let data = this.data;

    if(redirect) return this.$state.go("app.blog.list", { param: {page: page} });

    blog.fetchList( page || 1 ).then((res) => {
      data.blogs = res.blogs;
      data.total = Math.ceil(res.total / 20);
      data.current = page;
      // 异步获取的数据 ，在目前版本需要手动$update()
      this.$update();
    }
    ).catch((err) =>{
      throw err
    })


    return false;
  },
  remove( id, index ){
    let data = this.data;

    blog.remove(id).then( ()=>{
      data.blogs.splice(index,1);
      this.$update();
    })
    
    
    
    return false; 
  }

})



