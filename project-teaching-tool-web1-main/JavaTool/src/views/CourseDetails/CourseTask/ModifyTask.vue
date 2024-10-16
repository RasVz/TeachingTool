<template>
    <div>
        <a-modal v-model:open="visible.value" title="修改任务" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel="formRef.resetFields()
        emit('update:modelVisible', false);" :maskClosable="false">
            <a-form ref="formRef" :model="formState" name="form_in_modal" :rules="rules">
                <a-form-item name="proportion" label="任务占比">
                    <a-input v-model:value="formState.proportion"  type="number" max="100" min="0" style="width: 60px"/>%
                    剩余可分配占比为 98%
                </a-form-item>
                <a-form-item name="endTime" label="截止时间">
                    <a-date-picker v-model:value="formState.endTime" show-time  style="width: 200px"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, computed } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import dayjs from 'dayjs';

interface Values {
    proportion:number;
    endTime:dayjs.Dayjs
}

const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false
    },
    value:{
        type:Object as ()=> Values,
        default:false
    }
})
const visible = computed(() => {
    return ref(props.modelVisible)
});
const emit = defineEmits(['update:modelVisible']);

const formRef = ref<FormInstance>();

const formState = reactive<Values>({
    proportion:props.value.proportion,
    endTime:props.value.endTime
});

const onOk = () => {
    formRef.value
        .validateFields()
        .then(values => {
            console.log('Received values of form: ', values);
            console.log('formState: ', toRaw(formState));
            emit('update:modelVisible', false);
            formRef.value.resetFields();
            console.log('reset formState: ', toRaw(formState));
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        });
};
//表单验证规则
const rules: Record<string, Rule[]> = {
    proportion: [
        { required: true, message: '请输入输入任务占比', trigger: 'blur' },

    ],
    endTime: [
        { required: true, message: '请输入截至日期', trigger: 'blur' },
    ]
};
</script>
<style scoped>
.collection-create-form_last-form-item {
    margin-bottom: 0;
}
</style>