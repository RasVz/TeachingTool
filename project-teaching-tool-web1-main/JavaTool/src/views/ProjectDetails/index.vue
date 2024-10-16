<template>
    <div class="homeLayout">
      <a-layout>
        <!-- 头部 -->
        <a-layout-header class="head">
  
          <Head />
        </a-layout-header>
  
        <a-layout style="height: 90vh">
          <a-layout-sider  breakpoint="lg" collapsed-width="60"  theme="light">
            <Sider :number="1"/>
          </a-layout-sider>
  
          <a-layout>
            <a-layout-content class="content">
              <router-view v-slot="{ Component }">
                <transition name="fade-transform" >
                  <component :is="Component" :key="key" />
                </transition>
              
              </router-view>
            </a-layout-content>
          </a-layout>
  
        </a-layout>
      </a-layout>
    </div>
  </template>
  
  <script lang="ts" setup>
  import Head from '@/layout/Head.vue';
  import Sider from '@/layout/Sider.vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  
  const route = useRoute();
  const key = computed(() => {
    
    return route.path;
  });
  
  </script>
  <style scoped>
  .homeLayout {
    background-color: rgb(242, 247, 250);
    height: 100%;
    width: 100%;
    overflow-y: auto;
    /* 或者 auto，取决于你的需求 */
    -ms-overflow-style: none;
    /* IE 和 Edge */
    scrollbar-width: none;
    /* Firefox */
    &::-webkit-scrollbar {
      display: none;
      /* Chrome, Safari, Opera */
    }
  }
  
  .head {
    height: 10%;
    min-height: 10%;
    max-height: 10%;
    background: #fff;
    padding: 0;
    margin: 1px;
  }
  .content {
    height: 90%;
    background: rgb(242, 247, 250);
  
  }
  /* 切换动画 */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.3s;
  }
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  
  ::-webkit-scrollbar {
    width: 5px;
    /* 滚动条的宽度 */
    height: 5px;
    /* 对于水平滚动条 */
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    /* 滚动条滑块的颜色 */
    border-radius: 10px;
    /* 滑块边角圆滑度 */
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* 滚动条轨道的颜色 */
    border-radius: 10px;
    /* 轨道边角圆滑度 */
  }
  
  
  
  
  </style>