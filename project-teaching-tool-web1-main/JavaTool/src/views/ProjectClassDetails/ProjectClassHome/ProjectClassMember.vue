<template>
  <div class="chart-container" style="border-radius: 8px 8px 0 0; height: 100%;">
    <div class="ant-table-title">
      项目班成员
    </div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="输入成员名称进行搜索">
      <button @click="search" class="search-button">搜索</button>
    </div>
    <div class="team-members-panel">
      <ul style="height: 300px; overflow-y: auto;">
        <li v-for="member in filteredMembers" :key="member.id">
          <SvgIcon name="user" />
          {{ member.name }}
        </li>
        <li v-if="filteredMembers.length === 0" class="no-results">
          没有找到匹配的成员
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const members = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
  { id: 5, name: '钱七' },
  { id: 6, name: '孙八' },
  { id: 7, name: '王九' },
]);

const searchQuery = ref('');

const filteredMembers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    return members.value;
  } else {
    return members.value.filter(member =>
      member.name.toLowerCase().includes(query)
    );
  }
});

const search = () => {
  // 搜索逻辑可以根据需要进行扩展
};

</script>

<style scoped>
.team-members-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  box-sizing: border-box;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
}

.search-bar input {
  flex: 1;
  /* 让输入框填满剩余空间 */
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.search-bar .search-button {
  padding: 8px 12px;
  margin-left: 8px;
  /* 间距调整 */
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.search-bar .search-button:hover {
  background-color: #0056b3;
}

.team-members-panel h2 {
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.team-members-panel ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.team-members-panel li {
  padding: 12px 16px;
  border-radius: 8px;
  background: #f9f9f9;
  margin-bottom: 12px;
  transition: background-color 0.3s ease, transform 0.3s ease;
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

.chart-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: none;
}

.ant-table-title {
  position: relative;
  /* Ensure it stays within its container */
  background-color: #6496b8;
  /* Background color */
  color: #ffffff;
  /* Text color */
  padding: 8px 16px;
  /* Padding */
  font-size: large;
  /* Font size */
  margin: -10px -16px 10px -16px;
  /* Adjust margins to extend background */
  box-sizing: border-box;
  /* Ensure padding is included in width */
  border-bottom: 1px solid #f0f0f0;
  /* Border bottom */
  text-align: center;
}
</style>
