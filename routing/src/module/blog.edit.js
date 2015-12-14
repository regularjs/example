import Regular from 'regularjs';
import {blog} from '../util/fetch.js';

const tpl = `
<h2>{$param.id=='-1'?'Add':'Edit'} Post</h2>
<div class="row">
  <div class="col-md-10">
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" r-model={title} placeholder="Enter Title">
      </div>
      <div class="form-group">
        <label for="content">Tag</label>
        <div>
         {#list tags as tag by tag_index}
         <span class="label label-info">{tag} <i class='glyphicon glyphicon-remove' on-click={tags.splice(tag_index, 1)}></i></span>
         {/list}
         <input r-model={tagContent} placeholder="Enter Tag" on-enter={this.addTag(tagContent)} >
        </div>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea r-model={content} placeholder="Blog Content" class="form-control" rows=10 ></textarea>
      </div>
       <a class="btn btn-primary" on-click={this.submit( id )}>Submit</a>
    </form>
  </div>
</div>
`;




export default Regular.extend({

  template: tpl,

  submit ( id ){
      let data = this.data;
      id= parseInt(id);
      let detail = {
        content: data.content,
        title: data.title,
        tags: data.tags
      }

      if(id == "-1"){ //add
        blog.add( detail ).then( ()=>{
          this.$state.go("app.blog.list");
        })
      }else{
        blog.update(id, detail ).then( () =>{
          this.$state.go("app.blog.detail", {param: {id: id}});
        })
      }
    },
    enter( option ){
      this.update(option);
    },

    update( option ){
      let data = this.data;

      let id = data.id = option.param.id;
      data.title = '';
      data.content = '';
      data.tags = [];
      if(!id || id === '-1') return;
      blog.get( id ).then( (blog) =>{
        data.title = blog.title;
        data.content = blog.content;
        data.tags = blog.tags || [];
        this.$update();
      })

    },
    addTag(){
      let data = this.data;
      if(!data.tagContent) return;
      data.tags.push(data.tagContent);
      data.tagContent = '';
    }
   
  })
