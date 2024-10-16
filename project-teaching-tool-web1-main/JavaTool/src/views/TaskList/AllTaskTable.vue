<template>
  <!-- 筛选栏 -->
  <a-form ref="formRef" :model="formState" name="select" autocomplete="off" layout="inline" :label-col="labelCol" style="padding: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;">
    <div style="width: 100%; display: flex; justify-content: space-between;">
      <div style="display: flex;  flex-wrap: wrap; width: 85%;">
        <a-form-item label="任务名称" name="task_Name" style="padding:5px">
          <a-input v-model:value="formState.task_Name" placeholder="输入任务名称" />
        </a-form-item>
        <a-form-item label="所属项目" name="project_Name" style="padding:5px">
          <a-input v-model:value="formState.project_Name" placeholder="输入所属项目" />
        </a-form-item>
        <a-form-item label="负责小组" name="team_Name" style="padding:5px">
          <a-input v-model:value="formState.team_Name" placeholder="输入负责小组" />
        </a-form-item>
        <a-form-item label="任务时间" name="end_Time" style="padding:5px">
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
        <template v-if="column.dataIndex === 'task_Name'">

          <a @click="viewDetail()">{{ text }}</a>
        </template>


      </template>
    </a-table>
  </div>
  <!-- 分页器 -->
  <a-pagination v-model:current="current" :total="500" style="text-align: center;bottom: 0%;margin-top: 1% " />
  <!--  -->
  <TaskDetails :modelVisible="isTaskDetailsVisible" @update:modelVisible="(val) => {
        isTaskDetailsVisible = val;
  }"/>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, h } from 'vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import type { FormInstance } from 'ant-design-vue';
dayjs.locale('zh-cn');
//筛选标签宽度
const labelCol = { style: { width: '90px' } };
//表单对应数据接口
interface FormState {
  task_Name: string;
  project_Name: string;
  team_Name: string;
  task_Date: [dayjs.Dayjs, dayjs.Dayjs];
}
//任务详情页面开关(默认关闭)
const isTaskDetailsVisible = ref(false);
//表单对应数据
const formState = reactive<FormState>({
  task_Name: '',
  project_Name: '',
  team_Name :'',
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
      title: '任务名称',
      dataIndex: 'task_Name',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '所属项目',
      dataIndex: 'project_Name',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '负责小组',
      dataIndex: 'team_Name',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '结束时间',
      dataIndex: 'end_Time',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '任务工分',
      dataIndex: 'task_point',
      align: 'center' as 'center',
      className: 'custom-header-style'
    },
    {
      title: '任务状态',
      dataIndex: 'task_status',
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
      task_Name: '任务名称--1',
      project_Name: '软件工程',
      team_Name: '小组--1',
      end_Time: '2024-8-24 19:20:11',
      task_point: '6',
      task_status: '进行中'

    },
    {
      task_Name: '任务名称--2',
      project_Name: '软件工程',
      team_Name: '小组--2',
      end_Time: '2024-8-24 19:20:11',
      task_point: '6',
      task_status: '进行中'
    },
    {
      task_Name: '任务名称--3',
      project_Name: '软件工程',
      team_Name: '小组--3',
      end_Time: '2024-8-24 19:20:11',
      task_point: '3',
      task_status: '进行中'
    },
    {
      task_Name: '任务名称--4',
      project_Name: '软件工程',
      team_Name: '小组--4',
      end_Time: '2024-8-24 19:20:11',
      task_point: '4',
      task_status: '进行中'
    },
    {
      task_Name: '任务名称--5',
      project_Name: '软件工程',
      team_Name: '小组--5',
      end_Time: '2024-8-24 19:20:11',
      task_point: '5',
      task_status: '进行中'
    },

  ];
   //挂在完成时关闭加载
   loading.value = false
})
//点击查看详情
function viewDetail() {
  isTaskDetailsVisible.value=true
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