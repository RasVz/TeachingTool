<template>
  <div>
    <div class="head">
    <a-radio-group v-model:value="value" button-style="solid">
      <a-space size="middle">
        <a-radio-button value="进行中">进行中的项目</a-radio-button>
        <a-radio-button value="暂停">暂停的项目</a-radio-button>
        <a-radio-button value="未完成">未完成项目</a-radio-button>
        <a-radio-button value="已完成">已完成项目</a-radio-button>
        <a-radio-button value="已归档">已归档项目</a-radio-button>
        <a-radio-button value="">全部项目</a-radio-button>
      </a-space>

      <div style="margin-right: 25px; float: right">
        <a-button type="primary" @click="visible1 = true">新增项目</a-button>
      </div>
    </a-radio-group>
  </div>

  <div class="body">
    <AllProject />
  </div>
  </div>
 
  <CreateProject
    :modelVisible="visible1"
    @update:modelVisible="
      (val) => {
        visible1 = val;
      }
    "
  />
</template>

<script lang="ts" setup>
import { h, ref, reactive } from 'vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { FormInstance } from 'ant-design-vue';
import AllProject from '@/views/ProjectList/AllProject.vue';
import CreateProject from '@/components/Project/CreateProject.vue';
//创建任务窗口状态
const visible1 = ref<boolean>(false);

//顶部任务状态选取值
const value = ref<string>('');
dayjs.locale('zh-cn');
//表单对应数据接口
interface FormState {
  taskName: string;
  projectName: string;
  taskDate: [dayjs.Dayjs, dayjs.Dayjs];
}
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
  console.log(formState);
};
//清空筛选框内容
const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style scoped>
.head {
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  margin: 1%;
  height: auto;
  /* 使容器高度为视口高度 */
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}

.body {
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  margin: 1%;
  height: 83%;
  min-height: 83%;
  max-height: 83%;
  /* 使容器高度为视口高度 */
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #fff;
  overflow: auto;
}
</style>