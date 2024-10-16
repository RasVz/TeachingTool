<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <a-form ref="formRef" :model="formState" name="select" autocomplete="off" layout="inline"
      style=" padding: 5px; display: flex; justify-content: space-between; align-items: center;background-color:white; height: auto;">
      <div style="width: 100%; display: flex; justify-content: space-between;">
        <div style="display: flex;  flex-wrap: wrap; width: 85%;">
          <a-form-item label="姓名/学号" name="StudentName" style="padding:5px ">
            <a-input v-model:value="formState.StudentName" placeholder="输入学生姓名或学号" />
          </a-form-item>

          <a-form-item label="专业" name="StudentMajor" style="padding:5px">
            <a-input v-model:value="formState.StudentMajor" placeholder="输入学生专业" />
          </a-form-item>
        </div>
        <div style="display: flex; width: auto;">
          <a-button style="margin-right: 10px; margin-top: 5px;" type="primary" :icon="h(SearchOutlined)"
            @click="onSubmit">查询</a-button>
          <a-button style="margin-right: 5px; margin-top: 5px; ;" :icon="h(RedoOutlined)"
            @click="resetForm">重置</a-button>
        </div>
      </div>
    </a-form>
    <a-table :columns="columns" :data-source="data" row-key="user_id" :scroll="{ y: '49vh' }" 
      :pagination="{ total: 20, position: ['bottomCenter']}" :row-selection="rowSelection"
      :expanded-row-keys="expandedRowKeys" @expand="onExpand" :bordered="true">
      <template #expandedRowRender="{ record }">
        <span style="font-weight: bold; margin-right: 2%;">相关任务成绩</span>
        <a  @click="visible1 = true" style="margin-right: 2% " v-for="task in record.task" :key="task.task_id">
          {{ task.task_name }}:{{ task.score }}
        </a>
      </template>
      <template #expandColumnTitle>
        <a-switch v-model:checked="alltoExpand" size="small" @click="allExpand" />
      </template>
    </a-table>
  </div>
  <StudentTaskDetail :values="task" :modelVisible="visible1" @update:modelVisible="(val) => { visible1 = val }"/>
</template>
<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { h, reactive, watch } from 'vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
import StudentTaskDetail from './StudentTaskDetail.vue';
import dayjs from 'dayjs';

// 表单对应数据接口
interface FormState {
  StudentName: string | number;
  StudentMajor: string;
  Group: string;
}
//表格对应的数据接口
interface FormStateTable {
  user_id: number;
  name: string;
  class_name: string;
  group_name: string;
  score: number;
  task?: any[]
}
// 表单对应数据ClassName
const formState = reactive<FormState>({
  StudentName: '',
  StudentMajor: '',
  Group: '',
});
//接收的小组id
const props = defineProps({
  teamId: {
    type: Number,
    default: 0
  }
})
const task =ref({
  taskName:"学生表设计",
    projectName:"项目式教学",
    moduleName:"数据库设计-1",
    taskStatus:"进行中",
    taskDescription:"根据需求分析完成学生表设计",
    createTime: dayjs(),
    endTime:  dayjs(),
    startTime: dayjs(),
    finishTime: dayjs(),
    achievement:[{
      achievementId:1,
      achievementName:"学生表",
      deliverableName:"交付物",
    }],
    teacherScore:100,
    managerScore:null,
}
  
)

//任务弹窗
const visible1 = ref(false)
// 表单Ref
const formRef = ref<FormInstance>();
//表格默认列对象
const columns = ref([
  {
    title: '学号',
    dataIndex: 'user_id',
    align: 'center' as 'center',
    width: '20%',

  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center' as 'center',
    width: '20%',


  },
  {
    title: '所属项目班',
    dataIndex: 'class',
    align: 'center' as 'center',
    width: '20%',

  },
  {
    title: '所属小组',
    dataIndex: 'team',
    align: 'center' as 'center',
    width: '20%',


  },
  {
    title: '总分',
    dataIndex: 'score',
    align: 'center' as 'center',
    width: '20%',

  }
]);
//表格数据源存储对象
const data = ref<FormStateTable[]>();
//表格多选内容
const selectedRowKeys = ref<FormStateTable['user_id'][]>([]);
const selectedall = ref(true)
const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onSelect: (record: FormStateTable, selected: boolean) => {
      if (selected)
        selectedRowKeys.value.push(record.user_id)
      else {
        const index = selectedRowKeys.value.indexOf(record.user_id);
        selectedRowKeys.value.splice(index, 1)
      }
    },
    onSelectAll: () => {
      if (selectedall.value) {
        const allRowKeys = data.value.map(item => item.user_id);
        selectedRowKeys.value = allRowKeys
        selectedall.value = !selectedall.value
      }
      else {
        selectedRowKeys.value = [];
        selectedall.value = !selectedall.value
      }
    },
    hideDefaultSelections: true,
  };
});
//扩展行内容key数组
const expandedRowKeys = ref([])

//单独展开收缩列
const onExpand = (expanded: boolean, record: any) => {
  if (expanded == true)
    expandedRowKeys.value.push(record.user_id)
  else {
    const index = expandedRowKeys.value.indexOf(record.user_id);
    expandedRowKeys.value.splice(index, 1)
  }

}
//一件展开收缩全部扩展列
const alltoExpand = ref(true)
const allExpand = () => {
  if (alltoExpand.value) {
    const allRowKeys = data.value.map(item => item.user_id);
    expandedRowKeys.value = allRowKeys;

  }
  else {
    expandedRowKeys.value = [];
  }
}
// 提交筛选内容
const onSubmit = () => {
  console.log(formState);
};

// 清空筛选框内容
const resetForm = () => {
  formRef.value.resetFields();
};
//监听小组id更新学生表格
watch(() => {
  return props.teamId
}, newValue => {
  if (newValue === 0) {
    const a = ref([])
    for (let i = 0; i < 20; i++) {
      a.value.push({
        user_id: 2021 + i,
        name: `Edward King ${i}`,
        class: '2班',
        team: '小组2',
        score: 85,
        task: [{
          task_name: '杂七杂八任务名称1',
          score: 100,
          zhanbi: 70
        }, {
          task_name: '杂七杂八任务名称2',
          score: 100,
          zhanbi: 70
        }]
      });
    }
    data.value = a.value
    alltoExpand.value = true
    const allRowKeys = data.value.map(item => item.user_id);
    expandedRowKeys.value = allRowKeys
  }

  else if (newValue === 10) {
    const a = ref([])
    for (let i = 0; i < 20; i++) {
      a.value.push({
        user_id: 2021 + i,
        name: `Edward King ${i}`,
        class: '11',
        team: '小组' + i,
        score: 85,
        task: [{
          task_name: '杂七杂八任务名称1',
          score: 100,
          zhanbi: 70
        }, {
          task_name: '杂七杂八任务名称2',
          score: 100,
          zhanbi: 70
        }, {
          task_name: '杂七杂八任务名称3',
          score: 100,
          zhanbi: 70
        }]
      });
    }
    data.value = a.value
    const allRowKeys = data.value.map(item => item.user_id);
    alltoExpand.value = true
    expandedRowKeys.value = allRowKeys
  }
  else {
    const a = ref([])
    for (let i = 0; i < 20; i++) {
      a.value.push({
        user_id: 2021 + i,
        name: `Edward King ${i}`,
        class: '2班',
        team: '小组2',
        score: 85,
        task: [{
          task_name: '杂七杂八任务名称1',
          score: 100,
          zhanbi: 70
        }, {
          task_name: '杂七杂八任务名称2',
          score: 100,
          zhanbi: 70
        }]
      });
    }
    data.value = a.value
    const allRowKeys = data.value.map(item => item.user_id);
    alltoExpand.value = true;
    expandedRowKeys.value = allRowKeys
  }
}, { immediate: true })
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