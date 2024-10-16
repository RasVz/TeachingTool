import user from './modules/user'
import permission from './modules/permission'
import course from './modules/course'
import {getters} from './getters'


import { createStore } from 'vuex';  

  
export default createStore({  
  state:{
  
  },
  mutations:{
   
  },
  modules: {  
    user,
    permission,
    course,  
  },
  getters
});


