export default  {
  namespaced: true,  
  
  state: () => ({  
    name:"your name",
    avtor:"string",
    roles:[],
  }),  
  
  mutations: {  
    SET_ROLES: (state, roles) => {  
      state.roles = roles;  
    }  
  },  
  
  actions: {  
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        //后续改请求获取data
          const data  = {name:"张三",roles:[2],avatar:"" }
          if (!data) {
            reject('Verification failed.')
          }
  
          const { roles, name, avatar, } = data
  
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_ROLES', roles)
          resolve(data)
          
        })
     
    },
  },   
};  
  
