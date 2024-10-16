<template>
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
        <a-form-item label="文档名称" name="documentName" class="form-item-margin">
          <a-select
            show-search
            :filter-option="filterOption"
            v-model:value="formState.documentName"
            placeholder="选择文档名称"
            style="width: 150px"
          >
            <a-select-option v-for="doc in documentOptions" :key="doc" :value="doc">
              {{ doc }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="任务类型" name="taskType" class="form-item-margin">
          <a-select
            show-search
            v-model:value="formState.taskType"
            placeholder="选择任务类型"
            style="width: 150px"
          >
            <a-select-option value="小组任务">小组任务</a-select-option>
            <a-select-option value="个人任务">个人任务</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="所属任务" name="taskName" class="form-item-margin">
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

        <a-form-item :label="creatorLabel" name="creator" class="form-item-margin">
          <a-select
            show-search
            :filter-option="filterOption"
            v-model:value="formState.creator"
            placeholder="选择学生姓名"
            style="width: 150px"
          >
            <a-select-option v-for="creator in creatorOptions" :key="creator" :value="creator">
              {{ creator }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="更新时间" name="updateTime" class="form-item-margin">
          <a-date-picker
            v-model:value="formState.updateTime"
            format="YYYY-MM-DD"
            placeholder="选择更新时间"
            style="width: 100%"
          />
        </a-form-item>
      </div>

      <div style="display: flex; width: auto">
        <a-button style="margin-right: 10px; margin-top: 5px" type="primary" @click="filterData">
          查询
        </a-button>
        <a-button style="margin-right: 10px; margin-top: 5px" @click="resetForm">重置</a-button>
      </div>
    </div>
  </a-form>

  <!-- 数据表格 -->
  <a-table
    :columns="columns"
    :data-source="filteredData"
    class="data-table"
    :pagination="false"
    :row-selection="rowSelection"
  >
    <!-- 列头 -->
    <template #headerCell="{ column }">
      <!-- 不再包含选择列 -->
    </template>
    <!-- 表体 -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'fileName'">
        <span class="font-size">{{ record.fileName }}</span>
      </template>
      <template v-if="column.dataIndex === 'creator'">
        <span class="font-size">{{ record.creator }}</span>
      </template>
      <template v-if="column.dataIndex === 'updateTime'">
        <span class="font-size">{{ record.updateTime }}</span>
      </template>
      <template v-if="column.key === 'action'">
        <span class="a-style">
          <a>预览</a>
          <a-divider type="vertical" />
          <a>下载</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">更多<DownOutlined /></a>
        </span>
      </template>
    </template>
  </a-table>

  <!-- 分页器 -->
  <a-pagination
    v-model:current="current"
    :total="500"
    style="text-align: center; bottom: 0%; margin-top: 1%"
  />
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';

// 定义 props
const props = defineProps<{
  statusFilter: string;
}>();

// 列定义
const columns = computed(() => [
  {
    title: '',
    dataIndex: 'checkbox',
    align: 'center',
    key: 'checkbox'
  },
  {
    title: '文档名称',
    dataIndex: 'fileName',
    align: 'center',
    key: 'fileName'
  },
  {
    title:
      formState.value.taskType === '小组任务'
        ? '小组名称'
        : props.statusFilter === '进行中'
        ? '小组名称'
        : '学生姓名',
    dataIndex: 'creator',
    align: 'center',
    key: 'creator'
  },
  {
    title: '任务类型',
    dataIndex: 'taskType',
    align: 'center',
    key: 'taskType'
  },
  {
    title: '所属任务',
    dataIndex: 'taskName',
    align: 'center',
    key: 'taskName'
  },
  {
    title: '提交时间',
    dataIndex: 'updateTime',
    align: 'center',
    key: 'updateTime'
  },
  {
    title: '操作',
    align: 'center',
    key: 'action'
  }
]);

// 数据
const originalData = ref([
  {
    key: '1',
    fileName: '《软件工程导论》',
    creator: '张三',
    taskName: '需求分析',
    updateTime: '2024-08-06',
    taskType: '小组任务' // 添加任务类型字段
  },
  {
    key: '2',
    fileName: '《计算机组成原理》',
    creator: '李四',
    taskName: '需求分析',
    updateTime: '2024-08-06',
    taskType: '个人任务'
  },
  {
    key: '3',
    fileName: '《c#》',
    creator: '王五',
    taskName: '需求分析',
    updateTime: '2024-08-06',
    taskType: '个人任务'
  }
]);

const data = ref([...originalData.value]);

const formState = ref({
  documentName: '',
  taskName: '',
  creator: '',
  updateTime: null,
  taskType: '' // 添加任务类型字段
});

const documentOptions = computed(() =>
  Array.from(new Set(data.value.map((item) => item.fileName)))
);

const taskOptions = computed(() => Array.from(new Set(data.value.map((item) => item.taskName))));

const creatorOptions = computed(() => Array.from(new Set(data.value.map((item) => item.creator))));

const creatorLabel = computed(() => {
  return props.statusFilter === '进行中' ? '小组名称' : '学生姓名';
});

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().includes(input.toLowerCase());
};

// 过滤后的数据
const filteredData = computed(() => {
  return data.value.filter((item) => {
    const matchesDocumentName =
      !formState.value.documentName || item.fileName.includes(formState.value.documentName);
    const matchesTaskName =
      !formState.value.taskName || item.taskName.includes(formState.value.taskName);
    const matchesCreator =
      !formState.value.creator || item.creator.includes(formState.value.creator);
    const matchesUpdateTime =
      !formState.value.updateTime ||
      item.updateTime === formState.value.updateTime.format('YYYY-MM-DD');
    const matchesTaskType = !formState.value.taskType || item.taskType === formState.value.taskType;

    return (
      matchesDocumentName &&
      matchesTaskName &&
      matchesCreator &&
      matchesUpdateTime &&
      matchesTaskType
    );
  });
});

// 选择行的键
const selectedRowKeys = ref<string[]>([]);

// 处理选择变化的函数
const onSelectChange = (selectedKeys: string[]) => {
  selectedRowKeys.value = selectedKeys;
};

// rowSelection 对象
const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: onSelectChange
}));

const filterData = () => {
  // 数据过滤已经由 `filteredData` 计算属性处理
};

const resetForm = () => {
  formState.value = {
    documentName: '',
    taskName: '',
    creator: '',
    updateTime: null,
    taskType: '' // 重置任务类型字段
  };
  // 重置数据为原始数据
  data.value = [...originalData.value];
};
</script>


<style scoped>
.data-table {
  flex: 1;
  margin-top: 10px;
  font-size: 18px;
  border-radius: 8px;
  width: 100%;
}

.font-size {
  font-size: 18px;
}

.a-style {
  font-size: 18px;
}

/* 为每个 a-form-item 添加底部边距 */
.form-item-margin {
  margin-bottom: 10px; /* 调整这个值以设置间距 */
}
</style>
