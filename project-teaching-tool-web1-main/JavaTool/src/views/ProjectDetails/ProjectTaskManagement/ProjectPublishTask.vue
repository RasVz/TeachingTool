<template>

    <a-modal v-model:open="isPublishlTaskVisible.value" title="发布任务" ok-text="确认" cancel-text="取消" width="800"
        @cancel="emit('update:isPublishlTaskVisible', false);">

        <label class="title">请选择小组：</label>
        <a-select v-model:value="value" mode="tags" style="width: 100%" placeholder="Tags Mode" :options="options"
            @change="handleChange"></a-select>
        <label class="title">请选择任务：</label>

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
                <template v-if="column.dataIndex === 'selection' && showCheckbox">
                    <a-checkbox :checked="isRowSelected(record.key)"
                        @change="handleCheckboxChange($event, record.key)" />
                </template>
            </template>
        </a-table>
    </a-modal>
    <TaskDetails :modelVisible="isTaskDetailsVisible" @update:modelVisible="(val) => {
        isTaskDetailsVisible = val;
    }
        " />
</template>

<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import TaskDetails from '@/components/Task/TaskDetails.vue';
import { FormInstance } from 'ant-design-vue';
const value = ref<string[]>([]);
const options = ref([
    { value: '小组1', label: '小组1' },
    { value: '小组2', label: '小组2' },
    { value: '小组3', label: '小组3' },
    { value: '小组4', label: '小组4' },
    { value: '小组5', label: '小组5' }
]);;
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
function ViewTaskDetali() {
    isTaskDetailsVisible.value = true;
}
// 定义组件的 props
const props = defineProps({
    showCheckbox: {
        type: Boolean,
        required: false
    },
    // Form: {
    //     type: Number,
    //     required: false
    // },
    show: {
        type: Boolean,
        required: false
    },
    isPublishlTaskVisible: {
        type: Boolean,
        required: false
    }
});
const isPublishlTaskVisible = computed(() => {
    return ref(props.isPublishlTaskVisible)
});
const emit = defineEmits(['update:isPublishlTaskVisible']);
// 定义显示弹窗的状态
const isTaskDetailsVisible = ref<boolean>(false);


// 定义路由
const router = useRouter();
const toTaskList = () => {
    router.push('/TaskListView');
};

// 表格的列配置
const columns = [
    {
        dataIndex: 'selection',
        align: 'center' as 'center',
        width: 60,
        className: 'custom-header-style',
    },
    {
        title: '任务名称',
        dataIndex: 'task_name',
        align: 'center' as 'center',
        className: 'custom-header-style'
    },

    {
        title: '任务期限',
        dataIndex: 'task_endTime',
        align: 'center' as 'center',
        className: 'custom-header-style'
    },
    {
        title: '任务状态',
        dataIndex: 'task_state',
        align: 'center' as 'center',
        className: 'custom-header-style'
    },
    {
        title: '任务描述',
        dataIndex: 'task_description',
        align: 'center' as 'center',
        className: 'custom-header-style'
    }
];

// 表格的数据
const data = [
    {
        key: '1',
        task_name: '数据库设计',
        project_name: '类淘宝商城系统',
        module_name: '模块1',
        task_endTime: '2024-6-7',
        task_state: '进行中',
        task_description: '任务简介·1'
    },
    {
        key: '2',
        task_name: '接口开发',
        project_name: '类淘宝商城系统',
        module_name: '模块1',
        task_endTime: '2024-7-1',
        task_state: '未完成',
        task_description: '任务简介·2'
    },
    {
        key: '3',
        task_name: '前端开发',
        project_name: '类淘宝商城系统',
        module_name: '模块2',
        task_endTime: '2024-8-15',
        task_state: '进行中',
        task_description: '任务简介·3'
    },
];

const formRef = ref<FormInstance>();


// 选中的行的 key
const selectedRowKeys = ref<string[]>([]);

// 检查某行是否被选中
const isRowSelected = (key: string) => {
    return selectedRowKeys.value.includes(key);
};



// const Form = props.Form;

// if (Form == 1) {
//     const index = columns.findIndex(
//         (column) => column.title === '所属项目' && column.dataIndex === 'project_name'
//     );
//     if (index !== -1) {
//         columns.splice(index, 1);
//     }
// }


// 处理复选框变化
const handleCheckboxChange = (event: any, key: string) => {
    const { checked } = event.target;
    if (checked) {
        selectedRowKeys.value.push(key);
    } else {
        selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== key);
    }
};

</script>

<style scoped>
th.column-money,
td.column-money {
    text-align: right !important;
}

a {
    font-size: 18px;
    color: #61666d;
}


a:hover {
    color: #00aeec;
}


:deep(.ant-table-thead th.custom-header-style) {
    text-align: center;
    font-size: 20px;
    font-weight: 550;
}

:deep(.ant-table-cell.custom-header-style){
    font-size: 18px;
}
</style>