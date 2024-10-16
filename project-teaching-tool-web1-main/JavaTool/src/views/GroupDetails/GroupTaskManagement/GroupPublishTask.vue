<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :bordered="true"
    :pagination="!raskHead ? null : false"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'task_name'">
        <a @click="ViewTaskDetali">text</a>
      </template>
      <template v-else-if="column.dataIndex === 'task_state'">
        <a-badge v-if="text === '进行中'" status="success" />
        <a-badge v-else-if="text === '未完成'" status="error" />
        <a-badge v-else-if="text === '已完成'" status="warning" />
        <a-badge v-else status="default" />
        <span>{{ text }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'operate'">
        <div style="display: flex">
          <a-button type="primary" @click="visible1 = true" style="margin-right: 5px"
            >提交</a-button
          >
          <a-button type="primary" @click="visible2 = true" style="margin-right: 5px"
            >详情</a-button
          >
        </div>
      </template>
      <template v-if="column.dataIndex === 'selection'">
        <a-checkbox
          :checked="isRowSelected(record.key)"
          @change="handleCheckboxChange($event, record.key)"
        />
      </template>
    </template>
    <template #title v-if="raskHead">
      <div style="display: flex; justify-content: space-between">
        我的任务
        <a @click="toTaskList">全部任务</a>
      </div>
    </template>
  </a-table>

  <Submit
    :modelVisible="visible1"
    @update:modelVisible="
      (val) => {
        visible1 = val;
      }
    "
  />
  <TaskDetails
    :modelVisible="visible2"
    @update:modelVisible="
      (val) => {
        visible2 = val;
      }
    "
    v-if="!raskHead"
  />
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import Submit from '../../../components/Task/Submit.vue';

function ViewTaskDetali() {
  visible2.value = true;
}
// 定义组件的 props
const props = defineProps({
  raskHead: {
    type: Boolean,
    required: true
  },
  show: {
    type: Boolean,
    required: false
  }
});

// 定义显示弹窗的状态
const visible1 = ref<boolean>(false);
const visible2 = ref<boolean>(false);

// 表格的列配置
const columns = [
  {
    dataIndex: 'selection',
    align: 'center' as 'center',
    width: 60,
    className: 'custom-header-style'
  },
  {
    title: '任务名称',
    dataIndex: 'task_name',
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
    title: '任务描述',
    dataIndex: 'task_description',
    align: 'center' as 'center',
    className: 'custom-header-style'
  }
];

// 表格的数据
const data = [
  {
    key: '1',
    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    module_name: '模块1',
    task_endTime: '2024-6-7',
    task_state: '进行中',
    task_description: '任务简介·1'
  },
  {
    key: '2',
    task_name: '接口开发',
    project_name: '类淘宝商城系统',
    module_name: '模块1',
    task_endTime: '2024-7-1',
    task_state: '未完成',
    task_description: '任务简介·2'
  },
  {
    key: '3',
    task_name: '前端开发',
    project_name: '类淘宝商城系统',
    module_name: '模块2',
    task_endTime: '2024-8-15',
    task_state: '进行中',
    task_description: '任务简介·3'
  }
];

// 选中的行的 key
const selectedRowKeys = ref<string[]>([]);

// 检查某行是否被选中
const isRowSelected = (key: string) => {
  return selectedRowKeys.value.includes(key);
};

// 处理复选框变化
const handleCheckboxChange = (event: any, key: string) => {
  const { checked } = event.target;
  if (checked) {
    selectedRowKeys.value.push(key);
  } else {
    selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== key);
  }
};
</script>

<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}

a {
  font-size: 18px;
  color: #61666d;
}

a:hover {
  color: #00aeec;
}

:deep(.ant-table-thead th.custom-header-style){
  text-align: center;
  font-size: 20px;
  font-weight: 550;
}

:deep(.ant-table-cell.custom-header-style){
  font-size: 18px;
}
</style>