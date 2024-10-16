<template>
    <a-table :columns="columns" :data-source="data" :bordered="true">
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'task_name'">
                <a @click="ViewTaskDetali">{{ text }}</a>
            </template>
            <template v-else-if="column.dataIndex === 'task_state'">
                <a-badge v-if="text === '进行中'" status="success" />
                <a-badge v-else-if="text === '未完成'" status="error" />
                <a-badge v-else-if="text === '已完成'" status="warning" />
                <a-badge v-else status="default" />
                <span>{{ text }}</span>
            </template>
            <template v-else-if="column.dataIndex === 'operate'">
                <div style="display: flex">
                    <a-button type="primary" @click="isSubmitVisible = true" style="margin-right: 5px">提交</a-button>
                    <a-button type="primary" @click="isTaskDetailsVisible = true"
                        style="margin-right: 5px">详情</a-button>
                </div>
            </template>
        </template>

    </a-table>

    <Submit :modelVisible="isSubmitVisible" @update:modelVisible="(val) => {
        isSubmitVisible = val;
    }
        " />
    <TaskDetails :modelVisible="isTaskDetailsVisible" @update:modelVisible="(val) => {
        isTaskDetailsVisible = val;
    }
        " />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TaskDetails from '@/components/Task/TaskDetails.vue';
import Submit from '@/components/Task/Submit.vue';

function ViewTaskDetali() {
    isTaskDetailsVisible.value = true;
}
// 定义组件的 props


// 定义显示弹窗的状态
const isSubmitVisible = ref<boolean>(false);
const isTaskDetailsVisible = ref<boolean>(false);

// 定义路由
const router = useRouter();
const toTaskList = () => {
    router.push('/TaskListView');
};

// 表格的列配置
const columns = [
    {
        title: '任务名称',
        width: 300,
        dataIndex: 'task_name',
        align: 'center' as 'center',
        //  className: 'custom-header-style'
    },
    {
        title: '所属模块',
        dataIndex: 'module_name',
        align: 'center' as 'center',
        // className: 'custom-header-style'
    },
  {
    title:'承担小组',
    dataIndex:'task_name',
    align: 'center' as 'center',
    //   className: 'custom-header-style'
  },
    {
        title: '结束时间',
        dataIndex: 'task_endTime',
        align: 'center' as 'center',
        // className: 'custom-header-style'
    },
    {
        title: '任务状态',
        dataIndex: 'task_state',
        align: 'center' as 'center',
        // className: 'custom-header-style'
    },

    {
        title: '操作',
        width: 100,
        dataIndex: 'operate',
        align: 'center' as 'center',
        // className: 'custom-header-style',
        // customHeaderCell: () => {
        //     return {
        //         style: { textAlign: 'center' as 'center' }
        //     };
        // }
    }
];

// 表格的数据
const data = [
    {
        key: '1',
        task_name: '数据库设计',
        project_name: '类淘宝商城系统',
        module_name: '模块1',
        task_startTime: '2024-5-1',
        task_endTime: '2024-6-7',
        task_state: '进行中'
    },
    {
        key: '2',
        task_name: '接口开发',
        project_name: '类淘宝商城系统',
        module_name: '模块1',
        task_startTime: '2024-5-1',
        task_endTime: '2024-7-1',
        task_state: '未完成'
    },
    {
        key: '3',
        task_name: '前端开发',
        project_name: '类淘宝商城系统',
        module_name: '模块1',
        task_startTime: '2024-5-1',
        task_endTime: '2024-8-15',
        task_state: '进行中'
    },
    {
        key: '4',
        task_name: '数据库设计',
        project_name: '类淘宝商城系统',
        module_name: '模块1',
        task_startTime: '2024-5-1',
        task_endTime: '2024-9-12',
        task_state: '已完成'
    }
];

// 选中的行的 key
const selectedRowKeys = ref<string[]>([]);

const handleCheckboxChange = (event: any, key: string) => {
    const { checked } = event.target;
    if (checked) {
        selectedRowKeys.value.push(key);
    } else {
        selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== key);
    }
};
// 检查某行是否被选中
const isRowSelected = (key: string) => {
    return selectedRowKeys.value.includes(key);
};

// 处理复选框变化
</script>

<style scoped>
th.column-money,
td.column-money {
    text-align: right !important;
}

a {
    /* font-size: 18px; */
    color: #61666d;
}


a:hover {
    color: #00aeec;
}


/* :deep(.ant-table-thead th.custom-header-style) {
    text-align: center;
    font-size: 20px;
    font-weight: 550;
}

:deep(.ant-table-cell.custom-header-style) {
    font-size: 18px;
} */
</style>