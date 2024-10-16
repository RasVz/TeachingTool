<template>
  <a-modal v-model:open="visible.value" title="新建课程" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel="formRef.resetFields()
  emit('update:modelVisible', false);" :maskClosable="false" width="50vw">
    <a-form :rules="rules" :label-col="labelCol" ref="formRef" :model="formState" layout="horizontal"
      name="form_in_modal">
      <a-row>
        <a-col :span="12"> <a-form-item name="course_name" label="课程名称">
            <a-input v-model:value="formState.course_name" />
          </a-form-item></a-col>
        <a-col :span="12"> <a-form-item name="college" label="学院">
            <a-select v-model:value="formState.college" :options="options2"></a-select>
          </a-form-item></a-col>
      </a-row>

      <a-row justify="space-between">
        <a-col :span="12"> <a-form-item name="course_type" label="课程类型">
            <a-radio-group v-model:value="formState.course_type">
              <a-radio value="1">理论课程</a-radio>
              <a-radio value="2">实训课程</a-radio>
            </a-radio-group> </a-form-item></a-col>
        <a-col :span="12"> <a-form-item name="college" label="课时">
            <a-input type="number" v-model:value="formState.periods"></a-input>
          </a-form-item>
        </a-col>
      </a-row>






      <a-form-item name="project" label="关联项目">
        <a-select :options="project" mode="multiple" :fieldNames="{ label: 'project_name', value: 'project_id' }"
          :default-active-first-option="false" :show-arrow="true" :filter-option="filterOption"
          @focus="handleSearch"></a-select>
      </a-form-item>

      <a-form-item name="project_module" label="项目模块">
        <a-select v-model:value="value" @focus="findModule" mode="multiple" :show-arrow="true">
          <a-select-opt-group v-for="project in project_module" :label="project.project_name">
            <a-select-option v-for="module in project.module" :value="module.module_id">{{ module.module_name
              }}</a-select-option>
          </a-select-opt-group>
        </a-select>

      </a-form-item>
      <a-row justify="space-between">

        <a-col :span="9">
          <a-form-item label="上课时间" name="semester">
            <a-select v-model:value="formState.semester" placeholder="选择学期" :options="semester"></a-select>
          </a-form-item>
        </a-col>

        <a-col :span="7">
          <a-form-item name="course_startTime">
            <a-date-picker show-time v-model:value="formState.course_startTime" placeholder="开始时间" />
          </a-form-item>
        </a-col>

        <a-col :span="7">
          <a-form-item name="course_endTime">
            <a-date-picker s show-time v-model:value="formState.course_endTime" placeholder="结束时间" />
          </a-form-item>
        </a-col>
      </a-row>



    </a-form>
  </a-modal>

</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, computed } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { Rule } from 'ant-design-vue/es/form';
import CourseDao from '@/daos/course_dao';
const labelCol = { style: { width: '90px' } };
const courseDao = new CourseDao();

//控制窗口打开状态
const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const visible = computed(() => {
  return ref(props.modelVisible)
});
const emit = defineEmits(['update:modelVisible']);

const semester = [
  {
    value: 1,
    label: '2023-2024第一学期',
  },
  {
    value: 2,
    label: '2023-2024第二学期',
  },
  {
    value: 3,
    label: '2024-2025第一学期',
  },
  {
    value: 4,
    label: '2024-2025第二学期'
  }
]
//学院
const options2 = [
  {
    value: '1',
    label: '计算机工程学院',
  },
  {
    value: '2',
    label: '大数据学院',
  },
  {
    value: '3',
    label: '管理学院',
  },

]

//项目数据
const project = ref([
])
//点击收缩框获取项目数据
const handleSearch = () => {
  project.value = [
    {
      project_id: 1111,
      project_name: '项目式教学',
    },
    {
      project_id: 1112,
      project_name: '虚拟学院',
    },

  ]
};
//项目搜索筛选
const filterOption = (input: string, option: any) => {
  return option.project_name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
//选择玩项目后触发
const project_module = ref()
const findModule = () => {
  project_module.value = [{
    project_id: 1111,
    project_name: '项目式教学',
    module: [{
      module_id: 1113546,
      module_name: "数据库设计"
    }, {
      module_id: 1113547,
      module_name: "页面设计"
    }, {
      module_id: 1113548,
      module_name: "前端开发"
    }, {
      module_id: 111359,
      module_name: "后端开发"
    },]

  }, {
    project_id: 1112,
    project_name: '虚拟教研室',
    module: [{
      module_id: 111354611,
      module_name: "数据库设计"
    }, {
      module_id: 11135471,
      module_name: "页面设计"
    }, {
      module_id: 11135481,
      module_name: "前端开发"
    }, {
      module_id: 1113591,
      module_name: "后端开发"
    },]

  }]

};
const value = ref<string[]>([]);

interface Values {
  course_name: string;
  course_type: string;
  periods: number;
  college: string;
  semester:string;
  type: string;
  project: [];
  course_startTime: dayjs.Dayjs;
  course_endTime: dayjs.Dayjs;
 
}

const formRef = ref<FormInstance>();

const formState = reactive<Values>({
  course_name: '',
  course_type: '',
  periods: null,
  semester:'',
  type: null,
  college: '',
  project: [],
  course_startTime: null,
  course_endTime: null,

});

const onOk = () => {
  formRef.value
    .validateFields()
    .then(async values => {
      console.log('Received values of form: ', values);
      console.log('formState: ', toRaw(formState));
      emit('update:modelVisible', false);
      let result = await courseDao.createCourse(toRaw(formState)) 
      formRef.value.resetFields();
      console.log('reset formState: ', toRaw(formState));
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};
//表单验证
const rules: Record<string, Rule[]> = {
  course_name: [
    { required: true, message: '课程名不能为空', trigger: 'blur' },

  ],
  college: [{ required: true, message: '请选择学院', trigger: 'blur' }],
  course_type: [{ required: true, message: '请选择课程类型', trigger: 'blur', }],
semester:[{ required: true, message: '请选择学期', trigger: 'blur', }],
  course_startTime: [{ required: true, message: '请选择开始时间', trigger: 'blur',}],
  course_endTime: [{ required: true, message: '请选择结束时间', trigger: 'blur',  }],
};
</script>

<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>