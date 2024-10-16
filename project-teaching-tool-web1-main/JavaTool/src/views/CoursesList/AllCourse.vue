<template>

  <a-form ref="formRef" :model="formState" name="select" autocomplete="off" layout="inline" :label-col="labelCol" style="padding: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          ">
    <div style="width: 100%; display: flex; justify-content: space-between;">
      <div style="display: flex;  flex-wrap: wrap; width: 85%;">
        <a-form-item label="课程名称" name="projectName" style="padding:5px">
          <a-input v-model:value="formState.taskName" placeholder="输入课程名称" />
        </a-form-item>
        <a-form-item label="相关项目" name="projectName" style="padding:5px">
          <a-input v-model:value="formState.projectName" placeholder="输入项目名称" />
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
  <a-table style="height: 100%;" :columns="columns" :data-source="data" :bordered="true" :loading="loading"
    :pagination="false" :scroll="{ y: '45vh' }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'courseName'">
        
        <a @click="viewProjectDetail(record)">{{ text }}</a>
      </template>
      <template v-else-if="column.dataIndex === 'projectList'">
        <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
          <p v-for="project in record.projectList" style="width: auto;">{{ project.projectName }}</p>
        </div>
      </template>
      <template v-else-if="column.dataIndex==='time'">
        <span>{{ record.academicYear }}-{{ record.semester }}学期</span>
      </template>
    </template>
  </a-table>

  <a-pagination v-model:current="current" :total="totalCount" style="text-align: center;bottom: 0%;margin-top: 1% " />



</template>
<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref, reactive, h,computed } from 'vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import type { FormInstance } from 'ant-design-vue';
import CourseDao from '@/daos/course_dao';
import { useStore } from 'vuex';
  
const store = useStore();

const courseDao = new CourseDao();
dayjs.locale('zh-cn');
//表单对应数据接口
interface FormState {
  taskName: string;
  projectName: string;
  taskDate: [dayjs.Dayjs, dayjs.Dayjs]
}
const labelCol = { style: { width: '90px' } };
//表单对应数据
const formState = reactive<FormState>({
  taskName: '',
  projectName: '',
  taskDate: [null, null]
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
const current = ref(1);
const columns = ref();
const data = ref([]);
const loading = ref(true);
const totalCount = ref(10)


  columns.value = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      align: 'center' as 'center',
      width: '13%',
    },
    {
      title: '任课学期',
      dataIndex: 'time',
      align: 'center' as 'center',
      width: '15%',
      className: 'custom-header-style'
    },
    {
      title: '课时',
      dataIndex: 'lesson',
      align: 'center' as 'center',
      className: 'custom-header-style',
      width: '5%',

    },
    {
      title: '课程类型',
      dataIndex: 'courseType',
      align: 'center' as 'center',
      width: '10%',
      className: 'custom-header-style'
    },
    {
      title: '关联项目',
      dataIndex: 'projectList',
      align: 'center' as 'center',
      className: 'custom-header-style'

    },
    {
      title: '操作',
      dataIndex: 'operate',
      className: 'custom-header-style',
      width: '20%',
      customHeaderCell: () => {
        return {
          style: { textAlign: 'center' as 'center' }, //表头单
        }
      }
    }

  ];


onMounted(()=>{
 const init =  async (teacherId: number) => {
  loading.value=true
  teacherId= 1
    let result = await courseDao.findCoursesByTeacherId(current.value,10,teacherId);
    data.value = result.data.data.rows
    totalCount.value =result.data.data.totalCount
    loading.value=false
  }
  init(1)
})
  



 
function viewProjectDetail(record:any) {

  

    store.commit('course/SET_COURSEID',record.courseId)
 store.commit('course/SET_PROJECT',record.projectList)
 console.log(store.getters.projects);
    
  router.push({name:"课程详情-课程首页-课程动态",params:{courseId: record.courseId,}})
  
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