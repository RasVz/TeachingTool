<template>
  <div>
    <h3>小组成员</h3>
    <div class="team-members-panel">
      <ul>
        <li v-for="member in members" :key="member.id">
          <SvgIcon name="user" :color="getIconColor(member.role)" />
          {{ member.name }} - {{ member.role }}
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script setup lang="ts">
const members = [
  { id: 1, name: '张三', role: '组长' },
  { id: 2, name: '李四', role: '成员' },
  { id: 3, name: '王五', role: '成员' },
  { id: 4, name: '赵六', role: '成员' },
  { id: 5, name: '钱七', role: '成员' },
  { id: 6, name: '孙八', role: '成员' },
  { id: 7, name: '王九', role: '成员' }
];
function getIconColor(role) {
  // 根据角色返回相应的图标颜色
  return role === '组长' ? 'black' : 'grey';
}
</script>
  
<style scoped>
/* Ensure the parent container (right-card2) has a set height */
.right-card2 {
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure it takes full height */
}

h3 {
  font-size: 1rem; /* 增加字号 */
  color: white; /* 使用深色字体 */
  margin-bottom: 12px; /* 增加标题与内容之间的距离 */
  background-color: #5c386f; /* 深色背景 */
  padding: 5px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
}

.team-members-panel {
  background-color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid #e1e1e1;
  overflow-y: auto; /* 使内容可滚动 */
  flex: 1; /* Ensure it takes up available space */
  padding: 0 16px; /* Add some padding */
}

.team-members-panel ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.team-members-panel li {
  padding: 12px 0; /* Adjust padding for better spacing */
  background: #f9f9f9;
  margin-bottom: 12px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 13px;
  display: flex; /* Ensure content aligns properly */
  align-items: center; /* Center items vertically */
}

.team-members-panel li:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.team-members-panel li:last-child {
  margin-bottom: 0;
}

.team-members-panel .no-results {
  padding: 12px 16px;
  border-radius: 8px;
  background: #f9f9f9;
  color: #999999;
  text-align: center;
}
</style>
