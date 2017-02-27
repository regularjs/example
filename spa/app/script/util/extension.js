// 做一些全局的shim，以及Regular本身的扩展

var Regular = require('regularjs');
var dom = Regular.dom;



var keys = Object.keys || function(obj){
  var ret = [];
  for(var i in obj) {
    ret.push(i)
  }
  return ret;
}


// 如果需要就把

let filters = (function (){
  // dateformat util
  const fmap = {
    'yyyy': function(date){
      return date.getFullYear()
    },
    'MM': function(date){
      return fix(date.getMonth() + 1); 
    },
    'dd': function(date){ 
      return fix(date.getDate()) 
    },
    'HH': function(date){ 
      return fix(date.getHours()) 
    },
    'mm': function(date){ 
      return fix(date.getMinutes())
    }
  }
  const trunk = new RegExp(keys(fmap).join('|'),'g');
  function fix(str){
    str = '' + (str || '');
    return str.length <= 1? '0' + str : str;
  }

  return {
    // fomat date
    // ------------------
    // example: 
    // {1449737531544|format: 'yyyy年MM月dd日'}
    format ( value, format ){

      format = format || 'yyyy-MM-dd HH:mm';
      if(!value) return;
      value = new Date(value);

      return format.replace( trunk, (cap) => fmap[cap]? fmap[cap](value): '');

    }
  }
})();


Regular
  .filter( filters )
  .event({
    'enter': function(elem, fire){
      function update( ev ) {
        if ( ev.which === 13 ) {
          ev.preventDefault();
          fire(ev);
        }
      }

      dom.on( elem, 'keypress', update );
    }
  })
