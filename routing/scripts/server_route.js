

var random = function(min, max){
  return Math.floor(Math.random() * ( max - min + 1 )) + min;
}


// mock data
i = 0;
var users = []
while( (i++) < 100 ) {
  users.push({
    id: ''+i,
    name: "user " + i,
    email: random(10, 30) + "@163.com" ,
    avatar: "http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d10"
  })
}


i = 0;
var blogs = []
while( (i++) < 108 ) {
  blogs.push({
    id: ''+i,
    title: "post " + i,
    content: new Array(100).join(" post " + i + " content "),
    user: users[random(0, 99)],
    tags: ['tag1'],
    time: +new Date()
  })
}


module.exports = {
  'GET /api/blogs/:id': function(req, res){
    var id = req.params.id;
    var found = false;
    blogs.some(function(blog){
      if (blog.id === id) found = blog;
    })
    res.send(found? found: 404);
  },
  'DELETE /api/blogs/:id': function(req, res){
    var id = req.params.id;
    var foundIndex = -1;
    blogs.some(function(blog, index){
      if (blog.id === id) foundIndex = index;
    })
    if(~foundIndex) blogs.splice(foundIndex, 1);
    res.send({}, 200);
  },
  'PUT /api/blogs/:id': function(req, res){
    var id = req.params.id;
    var found = false;
    var body = req.body;
    blogs.some(function(blog){
      if (blog.id === id) found = blog;
    })
    if(found){
      found.content = body.content;
      found.title = body.title;
      found.tags = body.tags;
      found.time = +new Date;
    }
    setTimeout(function(){
      res.send(found? found: 404);
    },random(1000, 3000))
    
  },
  'GET /api/blogs': function(req, res){
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    setTimeout(function(){
      res.send({
        total: blogs.length,
        blogs: blogs.slice(offset, offset+limit)
      }) 
    }, random(100, 300)) // 认为创造延迟
  },
  'POST /api/blogs': function(req, res){
    var body = req.body;
    i++;
    var blog = {
      id: ''+i,
      title: body.title,
      content: body.content,
      user: users[random(0, 99)],
      tags: body.tags ,
      time: +new Date()
    }
    blogs.unshift(blog)
    setTimeout(function(){
      res.send(body);
    },random(1000, 3000))
    
  },


  // all page will be redirect to single html to make html5 mode work
  'GET /(user|chat|blog)(.*)': '../index.html',
  'GET /': '../index.html'
}