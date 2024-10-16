<template>
    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 中间三个小组件 -->
      <div class="middle-components">
        <div class="middle-card">
          <a-card class="middle-cardone">
            <h3>{{ middleComponents[0].name }}</h3>
            <ProjectClassAnoun />
          </a-card>
          <a-card class="middle-cardone">
            <h3>{{ middleComponents[1].name }}</h3>
            <ProjectClassDynamic />
          </a-card>
        </div>
        <a-card class="middle-cardtwo">
          <h3>{{ middleComponents[2].name }}</h3>
          <ProjectClassTask />
        </a-card>
      </div>
      <!-- 右侧两个组件 -->
      <div class="right-components">
        <div class="right-pie">
          <h2>{{ rightComponentTitles[0].name }}</h2>
          <ProjectClassPie />
        </div>
        <a-card class="right-card">
          <ProjectClassMember />
        </a-card>
      </div>
    </div>
</template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import ProjectClassDynamic from './ProjectClassDynamic.vue';
  import ProjectClassPie from '@/components/ProjectChart/ProjectClassPie.vue';
  import ProjectClassMember from './ProjectClassMember.vue';
  import ProjectClassAnoun from './ProjectClassAnoun.vue';
  import ProjectClassTask from './ProjectClassTask.vue';

  const leftComponentTitles = ref([
      { key: 1, name: '' },
      { key: 2, name: '' },
      { key: 3, name: '导航栏' },
  ]);
  const middleComponents = ref([
      { key: 1, name: '' },
      { key: 2, name: '' },
      { key: 3, name: '' },
  ]);
  const rightComponentTitles = ref([
      { key: 1, name: '' },
      { key: 2, name: '' },
  ]);
  const router = useRouter();

  </script>

  <style scoped>

  .main-content {
  flex: 1; /* 主要内容区域占满 page-container 的剩余空间 */
  display: flex; /* 使用 flex 布局 */
  }

  .middle-components {
  background: #f0f2f5;
  padding: 16px;
  flex: 2.5; /* 中间区域占据整个主要内容区域的 2.5/6 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 内部内容以列的方式布局 */
  }

  .middle-card {
  display: flex; /* 使用 flex 布局 */
  gap: 16px; /* 设置卡片之间的间隔 */
  flex: 1; /* 卡片整体占据中间区域的所有空间 */
  }

  .middle-cardone {
  flex: 2; /* 第一个卡片占据中间卡片区域的 2/3 */
  max-height: 100%; /* 卡片高度最大为当前父容器高度 */
  }

  .middle-cardtwo {
  flex: 1; /* 第二个卡片占据中间卡片区域的 1/3 */
  margin-top: 16px; /* 顶部间距为 16 像素 */
  }

  .right-components {
  background: #f0f2f5;
  padding: 16px;
  flex: 1; /* 右侧区域占据整个主要内容区域的 1/4 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 内部内容以列的方式布局 */
  position: relative; /* 为绝对定位提供参考 */
  }

  .right-pie {
  position: absolute; /* 使用绝对定位 */
  left: 0; /* 对齐到父容器的左侧 */
  right: 0; /* 对齐到父容器的右侧 */
  top: 20px; /* 设置顶部距离，使其向下移动 */
  margin-bottom: 16px;
  bottom: 48.3%; /* 设置底部到父容器的中点 */
  border-radius: 10px; /* 边框圆角为 10 像素 */
  background: #ffffff; /* 背景颜色为白色 */
  }

  .right-card {
  position: absolute; /* 使用绝对定位 */
  left: 0; /* 对齐到父容器的左侧 */
  right: 0; /* 对齐到父容器的右侧 */
  bottom: 0; /* 底部对齐 */
  height: calc(50% - 48px); /* 设置高度为父容器的一半减去间距 */
  margin-bottom: 20px;
  padding-top: 5px;
  }
  </style>
  