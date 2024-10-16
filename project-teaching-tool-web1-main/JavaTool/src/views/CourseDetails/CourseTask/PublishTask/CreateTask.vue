<template>
    <div>

        <a-modal v-model:open="visible.value" title="新建任务" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel="formRef.resetFields()
        emit('update:modelVisible', false);" :maskClosable="false">
            <a-form ref="formRef" :model="formState" name="form_in_modal" :rules="rules" :label-col="labelCol">
                <a-form-item name="task_name" label="任务名称">
                    <a-input v-model:value="formState.task_name" />
                </a-form-item>
                <a-form-item name="project_id" label="所属项目" >
                    <a-select 
                    :field-names="{ label: 'project_name', value: 'project_id', options: 'children' }"      
                    @focus="projectFocus"
                    v-model:value="formState.project_id" :options="projectOptions" :loading="project_loading">
                    </a-select>
                </a-form-item>
        
                <a-form-item name="task_description" label="任务描述">
                    <a-textarea v-model:value="formState.task_description" :auto-size="{ minRows: 2, maxRows: 4}" :show-count="true" allowClear  />
                </a-form-item>

                <a-form-item name="task_type" label="任务类型">
                    <a-radio-group v-model:value="formState.task_type">
                        <a-radio :value="'小组任务'">小组任务</a-radio>
                        <a-radio :value="'个人任务'">个人任务</a-radio>
                    </a-radio-group>
                </a-form-item>


                <div style="display: flex; width: 100%" v-for="(item, index) in formState.deliverables" :key="index"
                    class="deliverable-item">
                    <a-form-item    :name="['deliverables', index, 'deliverable_name']"   label="交付物"    :rules="{
            required: true,
            message: '请填写交付物名称',
            trigger:'blur'
          }"> 
                        <a-input v-model:value="formState.deliverables[index].deliverable_name" />
                    </a-form-item>
                    <a-form-item :name="['deliverables', index, 'deliverable_doc']"  style="margin-left: 10px; width: 100%" label="交付物模板">
                        <a-upload v-model:file-list="item.deliverable_doc" name="file" action="" @change="handleChange">
                            <a-button>
                                点击上传文件
                            </a-button>
                        </a-upload>
                    </a-form-item>
                    <a-button style=" margin-left: 10%;display: flex;justify-content: center;" danger shape="circle"
                        @click="deleteDeliverable(index)">
                        <svg-icon class="icon" name="delete" />
                    </a-button>
                </div>

                <a-form-item label="交付物">
                    <a-button @click="addDeliverable" type="primary" shape="circle"
                        style="display: flex;justify-content: center;">
                        <svg-icon class="icon" name="add" />
                    </a-button>
                </a-form-item>


            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { reactive, ref, toRaw, computed } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { UnwrapRef } from 'vue';
import type { SelectProps } from 'ant-design-vue';
import TaskDao from '@/daos/task_dao';

const taskDao = new TaskDao();
//接口定义
interface project{
    project_id:number;//项目id
    project_name:string;//项目名称
}


interface Deliverable {
    deliverable_name: string;
    deliverable_doc: any;
}
interface FormState {
    task_name: string;//任务名
    project_id: number;//项目id
    module_id: number,//模块id
    task_description: string;//任务描述
    task_type: string;//任务类型
    deliverables: Deliverable[]//所有交付物对象
}



const labelCol = { style: { width: '90px' } };
//modelVisible用于开关窗口
const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelVisible']);
const visible = computed(() => {
    return ref(props.modelVisible)
});
//项目选择
const project_loading = ref();
const projectOptions = ref<SelectProps['options']>([
])
const projectFocus =()=>{
    project_loading.value = true
     projectOptions.value = ([
    {
        project_id: '1',
        project_name: '项目1',
    },
    {
        project_id: '2',
        project_name: '项目2',
    },
])
project_loading.value = false
}

//表单接收数据
const formRef = ref<FormInstance>();

const formState: UnwrapRef<FormState> = reactive({
    task_name: undefined,
    project_id: undefined,
    module_id: undefined,
    task_description: undefined,
    task_type: undefined,
    deliverables: []
});

const addDeliverable = () => {
    let deliverable = reactive<Deliverable>({ deliverable_name: undefined, deliverable_doc: undefined });
    formState.deliverables.push(deliverable);
};

const deleteDeliverable = (index: number) => {
    formState.deliverables.splice(index, 1);
};


const handleChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
};

const fileList = ref([]);

const headers = {
    authorization: 'authorization-text',
};

const onOk = () => {
    formRef.value
        .validateFields()
        .then(async values => {
            console.log('Received values of form: ', values);
            console.log('formState: ', toRaw(formState));
            emit('update:modelVisible', false);
            let result = await taskDao.createTask(toRaw(formState));
            formRef.value.resetFields();
            console.log('reset formState: ', toRaw(formState));
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        });
};
//表单验证规则
const rules: Record<string, Rule[]> = {
    task_name: [
        { required: true, message: '请输入任务名称', trigger: 'change' },

    ],
    project_id: [
        { required: true, message: '请选择项目', trigger: 'change' },
    ],
    module_id: [
        { required: true, message: '请选择模块', trigger: 'change' },
    ],
    task_type: [{ required: true, message: '请选择任务类型', trigger: 'change' }],

};


</script>
<style scoped></style>