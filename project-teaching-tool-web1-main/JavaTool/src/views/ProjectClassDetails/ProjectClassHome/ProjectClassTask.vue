<template>
  <h2 class="announcement-title">项目班任务详情</h2>
  <a-table
    :columns="columns"
    :data-source="paginatedData"
    row-key="task_id"
    :bordered="true"
    :loading="loading"
    :pagination="paginationConfig"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'task_name'">
        <p>{{ text }}</p>
      </template>
      <template v-else-if="column.dataIndex === 'task_status'">
        <a-badge v-if="text === '已完成'" status="success" />
        <a-badge v-else-if="text === '未完成'" status="error" />
        <a-badge v-else-if="text === '未领取'" status="default" />
        <a-badge v-else status="warning" />
        <span>{{ text }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'task_project'">
        {{ text }}
      </template>
      <template v-else-if="column.dataIndex === 'task_deadline'">
        {{ formatDate(text) }}
      </template>
      <template v-else-if="column.dataIndex === 'task_operation'">
        <div style="display: flex; justify-content: center">
          <a-button type="primary" @click="viewTaskDetail(record.task_id)">详情</a-button>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const columns = ref([]);
const data = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const pageSize = ref(4); // 每页显示4个任务

const viewTaskDetail = (taskId: string) => {
  // 点击查看详情按钮时触发，跳转到任务详情页
  router.push({ name: 'TaskDetail', params: { id: taskId } });
};

const formatDate = (datetime: string) => {
  return new Date(datetime).toLocaleString();
};

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: data.value.length,
  showQuickJumper: true
}));

const handleTableChange = (pagination: any) => {
  currentPage.value = pagination.current;
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = currentPage.value * pageSize.value;
  return data.value.slice(start, end);
});

onMounted(() => {
  loading.value = false;
  columns.value = [
    { title: '任务名称', dataIndex: 'task_name', align: 'center' },
    { title: '任务状态', dataIndex: 'task_status', align: 'center' },
    { title: '所属项目', dataIndex: 'task_project', align: 'center' },
    { title: '任务期限', dataIndex: 'task_deadline', align: 'center' },
    { title: '操作', dataIndex: 'task_operation', align: 'center' }
  ];
  data.value = [
    {
      task_id: '1',
      task_name: '任务一',
      task_status: '已完成',
      task_project: '项目一',
      task_deadline: '2024-07-31 12:00:00'
    },
    {
      task_id: '2',
      task_name: '任务二',
      task_status: '未完成',
      task_project: '项目二',
      task_deadline: '2024-08-05 15:30:00'
    },
    {
      task_id: '3',
      task_name: '任务三',
      task_status: '未领取',
      task_project: '项目三',
      task_deadline: '2024-08-10 10:00:00'
    },
    {
      task_id: '4',
      task_name: '任务四',
      task_status: '已完成',
      task_project: '项目四',
      task_deadline: '2024-07-31 12:00:00'
    },
    {
      task_id: '5',
      task_name: '任务五',
      task_status: '未完成',
      task_project: '项目五',
      task_deadline: '2024-08-05 15:30:00'
    },
    {
      task_id: '6',
      task_name: '任务六',
      task_status: '未领取',
      task_project: '项目六',
      task_deadline: '2024-08-10 10:00:00'
    },
    {
      task_id: '7',
      task_name: '任务七',
      task_status: '已完成',
      task_project: '项目七',
      task_deadline: '2024-07-31 12:00:00'
    },
    {
      task_id: '8',
      task_name: '任务八',
      task_status: '未完成',
      task_project: '项目八',
      task_deadline: '2024-08-05 15:30:00'
    },
    {
      task_id: '9',
      task_name: '任务九',
      task_status: '未领取',
      task_project: '项目九',
      task_deadline: '2024-08-10 10:00:00'
    }
  ];
});
</script>

<style scoped>
.announcement-title {
  background-color: #c29d4e; /* 橙色背景 */
  padding: 5px;
  text-align: center;
  margin: 0;
  font-size: 1rem;
  color: #fff; /* 白色字体 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
}

.ant-table {
  font-size: 18px; /* 表格字体大小 */
}

.ant-table a {
  color: #000; /* 默认链接颜色 */
}

.ant-table a:hover {
  color: #00aeec; /* 悬停时的链接颜色 */
}
</style>
