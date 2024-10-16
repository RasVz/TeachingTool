<template>
    <a-modal v-model:open="visible.value" title="批量评分" ok-text="确认" cancel-text="取消" @ok="onOk()" @cancel="formRef.resetFields()
    emit('update:modelVisible', false);">
        <a-form :model="formState" ref="formRef">
            <a-form-item label="批量评分">
                <a-input v-model:value="formState.score" placeholder="输入分数" style="width: 40%;" />
            </a-form-item>
            <a-form-item label="评语">
                <a-textarea v-model:value="formState.comment" :placeholder="'在此输入评价'" :rows="3" />
            </a-form-item>
        </a-form>
    </a-modal>
    >
</template>
<script setup lang="ts">
import { CascaderProps, FormInstance } from 'ant-design-vue';
import { computed, reactive, ref } from 'vue';

const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false
    },
    selectedRowKeys: {
        type: Array,
        default: []
    }
})
const emit = defineEmits(['update:modelVisible']);
const visible = computed(() => {
    return ref(props.modelVisible)
});
const selectedRowKeys = computed(() => {
    return ref(props.selectedRowKeys)
});
const formRef = ref<FormInstance>();
interface formState {
    score: number;
    comment: string;
}
const formState = reactive<formState>({
    score: 0,
    comment: ''
})

const onOk = () => {
    console.log(selectedRowKeys.value.value);
    console.log(formState);
    emit('update:modelVisible', false);
};



</script>