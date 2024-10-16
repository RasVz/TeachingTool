<template>
  <a-layout style="height: 100%;">

    <a-form ref="formRef" :model="formState" name="select" autocomplete="off" layout="inline" style="padding: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;background-color:white;">
      <div style="width: 100%; display: flex; justify-content: space-between;">
        <div style="display: flex;  flex-wrap: wrap; width: 85%;">
          <a-form-item label="姓名/学号" name="StudentName" style="padding:5px ">
            <a-input v-model:value="formState.StudentName" placeholder="输入学生姓名或学号" />
          </a-form-item>

          <a-form-item label="专业" name="StudentMajor" style="padding:5px">
            <a-input v-model:value="formState.StudentMajor" placeholder="输入学生专业" />
          </a-form-item>

          <a-form-item class="centered-form-item">
            <a-select ref="select" v-model:value="value1" style="width: 120px" @focus="focus" @change="handleChange">
              <a-select-option value="全部学生">全部学生</a-select-option>
              <a-select-option value="已分组">已分组</a-select-option>
              <a-select-option value="未分组">未分组</a-select-option>
            </a-select>
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
    <a-layout-content style="background-color: white;">

      <a-table :row-selection="rowSelection" :columns="columns"  :data-source="data" :pagination="{
        total: data.length,
        position: ['bottomCenter']
      }" :scroll="{ y: '49vh' }" 
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" @click="deleteRecord(record.key)">删除</a-button>
            <a-button type="link" @click="changeClass(record.key)">调动班级</a-button>
          </template>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>

</template>
<script lang="ts" setup>
import { computed, ref, unref ,watch} from 'vue';
import { Table } from 'ant-design-vue';
import { h, reactive } from 'vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';

import StudentTable from '../CourseGrades/StudentTable.vue';


//向父组件传递学生列表里勾选的学生数量
const selectedStudents = ref([]);

// const allSelectedRowKeys = ref([]); 

const emit = defineEmits(['update:selectedCount']);

// const handleSelectionChange = (selectedRowKeys, selectedRows) => {
//   selectedStudents.value = selectedRows;
//   emitSelectedCount();
// };

const emitSelectedCount = () => {
  const selectedCount = selectedRowKeys.value.length;
  console.log(selectedCount)
  emit('update:selectedCount', selectedCount);
};




//表单操作逻辑
const deleteRecord = (key: string | number) => {
  console.log(` ${key}`);

};

const changeClass = (key: string | number) => {
  console.log(` ${key}`);

};



//下拉选择框

const value1 = ref('全部学生');


const focus = () => {
  console.log('focus');
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

// 表单对应数据接口
interface FormState {
  key: string | number;
  StudentId: number;
  StudentName: string;
  StudentMajor: string;
  TeamId: number;
}

// 表单对应数据ClassName
const formState = reactive<FormState>({
  key: null,
  StudentId: null,
  StudentName: '',
  StudentMajor: '',
  TeamId: null,
});

// 表单Ref
const formRef = ref<FormInstance>();

const columns = [

  {
    title: '姓名',
    dataIndex: 'StudentName',
    align: 'center' as 'center',
  },
  {
    title: '学号',
    dataIndex: 'StudentId', align: 'center' as 'center',
  },
  {
    title: '专业',
    dataIndex: 'StudentMajor', align: 'center' as 'center',
  },
  {
    title: '小组',
    dataIndex: 'TeamId', align: 'center' as 'center',
  },
  {
    title: '操作',
    dataIndex: 'action', align: 'center' as 'center',

  },
];

const data = ref<FormState[]>([]);
for (let i = 0; i <40; i++) {
  data.value.push({
    key: i,
    StudentName: `轴续证 ${i}`,
    StudentId: 32,
    StudentMajor: 'er',
    TeamId: 2,
  });
}


const selectedall = ref(true)
const selectedRowKeys = ref<FormState['key'][]>([]);
const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onSelect: (record: FormState, selected: boolean,) => {
      if (selected)
        selectedRowKeys.value.push(record.key)
      else {
        const index = selectedRowKeys.value.indexOf(record.key);
        selectedRowKeys.value.splice(index, 1)
      }
      console.log(selectedRowKeys.value);
    },
    onSelectAll: () => {
      if (selectedall.value) {
        const allRowKeys = data.value.map(item => item.key);
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

// 提交筛选内容
const onSubmit = () => {
  console.log(formState);
};

// 清空筛选框内容
const resetForm = () => {
  formRef.value.resetFields();
};


//index中的小组列表与学生table之间的联动
const props = defineProps<{ teamId }>();

const students = ref<FormState[]>([]);

const fetchStudents = (teamId) => {
  //此处填写按照小组id查找学生的逻辑
  
      
}


watch(() => props.teamId, (newTeamId) => {
  
  fetchStudents(newTeamId);
}, { immediate: true });

watch(()=>{return selectedRowKeys.value.length}, (newa) => {
  console.log(newa)
emitSelectedCount()
}, { immediate: true })


</script>


<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}

/* a {
  color: #61666d;
}

a:hover {
  color: #00aeec;
} */


.centered-form-item {
  display: flex;
  align-items: center;
}
</style>