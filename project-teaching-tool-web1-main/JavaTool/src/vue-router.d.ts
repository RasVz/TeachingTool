import { RouteMeta } from 'vue-router';  
 
declare module 'vue-router' {  
  // 扩展 Vue Router 的 RouteMeta 接口  
  interface RouteMeta {  
    icon?: string; // 允许 icon 为 string 或 undefined  
    fullpath?:string;
  }  
}