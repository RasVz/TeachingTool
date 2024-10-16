<template>
  <div class="announcement-container">
    <div class="announcement-title">
      <h3 >项目班动态</h3>
    </div>
    <div class="announcement-list">
      <div class="announcement-item" v-for="(dynamic, index) in dynamics" :key="index">
        <p class="group-info">{{ dynamic.group }}</p>
        <p>{{ dynamic.member }} {{ dynamic.content }}</p>
        <span class="time">{{ dynamic.time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dynamics = ref([
  { member: '张三', time: '2小时前', content: '完成了原型设计。', group: '小组一' },
  { member: '李四', time: '1天前', content: '将新功能部署到生产环境。', group: '小组二' },
  { member: '王五', time: '1周前', content: '向利益相关者展示了项目更新。', group: '小组一' },
  { member: '赵六', time: '2周前', content: '开始优化后端性能。', group: '小组二' },
  { member: '钱七', time: '3周前', content: '参与了客户会议并提出了新的功能需求。', group: '小组一' },
  { member: '孙八', time: '4周前', content: '完成了前端重构工作。', group: '小组二' }
]);
</script>

<style scoped>
.announcement-container {
  background-color: #ffffff;
  border-radius: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
}

.announcement-title {
  background-color: #30aa6b; /* 橙色背景 */
  padding: 5px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
}

.announcement-title h3 {
  margin: 0;
  font-size: 1rem;
  color: #fff; /* 白色字体 */
}

.announcement-list {
  padding: 0;
  max-height: 45vh; /* 限制高度并启用滚动 */
  overflow-y: auto;
}

.announcement-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.announcement-item:last-child {
  border-bottom: none;
}

.announcement-item:hover {
  background-color: #f5f5f5;
}

.announcement-item p {
  margin: 5px 0;
  font-size: 0.9em; /* 调整字体大小 */
}

.time {
  display: block;
  font-size: 0.75em; /* 调整字体大小 */
  color: #888888;
}

.group-info {
  font-size: 0.8em;
  color: #666666;
  margin-top: 5px; /* 添加顶部间距 */
}

</style>
