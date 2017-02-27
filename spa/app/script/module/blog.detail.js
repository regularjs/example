const Regular = require('regularjs');
const blogService = require('../service/blog');
const _ = require('../util/helper.js');

const tpl = `
<div class="blog-post">
  <h2 class="blog-post-title">{blog.title}
    <span class="badge">preview</span>
    <a r-link='app.blog.edit({id:id})' >Edit</a>
  </h2>

  <div class="form-group">
  <label for="content">Tag</label>
  <div>
   {#list blog.tags as tag by tag_index}
   <span class="label label-info">{tag}</span>
   {/list}
  </div>
  </div>
  <div class="blog-post-meta">
    {blog.time|format}
    <a href='javascript:;'>{blog.user.name}</a>
    <div class="content" r-html={blog.content} ></div>
  </div>
</div>
`;

module.exports = Regular.extend({

  template: tpl,
  mount (option){
    let data = this.data;
    let id = data.id = parseInt(option.param.id);

    return blogService.get(id).then( detail =>{
      data.blog = detail;
    })
  }
})