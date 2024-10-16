<template>


  <!-- 筛选栏 -->
  <a-form ref="formRef" :model="formState" name="select" autocomplete="off" layout="inline" :label-col="labelCol" style="padding: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;">
    <div style="width: 100%; display: flex; justify-content: space-between;">
      <div style="display: flex;  flex-wrap: wrap; width: 85%;">
        <a-form-item label="项目名称" name="project_Name" style="padding:5px">
          <a-input v-model:value="formState.project_Name" placeholder="输入项目名称" />
        </a-form-item>
        <a-form-item label="项目负责人" name="user_Name" style="padding:5px">
          <a-input v-model:value="formState.user_Name" placeholder="输入负责人名称" />
        </a-form-item>
        <a-form-item label="项目时间" name="task_Date" style="padding:5px ;">
          <a-range-picker v-model:value="formState.task_Date" show-time :locale="locale" style="width: 80%;"/>
        
        </a-form-item>

      </div>
      <div style="display: flex; width: auto;">
        <a-button style="margin-right: 10px; margin-top: 5px;" type="primary" :icon="h(SearchOutlined)"
          @click="onSubmit">查询</a-button>
        <a-button style="margin-right: 5px; margin-top: 5px; ;" :icon="h(RedoOutlined)" @click="resetForm">重置</a-button>
      </div>
    </div>
  </a-form>
  <!-- 表格 -->
  <div style="height: 100%;">
    <a-table :columns="columns" :data-source="data" :bordered="true" :loading="loading" :pagination="false"
      :scroll="{ y: '45vh' }">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'project_name'">

          <a @click="viewDetail()">{{ text }}</a>
        </template>


      </template>
    </a-table>
  </div>
  <!-- 分页器 -->
  <a-pagination v-model:current="current" :total="500" style="text-align: center;bottom: 0%;margin-top: 1% " />
</template>
<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref, reactive, h } from 'vue';

import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import type { FormInstance } from 'ant-design-vue';

//表单对应数据接口
interface FormState {
  project_Name: string;
  user_Name: string;
  task_Date: [dayjs.Dayjs, dayjs.Dayjs]


}
//筛选标签宽度
const labelCol = { style: { width: '90px' } };
//表单对应数据
const formState = reactive<FormState>({
  project_Name: '',
  user_Name: '',
  task_Date: [null, null]
});

//表单Ref
const formRef = ref<FormInstance>();

//提交筛选内容
const onSubmit = () => {
  console.log(formState)
};
//清空筛选框内容
const resetForm = () => {
  formRef.value.resetFields();
};
//分页器默认页输
const current = ref(6);
//初始化表格数据类型
const columns = ref(null);
//初始化表格数据
const data = ref(null);
//默认开启加载
const loading = ref(true);
//挂载页面数据
onMounted(() => {
  columns.value = [
    {
      title: '项目名称',
      dataIndex: 'project_name',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '项目负责人',
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
      title: '项目状态',
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
  //挂在完成时关闭加载
  loading.value = false
})

function viewDetail() {
  let routeUrl = router.resolve({
    name: "ProjectDetailsView",
    params: { id: 1 }
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