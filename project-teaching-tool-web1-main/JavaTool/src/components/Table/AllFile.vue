<template>
  <a-table :columns="computedColumns" :data-source="data" class="data-table">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'selection'">
        <a-checkbox
          :checked="isRowSelected(record.key)"
          @change="handleCheckboxChange($event, record.key)"
        />
      </template>
      <template v-else-if="column.dataIndex === 'fileName'">
        <span class="font-size">{{ record.fileName }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'creator'">
        <span class="font-size">{{ record.creator }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'updateTime'">
        <span class="font-size">{{ record.updateTime }}</span>
      </template>
      <template v-else-if="column.key === 'action'">
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
</template>
  
  <script lang="ts" setup>
import { defineProps, ref, computed, watch } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';

const props = defineProps<{ data?: any[]; statusFilter?: string }>();

const columns = [
  {
    dataIndex: 'selection',
    align: 'center' as 'center',
    width: 60
  },
  {
    title: '文档名称',
    dataIndex: 'fileName',
    align: 'center' as 'center',
    key: 'fileName'
  },
  {
    title: '小组名称',
    dataIndex: 'creator',
    align: 'center' as 'center',
    key: 'creator'
  },
  {
    title: '所属任务',
    dataIndex: 'taskName',
    align: 'center' as 'center',
    key: 'taskName'
  },
  {
    title: '提交时间',
    dataIndex: 'updateTime',
    align: 'center' as 'center',
    key: 'updateTime'
  },
  {
    title: '操作',
    align: 'center' as 'center',
    key: 'action'
  }
];

const data = ref(props.data || []);

const selectedRowKeys = ref<string[]>([]);

const handleCheckboxChange = (event: any, key: string) => {
  const { checked } = event.target;
  if (checked) {
    selectedRowKeys.value.push(key);
  } else {
    selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== key);
  }
};

const isRowSelected = (key: string) => {
  return selectedRowKeys.value.includes(key);
};

const creatorField = computed(() => {
  return 'creator'; // 始终使用 'creator' 字段
});

const computedColumns = computed(() => {
  return columns.map((col) => ({
    ...col,
    title:
      col.dataIndex === 'creator'
        ? props.statusFilter === '进行中'
          ? '小组名称'
          : '学生姓名'
        : col.title
  }));
});

watch(
  () => props.data,
  (newData) => {
    data.value = newData || [];
  }
);
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
</style>