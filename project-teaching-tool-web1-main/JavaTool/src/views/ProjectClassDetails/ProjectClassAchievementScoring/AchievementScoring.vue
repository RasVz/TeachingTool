<template>
    <div>
        <a-modal v-model:open="visible.value" title="评分界面" ok-text="确认" cancel-text="取消" @ok="onOk()"
            @cancel="emit('update:isAchievementScoring', false);" :maskClosable="false">
            <a-form ref="formRef" :model="formState">
                <a-form-item>
                    <a-input v-model:value="formState.score" placeholder="请输入分数" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>

</template>
<script setup lang="ts">
import { ref, computed } from 'vue';



const props = defineProps({
    isAchievementScoring: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:isAchievementScoring'])

const visible = computed(() => {
    console.log('监听', props.isAchievementScoring);
    return ref(props.isAchievementScoring)
});

interface FormState {
    score: number;
}
const formState = ref<FormState>({
    score: 0
});
</script>