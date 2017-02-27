var dom = require('../util/dom');
var Regular = require('regularjs');


var tpl = require('./modal.html')


function getPosition(elem, center) {
  var win = window;
  var doc = elem && elem.ownerDocument,
      docElem = doc.documentElement,
      body = doc.body,
      box = elem.getBoundingClientRect ? elem.getBoundingClientRect() : { top: 0, left: 0 },
      clientTop = docElem.clientTop || body.clientTop || 0,
      clientLeft = docElem.clientLeft || body.clientLeft || 0,
      scrollTop = win.pageYOffset || docElem.scrollTop,
      scrollLeft = win.pageXOffset || docElem.scrollLeft;

  return {
    top: box.top + scrollTop - clientTop + (center && box.height? box.height / 2  : 0),
    left: box.left + scrollLeft - clientLeft + (center && box.width? box.width / 2 : 0),
  };
}

function setVendorStyle(element, property, value){
    var propertyChanged = property.replace(/^\w/, function(a){
        return a.toUpperCase();
    })
    
    element.style['Webkit' + propertyChanged] = value;
    element.style['Moz' + propertyChanged] = value;
    element.style['Ms' + propertyChanged] = value;
    element.style['O' + propertyChanged] = value;
    element.style[ property] = value;
}


/**
 * options: 
 *   - autoRecycleRequest : 是否自动回收弹窗开始以后的请求
 */

var Modal  = Regular.extend({
  name: 'modal',
  template: tpl,

  init: function(){
    var data = this.data;
    var modal = this.$refs.modal;
    // 处理
    // 动画开始位置
    var showAt = data.showAt

    if(showAt){

      if( showAt.nodeType === 1){ //证明传入的是节点

        var position = getPosition(showAt, true);

        showAt = {
          x: position.left,
          y: position.top
        }
      }

      if( showAt.x && showAt.y ){
        setVendorStyle(modal, 'transformOrigin', '' + parseInt(showAt.x, 10) + 'px ' + parseInt(showAt.y, 10) + 'px')
      }

    }


    var self = this;
    dom.on(document, 'keyup', cancel)

    function cancel(ev){
      if(ev.which === 27){ //ESC
        self.destroy();
      }
    }

    this.$on('$destroy', function(){
      dom.off(document, 'keyup', cancel)
    }) //ESC

    this.$watch('!!show', function( show ){
      var body = data.container || document.body
      this.$inject(show? body : false);
    })


    // this._bindDragEvent();

  },
  confirm: function(accept){
    var data = this.data;
    this.$emit('confirm', {accept: accept})
    var body = data.container || document.body

    if(data.autoClose){
      data.show = false;
      this.destroy();
    }
  },
  show: function(){
    this.$update('show', true)    
    return this;
  },
  hide: function(){
    this.$update('show', false)    
  }
  // 
});

['Head', 'Body', 'Foot'].forEach(function( name ){
  var lname = name.toLowerCase();
  Modal[name] = Regular.extend({
    name: 'modal.' + lname,

    init: function(){
      // this.$outer point to modal
      this.$outer.data[lname] = this.$body;
    }
  })
})


module.exports = Modal;


