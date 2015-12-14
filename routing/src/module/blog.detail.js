import Regular from 'regularjs';
import {blog} from '../util/fetch.js';
import _ from '../util/helper.js';

const tpl = `
<div class="blog-post">
  <h2 class="blog-post-title">{title}
    <span class="badge">preview</span>
    <a href={'app.blog.edit'|encode: {id: id} }>Edit</a>
  </h2>

  <div class="form-group">
  <label for="content">Tag</label>
  <div>
   {#list tags as tag by tag_index}
   <span class="label label-info">{tag}</span>
   {/list}
  </div>
  </div>
  <div class="blog-post-meta">
    {time|format}
    <a href='javascript:;'>{user.name}</a>
    <div class="content" r-html='content'></div>
  </div>
</div>
`;


export default Regular.extend({

  template: tpl,
  enter (option){
    this.update(option);
  },
  update (option){
    let data = this.data;
    let id = data.id = parseInt(option.param.id);

    blog.get(id).then( detail =>{
      data.blog = detail;
      _.extend(data, detail, true);
      this.$update();
    })
  }
})