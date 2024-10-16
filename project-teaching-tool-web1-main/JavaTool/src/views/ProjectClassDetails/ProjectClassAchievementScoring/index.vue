<template>
    <div class="all">
        <a-radio-group v-model:value="statusFilter" button-style="solid">
            <a-space>
                <a-radio-button value="">全部任务</a-radio-button>
                <a-radio-button value="进行中">小组任务</a-radio-button>
                <a-radio-button value="未完成">个人任务</a-radio-button>
            </a-space>

            <div class="action-buttons">
                <a-button type="primary" style="margin-right: 10px">批量评分</a-button>
            </div>
        </a-radio-group>
        <div class="filter">
            <span class="filter-title">筛选查询</span>
            <a-form ref="formRef" :model="formState" name="select" autocomplete="off" layout="inline"
                class="form-filter">
                <div style="display: flex; flex-wrap: wrap">

                    <a-form-item label="选择任务" name="taskName" placeholder="输入任务名称">
                        <a-select v-model:value="formState.taskName" :options="taskOptions"
                            :filter-option="filterOption" show-search style="min-width: 100px;" />
                    </a-form-item>
                    <a-form-item label="负责小组" name="task_group" placeholder="请选择负责小组">
                        <a-select v-model:value="formState.task_group" :options="groupOptions"
                            :filter-option="filterOption" show-search style="min-width: 100px;" />
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
        <ProjectClassAchievementScoringTable />
    </div>

</template>

<script lang="ts" setup>
import { h, ref, reactive } from 'vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { FormInstance, SelectProps } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import ProjectClassAchievementScoringTable from './ProjectClassAchievementScoringTable.vue'
// 顶部任务状态选取值
const statusFilter = ref<string>('');
dayjs.locale('zh-cn');

interface FormState {
    taskName: string;
    projectName: string;
    taskDate: [dayjs.Dayjs, dayjs.Dayjs];
    task_group: string;
}

const formState = reactive<FormState>({
    taskName: '',
    projectName: '',
    taskDate: [null, null],
    task_group: ''
});

const route = useRoute();
const Form = ref<number>();

console.log(route.path);
if (route.path === '/ProjectDetail/TaskDetail') {
    Form.value = 1;
} else {
    Form.value = 2;
}

// 表单Ref
const formRef = ref<FormInstance>();
const groupOptions = ref<SelectProps['options']>([
    {
        value: '第一小组',
        label: '第一小组',
    },
    {
        value: '第二小组',
        label: '第二小组',
    },
    {
        value: '第三小组',
        label: '第三小组',
    },
]);
const taskOptions = ref<SelectProps['options']>([
    {
        value: '前端设计',
        label: '前端设计',
    },
    {
        value: '后端开发',
        label: '后端开发',
    },
    {
        value: '需求分析',
        label: '需求分析',
    },
]);
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
const isCreatelTaskVisible = ref(false);
const isPublishlTaskVisible = ref(false);
const showCheckbox = ref(false);

// 管理选中的行的键值
const selectedRowKeys = ref<Set<string>>(new Set());

const publishTask = () => {
    showCheckbox.value = true;
    isPublishlTaskVisible.value = true;
    console.log(isPublishlTaskVisible.value);

};
const createTask = () => {
    isCreatelTaskVisible.value = true;
};

//选择器搜索框
const filterOption = (input: string, option: any) => {
    console.log(input);
    console.log(option);
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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