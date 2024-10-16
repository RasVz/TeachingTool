import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import router from './router';
import '@/assets/iconfont/iconfont.js';
import { createApp } from 'vue';
import '@/permission';
import svgIcon from '@/components/svgIcon/index.vue';
// main.ts
import 'virtual:uno.css';
import 'dayjs/locale/zh-cn';
import store from './store';

//引入全局样式
// import './styles/main.scss';
const init = () => {
  createApp(App).component('svg-icon', svgIcon).use(Antd).use(router).use(store).mount('#app');
};

if (process.env.NODE_ENV === 'development') {
  // 本地开发需要等待全局变量初始化
  setTimeout(() => {
    init();
  }, 2000);
} else {
  console.log('初始化app');
  init();
}
