import Regular from 'regularjs';

const tpl = `
<ul class="nav nav-sidebar">
  {#list menus as menu}
    <li class={state.is(menu.state)?'active':''}><a href="#!{menu.url}">{menu.name}</a></li>
  {/list}
</ul>
`


const Menu = Regular.extend({
  name: 'app-menu',
  template: tpl,

  config: function(data){
    // 确保在每次state改变后Menu会重新update
    data.state.on("end", () => this.$update() )
  }
})

export default Menu;

