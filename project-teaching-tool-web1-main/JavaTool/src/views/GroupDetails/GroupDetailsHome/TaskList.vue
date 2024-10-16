<template>
  <div class="task-content">
    <h4>任务列表</h4>
    <a-table
      :data-source="filteredData"
      :columns="columns"
      bordered
      :pagination="false"
      class="responsive-table"
    >
      <!-- 自定义过滤器下拉框 -->
      <template
        #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div class="filter-dropdown">
          <a-input
            ref="searchInput"
            :placeholder="`搜索 ${column.title}`"
            :value="selectedKeys[0]"
            @change="(e) => handleInputChange(e.target.value, setSelectedKeys, column.dataIndex)"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon>
              <SearchOutlined />
            </template>
            搜索
          </a-button>
          <a-button size="small" @click="handleReset(clearFilters)"> 重置 </a-button>
          <a-list
            :data-source="filteredOptions(column.dataIndex)"
            bordered
            size="small"
            class="filter-options-list"
          >
            <a-list-item
              v-for="(option, index) in filteredOptions(column.dataIndex)"
              :key="index"
              @click="handleOptionClick(option, setSelectedKeys, column.dataIndex)"
            >
              {{ option }}
            </a-list-item>
          </a-list>
        </div>
      </template>

      <!-- 自定义过滤器图标 -->
      <template #customFilterIcon="{ filtered }">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>

      <!-- 自定义单元格内容 -->
      <template #bodyCell="{ text, column }">
        <span v-if="shouldHighlight(text, column)">
          <template v-for="(fragment, i) in getHighlightedText(text)" :key="i">
            <mark class="highlight">{{ fragment }}</mark>
          </template>
        </span>
        <template v-else-if="column.dataIndex === 'status'">
          <a-badge v-if="text === '已完成'" status="success" />
          <a-badge v-else-if="text === '未完成'" status="error" />
          <a-badge v-else status="warning" />
          <span>{{ text }}</span>
        </template>
        <span v-else>
          {{ text }}
        </span>
      </template>
    </a-table>
    <!-- 分页器 -->
    <a-pagination
      v-model:current="current"
      :total="500"
      style="text-align: center; bottom: 0%; margin-top: 1%"
    />
  </div>
</template>

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue';
import { reactive, ref, computed } from 'vue';

// 模拟数据
const originalData = [
  {
    task_name: '任务 1',
    due_date: '2024-08-15',
    project: '项目 1',
    module: '模块 1',
    status: '未完成'
  },
  {
    task_name: '任务 A',
    due_date: '2024-08-25',
    project: '项目 1',
    module: '模块 2',
    status: '未完成'
  },
  {
    task_name: '任务 B',
    due_date: '2024-08-30',
    project: '项目 1',
    module: '模块 2',
    status: '已完成'
  },
  {
    task_name: '任务 X',
    due_date: '2024-09-05',
    project: '项目 2',
    module: '模块 A',
    status: '未完成'
  }
];

const state = reactive({
  searchText: '',
  searchedColumn: '',
  data: originalData
});

const handleInputChange = (value, setSelectedKeys, dataIndex) => {
  setSelectedKeys(value ? [value] : []);
  state.searchText = value;
  state.searchedColumn = dataIndex;
};

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters) => {
  clearFilters();
  state.searchText = '';
  state.searchedColumn = '';
};

const handleOptionClick = (option, setSelectedKeys, dataIndex) => {
  setSelectedKeys([option]);
  state.searchText = option;
  state.searchedColumn = dataIndex;
};

const getHighlightedText = (text) => {
  if (!state.searchText) return [text];
  const regex = new RegExp(`(${state.searchText})`, 'gi');
  return text.toString().split(regex).filter(Boolean);
};

const shouldHighlight = (text, column) => {
  return state.searchText && state.searchedColumn === column.dataIndex;
};

const filteredOptions = (dataIndex) => {
  const uniqueOptions = new Set(state.data.map((item) => item[dataIndex]).filter(Boolean));
  return Array.from(uniqueOptions).filter((option) =>
    option.toString().toLowerCase().includes(state.searchText.toLowerCase())
  );
};

const filteredData = computed(() => {
  if (!state.searchText) return state.data;
  const dataIndex = state.searchedColumn;
  return state.data.filter((item) =>
    item[dataIndex].toString().toLowerCase().includes(state.searchText.toLowerCase())
  );
});

const searchInput = ref();

const columns = [
  {
    title: '任务名称',
    dataIndex: 'task_name',
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.task_name.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    }
  },
  {
    title: '任务期限',
    dataIndex: 'due_date'
  },
  {
    title: '所属项目',
    dataIndex: 'project',
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.project.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    }
  },
  {
    title: '所属模块',
    dataIndex: 'module',
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.module.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    }
  },
  {
    title: '完成状态',
    dataIndex: 'status',
    customFilterDropdown: true,
    onFilter: (value, record) =>
      record.status.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    }
  }
];
</script>
<style scoped>
h4 {
  font-size: 1rem;
  color: white;
  margin-bottom: 12px;
  background-color: #cb9659;
  padding: 5px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.responsive-table {
  flex: 1;
  margin-top: 10px;
  font-size: 18px;
  border-radius: 8px;
  width: 100%;
}

.filter-dropdown {
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-dropdown a-input {
  width: 100%;
  max-width: 250px;
  margin-bottom: 4px;
}

.filter-dropdown a-button {
  width: 100%;
  max-width: 90px;
  margin-right: 8px;
}

.filter-options-list {
  max-height: 100px;
  overflow-y: auto;
}

.mark {
  background-color: yellow;
  font-weight: bold;
}
</style>
