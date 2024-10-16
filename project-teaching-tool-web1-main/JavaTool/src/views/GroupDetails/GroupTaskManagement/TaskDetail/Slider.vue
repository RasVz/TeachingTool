<template>
  <aside class="task-sidebar">
    <div class="task-details">
      <div class="detail-item">
        <span class="task-name">{{ task.name }}</span>
      </div>
      <div class="detail-item">
        <span class="label">任务负责人:</span>
        <span class="value">{{ task.assignee }}</span>
      </div>
      <div class="detail-item">
        <span class="label">所属项目:</span>
        <span class="value">{{ task.project }}</span>
      </div>
      <div class="detail-item">
        <span class="label">开始时间:</span>
        <span class="value">{{ formatDate(task.startTime) }}</span>
      </div>
      <div class="detail-item">
        <span class="label">结束时间:</span>
        <span class="value">{{ formatDate(task.endTime) }}</span>
      </div>
      <div class="detail-item">
        <span class="label">任务描述:</span>
        <div class="description-box">
          <span class="value">{{ task.description }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const task = ref({
  name: '开发新功能',
  description:
    '开发新的用户登录功能。这里是详细的任务描述，它可能很长，所以需要限制它的大小。这里是详细的任务描述，它可能很长，所以需要限制它的大小。这里是详细的任务描述，它可能很长，所以需要限制它的大小。这里是详细的任务描述，它可能很长，所以需要限制它的大小。这里是详细的任务描述，它可能很长，所以需要限制它的大小。这里是详细的任务描述，它可能很长，所以需要限制它的大小。',
  startTime: new Date(2024, 8, 15), // 2024年9月15日
  endTime: new Date(2024, 9, 30), // 2024年10月30日
  assignee: '张三',
  project: '用户管理系统'
});

const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN');
};
</script>

<style scoped>
.task-sidebar {
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
}

.task-details {
  display: flex;
  flex-direction: column;
}

.detail-item {
  margin-bottom: 20px;
  border-radius: 8px;
}

.label {
  font-weight: 500;
  color: #555;
}

.task-name {
  font-weight: 700;
  font-size: 1.5rem;
  color: #000;
  text-align: center;
  display: block;
  margin-bottom: 16px;
}

.value {
  color: #111;
  margin-left: 8px;
  display: inline-block;
  word-break: break-word;
}

.description-box {
  border: 1px solid #afdaeb;
  border-radius: 8px;
  padding: 12px;
  background-color: #f9f9f9;
  max-width: 100%;
  max-height: 30vh;
  overflow-y: auto;
  line-height: 2;
  margin-top: 12px;
}
</style>
