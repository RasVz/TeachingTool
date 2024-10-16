<template>
    <div>
        <a-modal v-model:open="visible.value" title="提交任务" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel="formRef.resetFields()
        emit('update:modelVisible', false);" :maskClosable="false">
            <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
                <a-form-item name="description" label="任务描述">
                    <a-textarea v-model:value="formState.description" />
                </a-form-item>
                <a-upload v-model:file-list="fileList" name="file"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers" @change="handleChange">
                    <a-button>
                        <upload-outlined></upload-outlined>
                        点击上传文件
                    </a-button>
                </a-upload>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import { reactive, ref, toRaw, watch, computed } from 'vue';
import type { FormInstance } from 'ant-design-vue';

interface Values {
    description: string;
}

const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelVisible']);

const formRef = ref<FormInstance>();

const visible = computed(() => {
    return ref(props.modelVisible)
});


const formState = reactive<Values>({
    description: '',
});

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
.collection-create-form_last-form-item {
    margin-bottom: 0;
}
</style>