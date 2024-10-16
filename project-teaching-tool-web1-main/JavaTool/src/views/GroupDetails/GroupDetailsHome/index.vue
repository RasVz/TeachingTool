<template>
  <div class="content">
    <div class="middle-components">
      <div class="middle-top">
        <a-card class="middle-card1">
          <GroupAnnounce />
        </a-card>
        <a-card class="middle-card1">
          <GroupDynamics />
        </a-card>
      </div>
      <a-card class="middle-card2">
        <TaskList />
      </a-card>
    </div>

    <div class="right-components">
      <a-card class="right-card1">
        <DocumentList />
      </a-card>
      <a-card class="right-card2">
        <GroupMember />
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocumentList from './DocumentList.vue';
import GroupAnnounce from './GroupAnnounce.vue';
import GroupDynamics from './GroupDynamics.vue';
import GroupMember from './GroupMember.vue';
import TaskList from './TaskList.vue';
</script>

<style scoped>
.content {
  height: 96%;
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
}

.middle-components {
  background: #f0f2f5;
  padding: 16px;
  flex: 2.5; /* 中间区域占据整个主要内容区域的 2.5/6 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 内部内容以列的方式布局 */
}

.middle-top {
  display: flex; /* 使用 flex 布局 */
  gap: 16px; /* 设置卡片之间的间隔 */
  flex: 1; /* 卡片整体占据中间区域的所有空间 */
  margin-bottom: 16px;
}

.middle-card1 {
  flex: 2; /* 第一个卡片占据中间卡片区域的 2/3 */
  max-height: 100%; /* 卡片高度最大为当前父容器高度 */
}
.middle-card2 {
  margin-bottom: 20px;
}

.right-components {
  background: #f0f2f5;
  padding: 16px;
  flex: 1; /* 右侧区域占据整个主要内容区域的 1/4 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 内部内容以列的方式布局 */
}

.right-card1 {
  top: 20px; /* 设置顶部距离，使其向下移动 */
  margin-bottom: 16px;
  bottom: 48.3%; /* 设置底部到父容器的中点 */
  border-radius: 10px; /* 边框圆角为 10 像素 */
  background: #ffffff; /* 背景颜色为白色 */
}

.right-card2 {
  flex: 1; /* 第二个卡片占据中间卡片区域的 1/3 */
  margin-top: 16px; /* 顶部间距为 16 像素 */
  margin-bottom: 20px;
  padding-top: 5px;
}
</style>
