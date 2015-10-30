
import {LoginAMD} from './login-amd.js';
import {LoginBabel} from './login-babel.js';
import {LoginCommon} from './login-commonjs.js';
import Regular from 'regularjs';



// we use es2015 template-string to hold template .
new Regular({
  template: `
    <login-amd title='Login AMD' />
    <login-babel title='Login Babel' />
    <login-common title='Login Common' />
  `
}).$inject('#app')