<template>
  <div class="container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <Slider />
    </div>

    <!-- 右侧区域 -->
    <div class="right-panel">
      <div class="top-component">
        <TaskResult />
      </div>
      <div class="bottom-component">
        <GroupMember />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskResult from './TaskResult.vue';
import Slider from './Slider.vue';
import GroupMember from './GroupMember.vue';
</script>

<style scoped>
.container {
  height: 96%;
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
}

.sidebar {
  flex: 1;
  margin: 1%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto; /* 添加滚动条 */
}

.right-panel {
  flex: 3;
  display: flex;
  flex-direction: column;
  margin: 1%;
  overflow: auto; /* 添加滚动条 */
}

.top-component,
.bottom-component {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 10px; /* 让 top-component 和 bottom-component 之间有间距 */
}

.top-component {
  flex: 1.5;
}

.bottom-component {
  flex: 1;
  margin-bottom: 0; /* 移除底部组件的底部间距 */
  overflow: hidden; /* 确保不会有溢出 */
}
</style>
