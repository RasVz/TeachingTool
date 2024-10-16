<template>
    <a-layout style="margin-top: 20px;">
  
     
      <a-layout-content :style="contentStyle">
  
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="data"  :pagination="{
          total: 150,
          position: ['bottomCenter']
        }"
          :scroll="{ y: '46vh' }">
        </a-table>
      </a-layout-content>
    </a-layout>
  
  </template>
  <script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { Table } from 'ant-design-vue';
  import type { CSSProperties } from 'vue';
  import {  reactive } from 'vue';
  import type { FormInstance } from 'ant-design-vue';
  
  



  // 表单对应数据接口
  interface FormState {
    key: string | number;
    StudentId: number;
    StudentName: string;
    StudentMajor: string;
    School: string;
    Class: string,
  }
  
  // 表单对应数据ClassName
  const formState = reactive<FormState>({
    key: null,
    StudentId: null,
    StudentName: '',
    StudentMajor: '',
    School: '',
    Class:'',
  });
  
  // 表单Ref
  const formRef = ref<FormInstance>();
  
  const columns = [
  
    {
      title: '姓名',
      dataIndex: 'StudentName',
    },
    {
      title: '学号/工号',
      dataIndex: 'StudentId',
    },
    {
      title: '学院',
      dataIndex: 'School',
    },
    {
      title: '专业',
      dataIndex: 'StudentMajor',
    },
    {
      title: '班级',
      dataIndex: 'Class',
    },
   
  ];
  
  const data: FormState[] = [];
  for (let i = 0; i < 150; i++) {
    data.push({
      key: i,
      StudentName: `Edward King ${i}`,
      StudentId: 32,
      StudentMajor: 'er',
      School: '计算机工程学院',
      Class:'2022级软件工程一班',
    });
  }
  
  const selectedRowKeys = ref<FormState['key'][]>([]); // 配置默认列
  
  const onSelectChange = (changableRowKeys: string[]) => {
    console.log('selectedRowKeys changed: ', changableRowKeys);
    selectedRowKeys.value = changableRowKeys;
  };
  
  const rowSelection = computed(() => {
    return {
      selectedRowKeys: unref(selectedRowKeys),
      onChange: onSelectChange,
      hideDefaultSelections: true,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
  
      ],
    };
  });
  
  // 提交筛选内容
  const onSubmit = () => {
    console.log(formState);
  };
  
  // 清空筛选框内容
  const resetForm = () => {
    formRef.value.resetFields();
  };
  
  const contentStyle: CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'white',
  };
  </script>
  
  
  <style scoped>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
  
  a {
  
    color: #61666d;
  }
  
  a:hover {
    color: #00aeec;
  }
  </style>