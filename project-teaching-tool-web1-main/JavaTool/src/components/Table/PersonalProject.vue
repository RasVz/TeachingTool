<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ y: 165 }" :bordered="true" :pagination="false"
    :loading="loading" style="height: 280px;">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'project_name'">
        <a @click="viewProjectDetail(record.project_id)">{{ text }}</a>
      </template>

      <template v-else-if="column.dataIndex === 'project_state'">
        <a-badge v-if="text === '进行中'" status="success" />
        <a-badge v-else status="default" />

        <span>{{ text }}</span>
      </template>
    </template>
    <template #title>
      <div style="display: flex; justify-content: space-between">
        我的项目
        <a @click="toProjectList">全部项目</a>
      </div>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const columns = ref(null);
const data = ref(null);
const loading = ref(true);
const router = useRouter();
const toProjectList = () => {
  router.push('/ProjectListView');
};


onMounted(() => {
  loading.value = false

  columns.value = [

    {
      title: '项目名称',
      dataIndex: 'project_name',
      align: 'center' as 'center'
    },
    {
      title: '项目经理',
      dataIndex: 'project_mannerName',
      align: 'center' as 'center'
    },
    {
      title: '开始时间',
      dataIndex: 'project_startTime',
      align: 'center' as 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'project_endTime',
      align: 'center' as 'center'
    },
    {
      title: '项目状态',
      dataIndex: 'project_state',
      align: 'center' as 'center'
    }
  ];

  data.value = [
    {
      projeect_id: '1',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    },
    {
      projeect_id: '2',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '已归档'
    },
    {
      projeect_id: '3',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    },
    {
      projeect_id: '4',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    },
    {
      projeect_id: '5',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    },
    {
      projeect_id: '5',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    }
  ];



})

function viewProjectDetail(ProjectId) {

  router.push({ path: 'ProjectDetail', params: { id: ProjectId } });
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


:deep(.ant-table-thead th.custom-header-style ){
  text-align: center;
  font-size: 20px;
  font-weight: 550;
}

:deep(.ant-table-cell.custom-header-style)  {
  font-size: 18px;

}
</style>