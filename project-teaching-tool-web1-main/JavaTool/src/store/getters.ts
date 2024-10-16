export let getters = {
  roles: state => state.user.roles,  
  permission_routes: state => state.permission.routes,  
  collapsed: state => state.collapsed,  
  courseId: state => state.course.courseId,  
  projects: state =>state.course.project,
  teachingClasss:state =>state.course.teachingClass,
  }
 