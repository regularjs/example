

const blogService = require('../service/blog');
const Regular = require('regularjs');

const tpl = `
<h2>{$param.id=='-1'?'Add':'Edit'} Post</h2>
<div class='row'>
  <div class="col-md-10">
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" r-model={blog.title} placeholder="Enter Title">
      </div>
      <div class="form-group">
        <label for="content">Tag</label>
        <div>
         {#list blog.tags as tag by tag_index}
         <span class="label label-info">{tag} <i class='glyphicon glyphicon-remove' on-click={blog.tags.splice(tag_index, 1)}></i></span>
         {/list}
         <input r-model={tagContent} placeholder="Enter Tag" on-enter={this.addTag(tagContent)} >
        </div>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea r-model={blog.content} placeholder="Blog Content" class="form-control" rows=10 ></textarea>
      </div>
       <a class="btn btn-primary" on-click={this.submit( id )}>Submit</a>
    </form>
  </div>
</div>
`;



module.exports =  Regular.extend({

  template: tpl,


  mount (option){
    let data = this.data;
    let id = data.id = parseInt(option.param.id);
    if(id == -1) {
      data.blog = {
        tags:[]
      };
      return ;
    }


    return blogService.get(id).then( detail =>{
      data.blog = detail;
    })
  },


  submit ( id ){
      let data = this.data;
      id= parseInt(id);
      let detail = data.blog;

      if(id == '-1'){ //add
        blogService.add( detail ).then( ()=>{
          this.$state.go('app.blog.list');
        })
      }else{
        blogService.update(id, detail ).then( () =>{
          this.$state.go('app.blog.detail', {param: {id: id}});
        })
      }
    },
    addTag(){
      const data = this.data;
      if(!data.tagContent) return;
      data.blog.tags.push(data.tagContent);
      data.tagContent = '';
    }
   
  })
