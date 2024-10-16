<template>
    
      
    <a-modal title="随机分组"  @cancel="handleModalCancel">
        <p>勾选的学生数量: {{ selectedCount }}</p>
        <a-input v-model:value="TeamNum" placeholder="输入要分成的小组数" />
    </a-modal>
  
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
const options: CascaderProps['options'] = [
  {
    value: '小组2',
    label: '小组2',
    
  },
  {
    value: '小组3',
    label: '小组3',
    
    
  },
];
const value = ref<string[]>([]);
const TeamNum = ref(null);

const props = defineProps({
 
  selectedCount: Number
});

const handleModalCancel = () => {
value.value = [];
};
</script>

