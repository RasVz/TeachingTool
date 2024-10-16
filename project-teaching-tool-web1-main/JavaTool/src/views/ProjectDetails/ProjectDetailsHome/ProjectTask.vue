<template>
    <div class="task-content">
        <h4>任务列表</h4>

        <a-table :data-source="data" :columns="columns">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                    <span style="color: #1890ff">Name</span>
                </template>
            </template>
            <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                <div style="padding: 8px">
                    <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                    <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
                        @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
                        <template #icon>
                            <SearchOutlined />
                        </template>
                        Search
                    </a-button>
                    <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                        Reset
                    </a-button>
                </div>
            </template>
            <template #customFilterIcon="{ filtered }">
                <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
            </template>
            <template #bodyCell="{ text, column }">
                <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
                    <template v-for="(fragment, i) in text
                        .toString()
                        .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))">
                        <mark v-if="fragment.toLowerCase() === state.searchText.toLowerCase()" :key="i"
                            class="highlight">
                            {{ fragment }}
                        </mark>
                        <template v-else>{{ fragment }}</template>
                    </template>
                </span>
                <template v-if="column.dataIndex === 'task_name'">
                    <a class="task" type="primary" @click="visible2 = true">{{ text }}</a>
                </template>
            </template>
        </a-table>

    </div>
    <TaskDetails :modelVisible="visible2" @update:modelVisible="(val) => { visible2 = val }" />

</template>
<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
const visible2 = ref<boolean>(false);
const data = [
    {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    },
    {
        task_name: '后端',
        team_name: '第二小组',
        status: '已完成',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    },
    {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    }, {
        task_name: '前端',
        team_name: '第一小组',
        status: '进行中',
        time: '2023-05-01', //如果是进行中则返回截止时间，如果是已完成则返回提交时间
        operate: '',
    },

];

const state = reactive({
    searchText: '',
    searchedColumn: '',
});

const searchInput = ref();

const columns = [
    {
        title: '任务',
        dataIndex: 'task_name',
        key: 'task_name',
        customFilterDropdown: true,
        onFilter: (value, record) => record.task_name.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => {
                    searchInput.value.focus();
                }, 100);
            }
        },
    },
    {
        title: '负责小组',
        dataIndex: 'team_name',
        key: 'team_name',
        customFilterDropdown: true,
        onFilter: (value, record) => record.team_name.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => {
                    searchInput.value.focus();
                }, 100);
            }
        },
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: '20%',
        filters: [
            {
                text: '进行中',
                value: '进行中',
            },
            {
                text: '已完成',
                value: '已完成',
            },

        ],

        onFilter: (value, record) => record.status.startsWith(value),
    },

];


const paginationOptions = {
    pageSize: 7, // 每页显示的行数
    total: data.length, // 数据总行数
    onChange: page => {
        // 当分页改变时执行的操作
        console.log('Page changed:', page);
    },
};
const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    state.searchText = selectedKeys[0];
    state.searchedColumn = dataIndex;
};

const handleReset = clearFilters => {
    clearFilters({ confirm: true });
    state.searchText = '';
};
</script>
<style scoped>
.highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
}

h4 {
    font-size: 1rem;
    /* 增加字号 */
    color: white;
    /* 使用深色字体 */
    margin-bottom: 12px;
    /* 增加标题与内容之间的距离 */
    background-color: #cb9659;
    /* 橙色背景 */
    padding: 5px;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
}

.highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
}

.task-content {
    width: 100%;
    height: 100%;
}

a {
    color: black;
}
</style>