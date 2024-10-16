import router from './router';
import nProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { message } from 'ant-design-vue';


nProgress.configure({ showSpinner: false }); 

const whiteList = ['/']; 

const [messageApi, contextHolder] = message.useMessage();

router.beforeEach(async (to, from, next) => {  
  nProgress.start(); 
  try{
  }catch{
  }
    next();
})
router.afterEach(() => {
  // finish progress bar
  nProgress.done()
})
