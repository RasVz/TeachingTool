<template>

    <a-modal v-model:open="isCreatelTaskVisible.value" title="新增任务" ok-text="确认" cancel-text="取消"
        @cancel="emit('update:isCreatelTaskVisible', false); formRef.resetFields()" style="width: 1000px">
        <a-layout style="height: 500px; overflow: hidden">
            <!-- 侧边栏 -->
            <a-layout-sider :collapsed="collapsed" width="300px"
                style="background: #f0f2f5; overflow-y: auto; padding: 16px">
                <!-- 收起/展开按钮 -->
                <a-button @click="toggleCollapse" style="margin-bottom: 10px; width: 100%; text-align: center"
                    :icon="collapsed ? '>' : '已有任务'">
                </a-button>
                <!-- 仅在侧边栏展开时渲染任务列表 -->
                <a-collapse v-if="!collapsed" v-model:activeKey="activeTaskKey" @change="handleCollapseChange"
                    :accordion="false" style="margin-top: 20px">
                    <a-collapse-panel v-for="task in taskList" :key="task.key" :header="task.name" :name="task.key"
                        class="task-panel">
                        <div class="task-details" :class="{ active: activeTask === task.key }"
                            @click="handleTaskClick(task)">
                            <div class="task-detail-item"><strong>任务名称:</strong> {{ task.name }}</div>
                            <div class="task-detail-item"><strong>任务描述:</strong> {{ task.desc }}</div>
                            <div class="task-detail-item"><strong>所属项目:</strong> {{ task.project }}</div>
                            <div class="task-detail-item"><strong>模块:</strong> {{ task.module }}</div>
                            <div class="task-detail-item">
                                <strong>承担小组:</strong> {{ task.team.join(', ') }}
                            </div>
                            <div class="task-detail-item"><strong>任务期限:</strong> {{ task.endTime }}</div>
                        </div>
                    </a-collapse-panel>
                </a-collapse>
                <!-- 当侧边栏折叠时显示占位符 -->
                <div v-if="collapsed" style="text-align: center; padding: 20px; color: #888">
                    <p>点击上面按钮可查看已有任务</p>
                </div>
            </a-layout-sider>

            <!-- 主要内容区 -->
            <a-layout style="padding: 16px">
                <div class="form-container">
                    <a-button @click="resetForm" class="reset-button" type="default"> 重置 </a-button>
                    <a-form ref="formRef" :label-col="labelCol" :model="formState" layout="horizontal"
                        name="form_in_modal" style="width: 100%; display: flex; flex-direction: column">
                        <a-form-item name="task_name" label="任务名称">
                            <a-input v-model:value="formState.task_name" style="width: 90%" />
                        </a-form-item>
                        <a-form-item name="task_desc" label="任务描述">
                            <a-textarea v-model:value="formState.task_desc" style="width: 90%" />
                        </a-form-item>
                        <a-form-item name="task_module" label="所属模块">
                            <a-select show-search placeholder="选择模块" :options="moduleOptions"
                                v-model:value="formState.task_module" style="width: 90%" />
                        </a-form-item>
                        <a-form-item name="task_team" label="承担小组">
                            <a-select placeholder="选择小组" mode="multiple" :options="teamOptions"
                                v-model:value="formState.task_team" style="width: 90%" />
                        </a-form-item>
                        <a-form-item name="task_endTime" label="任务期限">
                            <a-date-picker show-time v-model:value="formState.task_endTime" :locale="locale"
                                style="width: 90%" />
                        </a-form-item>

                        <div style="display: flex; width: 100%" v-for="(item, index) in formState.deliverables"
                            :key="index" class="deliverable-item">
                            <a-form-item name="deliverable_name" label="交付物" style="width: 100%">
                                <a-input v-model:value="item.deliverable_name" />
                            </a-form-item>
                            <a-form-item name="deliverable_doc" style="margin-left: 10px; width: 100%" label="交付物模板">
                                <a-upload v-model:file-list="item.deliverable_doc" name="file" action=""
                                    @change="handleChange">
                                    <a-button>
                                        <UploadOutlined />
                                        点击上传文件
                                    </a-button>
                                </a-upload>
                            </a-form-item>
                            <a-button style="margin-left: 10px" danger shape="circle" @click="deleteDeliverable(index)">
                                <DeleteOutlined />
                            </a-button>
                        </div>

                        <a-form-item label="交付物">
                            <a-button @click="addDeliverable" type="primary" shape="circle">
                                <PlusOutlined />
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </a-layout>
        </a-layout>
    </a-modal>


</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { UploadOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { computed, reactive, ref, toRaw } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { SelectProps } from 'ant-design-vue';
dayjs.locale('zh-cn');

const labelCol = { style: { width: '80px' } };
const addDeliverable = () => {
    let deliverable = reactive({ deliverable_name: '', deliverable_doc: [] });
    formState.deliverables.push(deliverable);
};
const deleteDeliverable = (index: number) => {
    formState.deliverables.splice(index, 1);
};

interface Deliverable {
    deliverable_name: string;
    deliverable_doc: any[];
}
interface Values {
    task_name: string;
    task_endTime: dayjs.Dayjs | null;
    task_team: string[];
    task_project: string;
    task_module: string;
    task_desc: string;
    deliverables: Deliverable[];
}
const props = defineProps({
    isCreatelTaskVisible: {
        type: Boolean,
        required: false
    }
})

const isCreatelTaskVisible = computed(() => {
    return ref(props.isCreatelTaskVisible)
});
const emit = defineEmits(['update:isCreatelTaskVisible']);

const formRef = ref<FormInstance | null>(null);
const visible = ref(false);
const collapsed = ref(false);
const formState = reactive<Values>({
    task_name: '',
    task_endTime: null,
    task_team: [],
    task_project: '',
    task_module: '',
    task_desc: '',
    deliverables: []
});

const moduleOptions = ref<SelectProps['options']>([]);
const teamOptions = ref<SelectProps['options']>([
    { value: 'team1', label: '小组1' },
    { value: 'team2', label: '小组2' },
    { value: 'team3', label: '小组3' },
    { value: 'team4', label: '小组4' },
]);


const activeTask = ref<string | null>(null);
const handleTaskClick = (task: any) => {
    formState.task_name = task.name;
    formState.task_desc = task.desc;
    formState.task_project = task.project;
    formState.task_module = task.module;
    formState.task_team = task.team;
    formState.task_endTime = dayjs(task.endTime);
    formState.deliverables = []; // 清空交付物或根据任务获取

    // 更新激活任务
    activeTask.value = task.key;
};

const onOk = () => {
    formRef.value
        ?.validateFields()
        .then(() => {
            console.log('表单接收到的值: ', toRaw(formState));
            visible.value = false;
            formRef.value?.resetFields();
        })
        .catch((info) => {
            console.log('验证失败:', info);
        });
};

const resetForm = () => {
    formRef.value?.resetFields();
    formState.task_name = '';
    formState.task_desc = '';
    formState.task_project = '';
    formState.task_module = '';
    formState.task_team = [];
    formState.task_endTime = null;
    formState.deliverables = [];
};

const taskList = [
    {
        key: 'task1',
        name: '任务1',
        desc: '任务描述1',
        project: 'project1',
        module: 'module1',
        team: ['team1'],
        endTime: '2024-08-15T12:00:00Z'
    },
    {
        key: 'task2',
        name: '任务2',
        desc: '任务描述2',
        project: 'project2',
        module: 'module3',
        team: ['team2'],
        endTime: '2024-08-20T12:00:00Z'
    },
    {
        key: 'task3',
        name: '任务3',
        desc: '任务描述3',
        project: 'project1',
        module: 'module2',
        team: ['team1'],
        endTime: '2024-09-01T12:00:00Z'
    },
    {
        key: 'task4',
        name: '任务4',
        desc: '任务描述4',
        project: 'project2',
        module: 'module3',
        team: ['team2'],
        endTime: '2024-09-10T12:00:00Z'
    },
    {
        key: 'task5',
        name: '任务5',
        desc: '任务描述5',
        project: 'project2',
        module: 'module3',
        team: ['team2'],
        endTime: '2024-09-10T12:00:00Z'
    }
];

const activeTaskKey = ref<string[]>([]);

const handleCollapseChange = (keys: string[]) => {
    const taskKey = keys[0];
    if (taskKey) {
        const task = taskList.find((t) => t.key === taskKey);
        if (task) {
            formState.task_name = task.name;
            formState.task_desc = task.desc;
            formState.task_project = task.project;
            formState.task_module = task.module;
            formState.task_team = task.team;
            formState.task_endTime = dayjs(task.endTime);
            formState.deliverables = []; // 清空交付物或根据任务获取
        }
    }
    activeTaskKey.value = keys;
};

const handleChange = (info: any) => {
    if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
    } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
    }
};

const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
};
</script>

<style scoped>
.task-panel {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, border-color 0.3s;
}

.task-panel:hover {
    background: #e6f7ff;
    border-color: #1890ff;
}

.task-details {
    padding: 7px;
    cursor: pointer;
    /* 显示指针光标，表示可以点击 */
    transition: background-color 0.3s, border-color 0.3s;
}

.task-details:hover {
    background-color: #e6f7ff;
    /* 鼠标悬停时背景色变化 */
}

.task-details.active {
    background-color: #eef1f3;
    /* 点击后的背景色 */
}

.task-detail-item {
    padding: 5px 0;
    border-bottom: 1px solid #f0f0f0;
}

.task-detail-item:last-child {
    border-bottom: none;
}

.deliverable-item {
    align-items: center;
    display: flex;
    margin-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
}

.deliverable-item:last-child {
    border-bottom: none;
}

.form-container {
    display: flex;
    flex-direction: column;
    position: relative;
}

.reset-button {
    align-self: flex-end;
    margin-bottom: 7px;
    font-size: 15px;
    color: #ffffff;
    background-color: #2aa146;
    border-radius: 10px;
}
</style>