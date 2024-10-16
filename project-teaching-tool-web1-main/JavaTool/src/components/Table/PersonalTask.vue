<template>
  
<div style="height: 100%;">


  
  <a-table :columns="columns" :data-source="data" :bordered="true" :pagination="false"  :scroll="{ y: '45vh' }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'task_name'">
        <a @click="ViewTaskDetali">{{ text }}</a>
      </template>
      <template v-else-if="column.dataIndex === 'task_state'">
        <a-badge v-if="text === '进行中'" status="success" />
        <a-badge v-else-if="text === '未完成'" status="error" />
        <a-badge v-else-if="text === '已完成'" status="warning" />
        <a-badge v-else status="default" />
        <span>{{ text }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'operate'">
        <div style="display: flex;justify-content:space-around">
          <a-button type="primary" @click="visible1 = true" style="margin-right: 5px">提交</a-button>
          <a-button type="primary" @click="visible2 = true" style="margin-right: 5px">详情</a-button>
        </div>
      </template>
    </template>
  </a-table>

 
</div>
<a-pagination v-model:current="current" :total="500"  style="text-align: center;  
  bottom: 0%;margin-top: 1% "/>
  <Submit :modelVisible="visible1" @update:modelVisible="(val) => {
    visible1 = val;
  }
    " />
  <TaskDetails :modelVisible="visible2" @update:modelVisible="(val) => {
    visible2 = val;
  }
    " />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TaskDetails from '../Task/TaskDetails.vue';
import Submit from '../Task/Submit.vue';
const current = ref(6);
function ViewTaskDetali() {
  visible2.value = true;
}
// 定义组件的 props
// const props = defineProps({


  
// });

// 定义显示弹窗的状态
const visible1 = ref<boolean>(false);
const visible2 = ref<boolean>(false);

// 定义路由
const router = useRouter();
const toTaskList = () => {
  router.push('/TaskListView');
};

// 表格的列配置
const columns = [

  {
    title: '任务名称',
    dataIndex: 'task_name',
    align: 'center' as 'center',
    className: 'custom-header-style'
  },
  {
    title: '所属项目',
    dataIndex: 'project_name',
    align: 'center' as 'center',
    className: 'custom-header-style'
  },
  {
    title: '任务期限',
    dataIndex: 'task_endTime',
    align: 'center' as 'center',
    className: 'custom-header-style'
  },
  {
    title: '任务状态',
    dataIndex: 'task_state',
    align: 'center' as 'center',
    className: 'custom-header-style'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 230,
    className: 'custom-header-style',
    customHeaderCell: () => {
      return {
        style: { textAlign: 'center' as 'center' }
      };
    }
  }
];

// 表格的数据
const data = [
  {
    key: '1',
    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中'
  },
  {
    key: '2',
    task_name: '接口开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-7-1',
    task_state: '未完成'
  },
  {
    key: '3',
    task_name: '前端开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-8-15',
    task_state: '进行中'
  },{
    key: '2',
    task_name: '接口开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-7-1',
    task_state: '未完成'
  },
  {
    key: '3',
    task_name: '前端开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-8-15',
    task_state: '进行中'
  },{
    key: '2',
    task_name: '接口开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-7-1',
    task_state: '未完成'
  },
  {
    key: '3',
    task_name: '前端开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-8-15',
    task_state: '进行中'
  },{
    key: '2',
    task_name: '接口开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-7-1',
    task_state: '未完成'
  },
  {
    key: '3',
    task_name: '前端开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-8-15',
    task_state: '进行中'
  },
 
];


</script>

<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}

a {
 
  color: #61666d;
}

a:hover {
  color: #00aeec;
}


</style>
