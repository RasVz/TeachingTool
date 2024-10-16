<template>
    <div>

        <a-modal v-model:open="visible.value" title="编辑任务" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel="formRef.resetFields()
        emit('update:modelVisible', false);" :maskClosable="false">
            <a-form ref="formRef" :model="formState" name="form_in_modal" :rules="rules" :label-col="labelCol">
                <a-form-item name="task_name" label="任务名称">
                    <a-input v-model:value="props.task.task_name" />
                </a-form-item>
                <a-form-item name="task_description" label="任务描述">
                    <a-textarea v-model:value="props.task.task_description" />
                </a-form-item>
                <a-form-item name="deliverables" label="交付物名称" v-for="(item, index) in props.task.deliverables"
                    :key="index">
                    <a-input v-model:value="item.deliverable_name" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, computed } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { UnwrapRef } from 'vue';

interface task{
    task_id:number;
    task_name:string;
    task_description:string;
    deliverables:Deliverable[]
}
interface Deliverable {
    deliverable_id:number;
    deliverable_name: string;
}
interface FormState {
    task_name: string;
    task_description: string;
    deliverables: Deliverable[]
}
const labelCol = { style: { width: '90px' } };
//modelVisible用于开关窗口
const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false
    },
    task:{
        type: Object as ()=>task,
        default: false
    }
})

const emit = defineEmits(['update:modelVisible']);

const formRef = ref<FormInstance>();

const visible = computed(() => {
    return ref(props.modelVisible)
});


const formState: UnwrapRef<FormState> = reactive({
    task_name: props.task.task_name,
    task_description: props.task.task_description,
    deliverables: props.task.deliverables
});
    

const onOk = () => {
    formRef.value
        .validateFields()
        .then(values => {
            console.log(values);
            
            emit('update:modelVisible', false);
         
              
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
    deliverables: [
        { required: true, message: '请输入交付物名称', trigger: 'blur' },
    ]
};


</script>
<style scoped></style>