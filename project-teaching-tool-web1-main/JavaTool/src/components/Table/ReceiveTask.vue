<template>

  <a-table :columns="columns" :data-source="data" :bordered="true" :pagination="false" :scroll="{ y: '23vh' }">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'task_name'">
        <a  @click="visible2 = true">{{ text }}</a>
      </template>
      <template v-else-if="column.dataIndex === 'task_state'">
        <a-badge v-if="text === '进行中'" status="success" />
        <a-badge v-else status="default" />
        <span>{{ text }}</span>
      </template>
      <template v-if="column.dataIndex === 'operate'">


        <div style="display: flex; ">
          <a-button type="primary" @click="visible1 = true;">领取</a-button>
        </div>

      </template>
    </template>
    <template #title>
      <div style="display: flex; justify-content: space-between">
        待领取的任务
        <a @click="toTaskList">全部任务</a>
      </div>
    </template>
  </a-table>

  <TaskDetails :modelVisible="visible2" @update:modelVisible="(val) => { visible2 = val }" />

</template>

<script lang="ts" setup>


import { useRouter } from 'vue-router';
import { ref } from 'vue';

const visible1 = ref<boolean>(false);
const visible2 = ref<boolean>(false);
const router = useRouter();
const toTaskList = () => {
  router.push('/TaskListView');
};

const columns = [
  {
    title: '任务名称',
    dataIndex: 'task_name',

    align: 'center' as 'center'
  },
  {
    title: '所属项目',
    dataIndex: 'project_name',
    align: 'center' as 'center'
  },
  {
    title: '任务期限',
    dataIndex: 'task_endTime',
    align: 'center' as 'center'
  },

  {
    title: '操作',
    dataIndex: 'operate',
    customHeaderCell: () => {
      return {
        style: { textAlign: 'center' as 'center' }
      };
    }
  }
];


const data = [
  {
    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中'
  },
  {

    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',
  },
  {

    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',
  },
  {

    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',
  },
  {

    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',
  },
  {

    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',
  },
  {

    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',
  },
  {

    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',
  },

  {
    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中'
  },
  {
    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',

  },

];
</script>


<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}

/* a {
  color: black;
  text-decoration: none;
}

a:hover {
  color: blue;
} */
</style>