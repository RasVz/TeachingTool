<template>
  <div class="team-details">
    <h2>{{ teamName }}</h2>
    <p><strong>所属项目班:</strong>
    <div class="detail">{{ projectClass }}</div>
    </p>
    <p><strong>所属项目:</strong>
    <div class="detail">{{ projectName }}</div>
    </p>
    <p><strong>负责老师:</strong>
    <div class="detail">{{ teacher }}</div>
    </p>
  </div>
  <div>
    <GroupMenu />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GroupMenu from './GroupMenu.vue';
const teamName = ref('小组名称');
const projectClass = ref('2023届软件工程');
const projectName = ref('在线教育平台、淘宝模拟系统');
const teacher = ref('张老师');
</script>

<style scoped>
.team-details {
  margin: 30px;
}

.detail {
  text-align: center;
  margin-top: 8px;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  /* 使用深色字体 */
  font-weight: 600;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  /* 添加阴影效果 */
}

p {
  font-size: 1.3em;
  color: #34495e;
  margin: 12px 0;
}

strong {
  color: #2c3e50;
  font-weight: 600;
}
</style>
