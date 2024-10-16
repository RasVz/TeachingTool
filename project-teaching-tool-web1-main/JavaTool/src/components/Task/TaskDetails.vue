<template>
    <div>
        <a-modal class="my-model" style="width: 700px;" v-model:open="visible.value" title="任务详情" ok-text="确认"
            cancel-text="取消" @cancel="formRef.resetFields()
            emit('update:modelVisible', false);" @ok="onOk" :maskClosable="false">
            <div class="model-head">
                <div class="model-head-title">
                    <span>{{ props.task.task_name }}</span>
                </div>
                <div class="model-head-state">
                    <h4>任务状态 :<span>{{ formState.task_status }}</span></h4>
                </div>
            </div>
            <a-form ref="formRef" class="form-content" :model="formState" layout="horizontal" name="form_in_modal"
                :label-col="labelCol" :wrapper-col="wrapperCol">
                <div>
                    <a-form-item name="task_requirements" label="任务要求:">
                        <a-textarea :rows="4" v-model:value="props.task.task_requirements" />
                    </a-form-item>
                    <a-form-item name="task_startTime" label="开始时间:">
                        <a-input v-model:value="props.task.task_startTime" disabled />
                    </a-form-item>
                    <a-form-item name="task_endTime" label="结束时间:">
                        <a-input v-model:value="props.task.task_endTime" disabled />
                    </a-form-item>
                    <a-form-item name="task_stakeholders" label="任务负责人:">
                        <a-input v-model:value="props.task.task_stakeholders" disabled />
                    </a-form-item>
                    <a-form-item name="task_project" label="所属项目:">
                        <a-input v-model:value="props.task.task_project" disabled />
                    </a-form-item>
                    <a-form-item name="task_project" label="交付物:">
                        <a-input v-model:value="props.task.task_project" disabled />
                    </a-form-item>
                </div>
                <div>
                    <a-form-item name="task_group" label="所属小组:">
                        <a-select v-model:value="formState.task_group" :options="groupoptions" />
                    </a-form-item>
                    <a-form-item name="task_socre" label="分数:">
                        <a-input v-model:value="props.task.task_socre" disabled />
                    </a-form-item>
                    <a-form-item name="teacher_comment" label="教师评价:">
                        <a-textarea :rows="5" v-model:value="formState.teacher_comment" />
                    </a-form-item>
                    <a-form-item name="leader_comment" label="项目经理评价:">
                        <a-textarea :rows="5" v-model:value="formState.leader_comment" />
                    </a-form-item>
                </div>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, computed } from 'vue';
import type { FormInstance, SelectProps } from 'ant-design-vue';
const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false,
    },
    task: {
        type: Object,
        default: () => ({ // 提供一个默认值对象，注意使用函数来返回对象，以避免所有实例共享同一个对象  
            task_name: '暂无任务',
            task_status: '无状态',
            task_requirements: '无描述',
            task_startTime: '空',
            task_endTime: '空',
            task_stakeholders: '空',
            task_project: '空',
            task_group: '空',
            task_socre: 2,
            teacher_comment: '空',
            leader_comment: '空 '
        }),
    }
})

const emit = defineEmits(['update:modelVisible'])

const visible = computed(() => {
    return ref(props.modelVisible)
})

const labelCol = { xs: { span: 24 }, sm: { span: 9 } };
const wrapperCol = { xs: { span: 24 }, sm: { span: 18 } };
interface Values {
    task_name: string;
    task_status: string;
    task_requirements: string;
    task_startTime: string;
    task_endTime: string;
    task_stakeholders: string;
    task_group: string;
    task_project: string;
    task_socre: number;
    teacher_comment: string;
    leader_comment: string;
}

const formRef = ref<FormInstance>();

const formState = reactive<Values>({
    task_name: '任务名称',
    task_status: '已完成',
    task_requirements: '',
    task_startTime: '',
    task_endTime: '',
    task_stakeholders: '',
    task_group: '',
    task_project: '',
    task_socre: 2,
    teacher_comment: '',
    leader_comment: ''
});
const groupoptions = ref<SelectProps['options']>([
    {
        value: '1',
        label: '第一小组',
    },
    {
        value: '2',
        label: '第二小组',
    },
    {
        value: '3',
        label: '第三小组',
    },
]);
const onOk = () => {
    formRef.value
        .validateFields()
        .then(values => {
            console.log('Received values of form: ', values);
            console.log('formState: ', toRaw(formState));
            emit('update:modelVisible', false)
            formRef.value.resetFields();
            console.log('reset formState: ', toRaw(formState));
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        });
};
</script>

<style scoped>
.my-model {
    width: 700px;
}

.model-head {
    border-bottom: 1px gainsboro solid;
    margin-bottom: 15px;
}

.model-head-title {
    width: 100%;
    text-align: center;

    span {
        font-size: large;
    }
}

.model-head-state {
    width: 100%;
    text-align: right;

    span {
        color: rgb(46, 49, 201);
    }
}

.form-content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>