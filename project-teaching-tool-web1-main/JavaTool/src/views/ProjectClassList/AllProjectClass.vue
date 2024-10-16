<template>


  <!-- 筛选栏 -->
  <a-form ref="formRef" :model="formState" name="select" autocomplete="off" layout="inline" :label-col="labelCol" style="padding: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;">
    <div style="width: 100%; display: flex; justify-content: space-between;">
      <div style="display: flex;  flex-wrap: wrap; width: 85%;">
        <a-form-item label="教学班名称" name="teaching_class_name" style="padding:5px">
          <a-input v-model:value="formState.teaching_class_name" placeholder="输入教学班名称" /> 
        </a-form-item>
        <a-form-item label="学期" name="semester" style="padding:5px">
          <a-input v-model:value="formState.semester" placeholder="输入学期" />
        </a-form-item>
        <a-form-item label="学年" name="academic_year" style="padding:5px">
          <a-input v-model:value="formState.academic_year" placeholder="输入学年" />
        </a-form-item>
        <a-form-item label="专业" name="major" style="padding:5px">
          <a-input v-model:value="formState.major" placeholder="输入专业" />
        </a-form-item>
        <!-- <a-form-item label="项目时间" name="taskDate" style="padding:5px ;">
          <a-range-picker v-model:value="formState.taskDate" show-time :locale="locale" style="width: 80%;">
          </a-range-picker>
        </a-form-item> -->
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
        <template v-if="column.dataIndex === 'teaching_class_name'">
          <a @click="viewDetail()">{{ text }}</a>
        </template>
      </template>
    </a-table>
  </div>
  <a-pagination v-model:current="current" :total="500" style="text-align: center;bottom: 0%;margin-top: 1% " />
</template>
<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref, reactive, h } from 'vue';

import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import type { FormInstance } from 'ant-design-vue';
dayjs.locale('zh-cn');
//表单对应数据接口
interface FormState {
  teaching_class_name: string;
  academic_year: string;
  major: string;
  semester: string;
}
const labelCol = { style: { width: '90px' } };
//表单对应数据
const formState = reactive<FormState>({
  teaching_class_name: '',
  academic_year: '',
  major: '',
  semester: ''
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
const current = ref(6);
const columns = ref(null);
const data = ref(null);
const loading = ref(true);
onMounted(() => {
  loading.value = false
  columns.value = [
    {
      title: '教学班编号',
      dataIndex: 'class_id',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '教学班名称',
      dataIndex: 'teaching_class_name',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '专业',
      dataIndex: 'major',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '学年',
      dataIndex: 'academic_year',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '学期',
      dataIndex: 'semester',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    // {
    //   title: '开始时间',
    //   dataIndex: 'project_startTime',
    //   align: 'center' as 'center',
    //   className: 'custom-header-style'
    // },
    // {
    //   title: '结束时间',
    //   dataIndex: 'project_endTime',
    //   align: 'center' as 'center',
    //   className: 'custom-header-style'
    // },
    // {
    //   title: '项目状态',
    //   dataIndex: 'project_state',
    //   align: 'center' as 'center',
    //   className: 'custom-header-style'
    // },
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
      class_id: '1',
      teaching_class_name: '软件工程5班',
      major: '张三',
      academic_year: '2024',
      semester: '上学期',
    },
    {
      class_id: '1',
      teaching_class_name: '软件工程5班',
      major: '张三',
      academic_year: '2024',
      semester: '上学期',
    },
    {
      class_id: '1',
      teaching_class_name: '软件工程5班',
      major: '张三',
      academic_year: '2024',
      semester: '上学期',
    },
    {
      class_id: '1',
      teaching_class_name: '软件工程5班',
      major: '张三',
      academic_year: '2024',
      semester: '上学期',
    },
    {
      class_id: '1',
      teaching_class_name: '软件工程5班',
      major: '张三',
      academic_year: '2024',
      semester: '上学期',
    },
  ];
})

function viewDetail() {

  let routeUrl = router.resolve({
    name: "ProjectClassDetail",
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