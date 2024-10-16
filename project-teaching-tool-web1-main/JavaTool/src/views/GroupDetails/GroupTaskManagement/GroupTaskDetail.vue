<template>
  <div class="all">
    <a-radio-group v-model:value="statusFilter" button-style="solid">
      <a-space size="middle">
        <a-radio-button value="">全部任务</a-radio-button>
        <a-radio-button value="进行中">进行中的任务</a-radio-button>
        <a-radio-button value="未完成">未完成任务</a-radio-button>
        <a-radio-button value="已完成">已完成任务</a-radio-button>
        <a-radio-button value="已归档">已归档任务</a-radio-button>
        <a-badge :count="5">
          <a-radio-button value="待领取">领取任务</a-radio-button>
        </a-badge>
      </a-space>
      <div class="action-buttons">
        <a-button
          type="primary"
          @click="publishTask"
          style="margin-right: 10px; background-color: green"
        >
          发布任务
        </a-button>
        <CreateTask />
      </div>
    </a-radio-group>

    <div class="filter">
      <span class="filter-title">筛选查询</span>

      <a-form
        ref="formRef"
        :model="formState"
        name="select"
        autocomplete="off"
        layout="inline"
        class="form-filter"
      >
        <div style="display: flex; flex-wrap: wrap">
          <a-form-item label="任务名称" name="taskName" placeholder="输入任务名称">
            <a-input v-model:value="formState.taskName" />
          </a-form-item>
          <a-form-item label="项目名称" name="projectName" placeholder="输入项目名称">
            <a-input v-model:value="formState.projectName" />
          </a-form-item>
          <a-form-item label="任务时间" name="taskDate">
            <a-range-picker v-model:value="formState.taskDate" show-time :locale="locale" />
          </a-form-item>
        </div>
        <div>
          <a-form-item>
            <a-button type="primary" :icon="h(SearchOutlined)" @click="onSubmit">查询</a-button>
          </a-form-item>
          <a-form-item>
            <a-button :icon="h(RedoOutlined)" @click="resetForm">重置</a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>

    <!-- 静态显示的 ProjectTaskTable 组件 -->
    <GroupTaskTable />

    <!-- 浮窗显示的 PersonalTask 组件 -->
    <a-modal
      v-model:open="isPersonalTaskVisible"
      title="任务列表"
      @cancel="handleModalCancel"
      @ok="handleModalOk"
      width="80%"
      cancelText="取消"
      okText="发布"
    >
      <GroupPublishTask :raskHead="false" :showCheckbox="showCheckbox" :Form="Form" />
      <!-- <PersonalTask :raskHead="false" :showCheckbox="showCheckbox" :Form="Form" /> -->
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, reactive } from 'vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { FormInstance } from 'ant-design-vue';
import GroupTaskTable from './GroupTaskTable.vue';
import GroupPublishTask from './GroupPublishTask.vue';

// 顶部任务状态选取值
const statusFilter = ref<string>('');
dayjs.locale('zh-cn');

interface FormState {
  taskName: string;
  projectName: string;
  taskDate: [dayjs.Dayjs, dayjs.Dayjs];
}

const formState = reactive<FormState>({
  taskName: '',
  projectName: '',
  taskDate: [null, null]
});

// 表单Ref
const formRef = ref<FormInstance>();

const onSubmit = () => {
  console.log(formState);
};

const resetForm = () => {
  formRef.value?.resetFields();
  formState.taskName = '';
  formState.projectName = '';
  formState.taskDate = [null, null];
};

// 控制 PersonalTask 浮窗的显示状态
const isPersonalTaskVisible = ref(false);

const publishTask = () => {
  isPersonalTaskVisible.value = true;
};

const handleModalCancel = () => {
  isPersonalTaskVisible.value = false;
};

const handleModalOk = () => {
  // 提交或者确认操作
  isPersonalTaskVisible.value = false;
};
</script>

<style scoped>
.all {
  background: #fff;
  padding: 15px;
  display: flex;
  height: 100%;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid lightgray;
}

.filter {
  margin: 10px 0;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(230, 231, 236);
}

.filter-title {
  background: rgb(230, 231, 236);
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.form-filter {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-filter div {
  display: flex;
}

.action-buttons {
  margin-right: 20px;
  float: right;
  display: flex;
  align-items: center;
}
</style>