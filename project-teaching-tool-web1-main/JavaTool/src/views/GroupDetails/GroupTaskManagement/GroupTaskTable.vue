<template>
  <div>
    <!-- 筛选栏 -->
    <a-form
      ref="formRef"
      :model="formState"
      name="select"
      autocomplete="off"
      layout="inline"
      style="padding: 5px; display: flex; justify-content: space-between; align-items: center"
    >
      <div style="width: 100%; display: flex; justify-content: space-between">
        <div style="display: flex; flex-wrap: wrap; width: 90%">
          <a-form-item label="任务名称" name="taskName" class="form-item-margin">
            <a-select
              show-search
              :filter-option="filterOption"
              v-model:value="formState.taskName"
              placeholder="选择任务名称"
              style="width: 150px"
            >
              <a-select-option v-for="task in taskOptions" :key="task" :value="task">
                {{ task }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="所属项目" name="projectName" class="form-item-margin">
            <a-select
              show-search
              :filter-option="filterOption"
              v-model:value="formState.projectName"
              placeholder="选择所属项目"
              style="width: 150px"
            >
              <a-select-option v-for="project in projectOptions" :key="project" :value="project">
                {{ project }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="任务状态" name="taskState" class="form-item-margin">
            <a-select
              show-search
              :filter-option="filterOption"
              v-model:value="formState.taskState"
              placeholder="选择任务状态"
              style="width: 150px"
            >
              <a-select-option v-for="status in statusOptions" :key="status" :value="status">
                {{ status }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="任务类型" name="taskType" class="form-item-margin">
            <a-select
              show-search
              :filter-option="filterOption"
              v-model:value="formState.taskType"
              placeholder="选择任务类型"
              style="width: 150px"
            >
              <a-select-option v-for="type in typeOptions" :key="type" :value="type">
                {{ type }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <div style="display: flex; width: auto">
          <a-button
            type="primary"
            style="
              margin-right: 10px;
              margin-top: 5px;
              font-size: 14px;
              padding: 5px 20px;
              border-radius: 4px;
            "
            @click="filterData"
          >
            查询
          </a-button>
          <a-button
            style="
              margin-right: 10px;
              margin-top: 5px;
              font-size: 14px;
              padding: 5px 20px;
              border-radius: 4px;
            "
            @click="resetForm"
          >
            重置
          </a-button>
        </div>
      </div>
    </a-form>

    <!-- 数据表格 -->
    <a-table :columns="columns" :data-source="filteredData" :bordered="true">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'task_name'">
          <a @click="viewTaskDetails(record)">{{ text }}</a>
        </template>
        <template v-else-if="column.dataIndex === 'task_state'">
          <a-badge :status="badgeStatus(text)" />
          <span>{{ text }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'operate'">
          <div style="display: flex; justify-content: center; align-items: center">
            <a-button
              type="primary"
              @click="visible1 = true"
              style="margin-right: 5px; font-size: 14px; padding: 5px 15px; border-radius: 4px"
            >
              提交
            </a-button>
            <a-button
              type="default"
              @click="viewTaskDetails(record)"
              style="font-size: 14px; padding: 5px 15px; border-radius: 4px"
            >
              详情
            </a-button>
          </div>
        </template>
        <template v-if="column.dataIndex === 'project_name'">
          <a @click="viewProjectDetail">{{ text }}</a>
        </template>
      </template>
    </a-table>

    <!-- 分页器 -->
    <a-pagination
      v-model:current="current"
      :total="data.length"
      style="text-align: center; margin-top: 10px"
    />

    <Submit :modelVisible="visible1" @update:modelVisible="(val) => (visible1 = val)" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Submit from '../../../components/Task/Submit.vue';

// 状态变量
const visible1 = ref(false);
const current = ref(1);

// 路由实例
const router = useRouter();

// 表格的列配置
const columns = [
  { title: '任务名称', width: 300, dataIndex: 'task_name', align: 'center' },
  { title: '所属项目', dataIndex: 'project_name', align: 'center' },
  { title: '任务期限', dataIndex: 'task_endTime', align: 'center' },
  { title: '任务类型', dataIndex: 'task_type', align: 'center' },
  { title: '任务状态', dataIndex: 'task_state', align: 'center' },
  { title: '操作', width: 100, dataIndex: 'operate', align: 'center' }
];

// 表格的数据
const originalData = ref([
  {
    key: '1',
    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-6-7',
    task_state: '进行中',
    task_type: '小组任务'
  },
  {
    key: '2',
    task_name: '接口开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-7-1',
    task_state: '未完成',
    task_type: '小组任务'
  },
  {
    key: '3',
    task_name: '前端开发',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-8-15',
    task_state: '进行中',
    task_type: '个人任务'
  },
  {
    key: '4',
    task_name: '数据库设计',
    project_name: '类淘宝商城系统',
    task_endTime: '2024-9-12',
    task_state: '已完成',
    task_type: '小组任务'
  }
]);

const data = ref([...originalData.value]);

// 筛选状态
const formState = ref({
  taskName: '',
  projectName: '',
  taskState: '',
  taskType: ''
});

const taskOptions = computed(() => Array.from(new Set(data.value.map((item) => item.task_name))));
const projectOptions = computed(() =>
  Array.from(new Set(data.value.map((item) => item.project_name)))
);
const statusOptions = computed(() =>
  Array.from(new Set(data.value.map((item) => item.task_state)))
);
const typeOptions = computed(() => Array.from(new Set(data.value.map((item) => item.task_type))));

const filterOption = (input: string, option: any) =>
  option.value.toLowerCase().includes(input.toLowerCase());

// 过滤后的数据
const filteredData = computed(() =>
  data.value.filter((item) => {
    const matchesTaskName =
      !formState.value.taskName || item.task_name.includes(formState.value.taskName);
    const matchesProjectName =
      !formState.value.projectName || item.project_name.includes(formState.value.projectName);
    const matchesTaskState =
      !formState.value.taskState || item.task_state.includes(formState.value.taskState);
    const matchesTaskType =
      !formState.value.taskType || item.task_type.includes(formState.value.taskType);
    return matchesTaskName && matchesProjectName && matchesTaskState && matchesTaskType;
  })
);

// 判断状态对应的 badge
const badgeStatus = (status: string) => {
  switch (status) {
    case '进行中':
      return 'success';
    case '未完成':
      return 'error';
    case '已完成':
      return 'warning';
    default:
      return 'default';
  }
};

// 跳转到项目详情页面
const viewProjectDetail = () => router.push({ name: 'ProjectDetailsView', params: { id: 1 } });

// 跳转到任务详情页面
const viewTaskDetails = (record: any) =>
  router.push({ name: 'groupTaskDetails', params: { taskId: record.key } });

// 重置表单和数据
const resetForm = () => {
  formState.value = {
    taskName: '',
    projectName: '',
    taskState: '',
    taskType: ''
  };
  data.value = [...originalData.value];
};

const filterData = () => {
  // 数据过滤已经由 `filteredData` 计算属性处理
};
</script>

<style scoped>
.form-item-margin {
  margin-bottom: 10px;
}

.ant-btn {
  font-size: 14px;
  padding: 5px 20px;
  border-radius: 4px;
}

.ant-btn-primary {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.ant-btn-primary:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.ant-btn-default {
  border-color: #d9d9d9;
  color: #595959;
}

.ant-btn-default:hover {
  border-color: #bfbfbf;
  color: #434343;
}
</style>
