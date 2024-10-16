<template>
    
      
      <a-modal title="调动至"  @cancel="handleModalCancel">
        <p style="color:red">调动后所选学生在之前产生的学习数据会有影响，请慎重操作！
          确认要调动所选学生的小组吗？</p>

          <a-cascader
          v-model:value="value"
          :options="options"
          placeholder="请选择小组"
          change-on-select
          
        />
          


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


  

const handleModalCancel = () => {
  value.value = [];
};
  </script>
  
  