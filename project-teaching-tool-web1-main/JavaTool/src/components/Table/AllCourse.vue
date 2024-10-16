<template>
  <div style="height: 100%;">
    <a-table :columns="columns" :data-source="data" :bordered="true" :loading="loading" :pagination="false"
      :scroll="{ y: '45vh' }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'project_name'">
          <a @click="viewCourseDetail()">{{ text }}</a>
        </template>
        <template v-else-if="column.dataIndex === 'project_state'">
          <a-badge v-if="text === '进行中'" status="success" />
          <a-badge v-else status="default" />
          <span>{{ text }}</span>
        </template>

      </template>
    </a-table>
  </div>
  <a-pagination v-model:current="current" :total="500" style="text-align: center;bottom: 0%;margin-top: 1% " />
</template>
<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import store from '@/store';

const current = ref(6);
const columns = ref(null);
const data = ref(null);
const loading = ref(true);
onMounted(() => {
  loading.value = false
  columns.value = [

    {
      title: '课程名称',
      dataIndex: 'project_name',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '课程负责人',
      dataIndex: 'project_mannerName',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '开始时间',
      dataIndex: 'project_startTime',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '结束时间',
      dataIndex: 'project_endTime',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '课程状态',
      dataIndex: 'project_state',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '操作',
      dataIndex: 'operate',
      className: 'custom-header-style',
      customHeaderCell: () => {
        return {
          style: { textAlign: 'center' as 'center' }, //表头单
        }
      }
    }

  ];

  data.value = [
    {
      project_id: '1',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    },
    {
      project_id: '2',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '已归档'
    },
    {
      project_id: '3',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    },
    {
      project_id: '4',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    },
    {
      project_id: '5',
      project_name: '仿淘宝商城系统',
      project_mannerName: '张三',
      project_startTime: '2024-5-7',
      project_endTime: '2024-6-7',
      project_state: '进行中'
    },

  ];




})

function viewCourseDetail() {
  let routeUrl = router.resolve({
    name: "CourseDetailsView",
    params: { courseId: 1 }
  })
  window.open(routeUrl.href, '_blank')

};
</script>

<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}

a {
  font-size: 14px;
  color: #61666d;
}

a:hover {
  color: #00aeec;
}

:deep(.ant-table-thead th.custom-header-style) {
  font-size: 14px;
  font-weight: 550;
}

:deep(.ant-table-cell.custom-header-style) {
  font-size: 14px;

}
</style>