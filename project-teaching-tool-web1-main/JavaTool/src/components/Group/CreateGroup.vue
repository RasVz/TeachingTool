<template>
    <div>
        <a-modal v-model:open="visible.value" title="新增小组" ok-text="创建" cancel-text="取消"
         @ok="onOk"
         @cancel="formRef.resetFields()
        emit('update:modelVisible',false);" :maskClosable="false">
        
            <a-form ref="formRef" :model="formState" layout="horizontal" name="form_in_modal" :label-col="labelCol">
                <a-form-item name="group_name" label="小组名称"
                    :rules="[{ required: true, message: 'Please input the title of collection!' }]">
                    <a-input v-model:value="formState.group_name" />
                </a-form-item>
                <a-form-item name="group_class" label="所在项目班">
                    <a-select :options="options" v-model:value="formState.group_class" placeholder="请选择项目班"
                        show-search />
                </a-form-item>
                <a-form-item name="group_members" label="小组成员">
                    <a-select v-model:value="formState.group_members" :options="options" mode="tags" size="large"
                        @change="chang" placeholder="请先选择项目班"></a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw, computed ,watch} from 'vue';
import type { FormInstance } from 'ant-design-vue';

const labelCol = { style: { width: '80px' } };

const props = defineProps({
    modelVisible: {
        type: Boolean,
    }
})

const emit = defineEmits(['update:modelVisible']);

interface Values {
    group_name: string;
    group_class: string;
    group_members: string[];
}
const options = [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }));

const visible = computed(() => {
    return ref(props.modelVisible)
});


const formRef = ref<FormInstance>();

const formState = reactive<Values>({
    group_name: '',
    group_class: '',
    group_members: [],
});

const chang = (value) => {
    console.log(value)
}
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
</script>
<style scoped>
</style>