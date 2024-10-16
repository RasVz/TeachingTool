interface project {  
  projectId: number;  
  projectName: string;  

} 
interface teachingClass{
  classId: number;  
  classtName: string;  
}
export default  {
    namespaced: true,  
    
    state: () => ({  
      courseId:null,
      project:[],
      teachingClass:[],
    }),  
    
    mutations: {  
    SET_COURSEID: (state:any, courseId:number) => {  
        state.courseId = courseId;  
      },
      SET_PROJECT: (state:any,  project: project[]) => {  
        state.project = project;  
      },
      SET_TEACHINGCLASS: (state:any,  teachingClass: teachingClass[]) => {  
        state.teachingClass = teachingClass;  
      }        
    },  
    
    actions: {  
  
    },   

  
  };  
    
  