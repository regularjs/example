
define(['./components/login.js'] ,function(Login){

  new Login({
    data: {
      title: "NEJ + regularjs DEMO"
    }
  }).$inject('#app');

})