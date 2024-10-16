<template>


  <a-modal v-model:open="visible.value" title="新建项目" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel="formRef.resetFields()
  emit('update:modelVisible', false);" :maskClosable="false" style="width: 710px;">
    <a-form ref="formRef" :model="formState" layout="horizontal" name="form_in_modal">
      <a-form-item name="project_name" label="项目名称"
        :rules="[{ required: true, message: 'Please input the title of collection!' }]">
        <a-input v-model:value="formState.project_name" size="large" />
      </a-form-item>
      <a-form-item name="project_desc" label="项目描述"
        :rules="[{ required: true, message: 'Please input the title of collection!' }]">
        <a-textarea :rows="2" v-model:value="formState.project_desc" size="large" />


        
      </a-form-item>
      <a-form-item name="project_module" label="项目模块"
        :rules="[{ required: true, message: 'Please input the title of collection!' }]">
        <a-select v-model:value="formState.project_module" mode="tags" style="width: 80%" placeholder="选择项目模块"
          :options="options3" @change="handleChange"   size="large"></a-select>
      </a-form-item>

      <a-form-item name="project_startTime" label="开始时间">
        <a-date-picker show-time v-model:value="formState.project_startTime" :locale="locale" size="large" />
      </a-form-item>
      <a-form-item name="project_endTime" label="项目期限">
        <a-date-picker show-time v-model:value="formState.project_endTime" :locale="locale" size="large" />
      </a-form-item>

      <a-form-item name="project_manner" label="项目经理">
        <a-form-item-rest>
          <a-cascader v-model:value="value" :options="options1" placeholder="Please select" size="large"
            style="width: 30%;" />
        </a-form-item-rest>
        <a-select v-model:value="formState.project_manner" mode="tags" style="width: 50%" placeholder="选择负责人"
          :options="options2" @change="handleChange"   size="large"></a-select>
      </a-form-item>
    </a-form>
  </a-modal>

</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, computed } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { CascaderProps } from 'ant-design-vue';


const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};



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
//企业数据
const options1 = [
  {
    value: '企业',
    label: '企业',
    children: [
      {
        value: 'a企业id',
        label: 'a企业',
      },
      {
        value: 'b企业id',
        label: 'b企业',
      },
    ],
  },
  {
    value: '学院',
    label: '学院',
    children: [
      {
        value: 'a学院id',
        label: 'a学院',
      },
      {
        value: 'b学院id',
        label: 'b学院',
      },
    ],
  },
];
//项目经理数据
const options2 = [
  {
    value: '员工1id',
    label: '员工1',
  },
  {
    value: '员工2id',
    label: '员工2',
  },
  {
    value: '员工3id',
    label: '员工3',
  },

]
//模块数据
const options3 =[
{
    value: '模块1id',
    label: '模块1',
  },
  {
    value: '模块2id',
    label: '模块2',
  },
]
const value = ref<string[]>([]);




dayjs.locale('zh-cn');
interface Values {
  project_name: string;
  project_desc: string;
  project_module: [];
  project_startTime: dayjs.Dayjs;
  project_endTime: dayjs.Dayjs;
  project_manner: []
}

const formRef = ref<FormInstance>();

const formState = reactive<Values>({
  project_name: '',
  project_desc: '',
  project_module: [],
  project_startTime: null,
  project_endTime: null,
  project_manner: []
});

const onOk = () => {
  formRef.value
    .validateFields()
    .then(values => {
      console.log('Received values of form: ', values);
      console.log('formState: ', toRaw(formState));
      emit('update:modelVisible', false);
      formRef.value.resetFields();
      console.log('reset formState: ', toRaw(formState));
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};
</script>


<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>