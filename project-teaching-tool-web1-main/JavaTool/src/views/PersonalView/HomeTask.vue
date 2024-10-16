<template>
  <a-card>
    <template #title>
        <span class="card-title"><BellOutlined/>我的任务</span>
    </template>
    <a-tabs v-model:selectedTab="noticeTab" class="content-sections">
        <a-tab-pane v-for="tab in noticeList" :key="tab.key" :tab="tab.tab">


          <a-table v-if="tab.key === 'tab1'" item-layout="horizontal" 
            :columns="columns" :data-source="data" :pagination=false :scroll="{ y: '33vh' }">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'task_name'">
                <a @click="ViewTaskDetali(record)">{{ text }}</a>
              </template>
              <template v-else-if="column.dataIndex === 'operation'">
                <a>领取</a>
              </template>
            </template>
            </a-table>

            <a-table v-if="tab.key === 'tab2'" item-layout="horizontal" 
            :columns="columns" :data-source="data" :pagination=false :scroll="{ y: '33vh' }">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'task_name'">
                <a @click="ViewTaskDetali(record)">{{ text }}</a>
              </template>
              <template v-else-if="column.dataIndex === 'operation'">
                <a>提交</a>
              </template>
            </template>
            </a-table>

            <TaskDetails :task="task" :modelVisible="visible1" @update:modelVisible="(val) => {
              visible1 = val;
            }"/>

        </a-tab-pane>
      </a-tabs>
  </a-card>
</template>

<script lang="ts" setup>
import TaskDetails from '@/components/Task/TaskDetails.vue';
import { ref } from 'vue';
// const props = defineProps({
//   operation: {
//     type: String,
//     required: true
//   },
// })
const task = ref()
const visible1 = ref<boolean>(false);

function ViewTaskDetali(column: any) {
  task.value = column
  visible1.value = true;
}

// 当前激活的标签
const noticeTab = ref('tab1');

// 标签列表
const noticeList = [
  { key: 'tab1', tab: '待领取任务' },
  { key: 'tab2', tab: '待提交任务' },
];

const columns = [
  {
    title: '任务名称',
    dataIndex: 'task_name',
    align: 'center' as 'center'
  },
  {
    title: '所属项目',
    dataIndex: 'task_project',
    align: 'center' as 'center'
  },
  {
    title: '所在班级',
    dataIndex: 'class_name',
    align: 'center' as 'center'
  },
  {
    title: '截止日期',
    dataIndex: 'task_endTime',
    align: 'center' as 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center' as 'center'
  },
];
const data = [...Array(2)].map((_, i) => ({
  key: i,
  task_name: `数据库设计`,
  task_project: '项目式教学',
  class_name:'2021软件工程1班',
  task_endTime: `2024/8/28 19:44:26`,
}));


</script>

<style scoped></style>