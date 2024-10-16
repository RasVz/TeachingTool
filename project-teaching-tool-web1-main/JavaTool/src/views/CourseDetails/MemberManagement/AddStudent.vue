<template>
  <Modal title="添加学生" width="800px"   @cancel="handleModalCancel">
  
    <div style="display: flex;justify-content: space-between;">
    <a-cascader
    v-model:value="value"
    :options="options"
    placeholder="请选择"
    change-on-select
  />

  <a-input-search
      v-model:value="mySearchValue"
      placeholder="输入学生姓名或者学号"
      enter-button
      @search="onSearch"
      
      class="custom-search"
    />
  </div>

<AddStudentTable/>




</Modal>

</template>
<script lang="ts" setup>
import { Modal, type SelectProps } from 'ant-design-vue';
import { ref } from 'vue';
import AddStudentTable from './AddStudentTable.vue';

import type { CascaderProps } from 'ant-design-vue';


//搜索框
const mySearchValue = ref<string>('');

const onSearch = (searchValue: string) => {
  console.log('use value', searchValue);
  
};



//下拉选择框数据
const options: CascaderProps['options'] = [
  {
    value: '计算机工程学院',
    label: '计算机工程学院',
    children: [
      {
        value: '软件工程',
        label: '软件工程',
        children: [
          {
            value: '2022级软件工程一班',
            label: '2022级软件工程一班',
          },
        ],
      },
    ],
  },
  {
    value: '马克思主义学院',
    label: '马克思主义学院',
    children: [
      {
        value: '列宁',
        label: '列宁',
        children: [
          {
            value: '2022级列宁一班',
            label: '2022级列宁一班',
          },
        ],
      },
    ],
  },
];
const value = ref<string[]>([]);


const handleModalCancel = () => {
  value.value = [];
  mySearchValue.value='';
};

</script>

<style scoped>
.custom-search {
  width: 300px; /* 设置搜索框的宽度 */
}
</style>