<template>
  <!-- 表格 -->
  <div class="group-member-container">
    <a-table
      :columns="columns"
      :data-source="data"
      :bordered="true"
      :pagination="false"
      :size="'small'"
      :scroll="{ y: '15vh' }"
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue';

// 列定义
const columns = [
  { title: '所属班级', dataIndex: 'classId', align: 'center' },
  { title: '学号', dataIndex: 'studentId', align: 'center' },
  { title: '姓名', dataIndex: 'studentName', align: 'center', width: '15%' },
  {
    title: '角色',
    dataIndex: 'role',
    align: 'center',
    width: '15%',
    customRender: ({ text }) => {
      const isLeader = text === '组长';
      return h(
        'span',
        {
          style: { color: isLeader ? 'green' : 'inherit', fontWeight: isLeader ? 'bold' : 'normal' }
        },
        text
      );
    }
  },
  { title: '提交时间', dataIndex: 'time', align: 'center', width: '15%' },
  {
    title: '个人成绩',
    dataIndex: 'score',
    align: 'center',
    width: '15%',
    customRender: ({ text }) => h('span', { style: { color: 'red' } }, text)
  }
];

// 数据
const data = [
  {
    classId: '1班级',
    studentId: '2019001',
    studentName: '张三',
    role: '组长',
    time: '2024-9-2',
    score: '100'
  },
  {
    classId: '1班级',
    studentId: '2019002',
    studentName: '李四',
    role: '组员',
    time: '2024-9-2',
    score: '100'
  },
  {
    classId: '1班级',
    studentId: '2019003',
    studentName: '王五',
    role: '组员',
    time: '2024-9-2',
    score: '100'
  },
  {
    classId: '1班级',
    studentId: '2019004',
    studentName: '赵六',
    role: '组员',
    time: '2024-9-3',
    score: '95'
  },
  {
    classId: '1班级',
    studentId: '2019005',
    studentName: '钱七',
    role: '组员',
    time: '2024-9-4',
    score: '85'
  }
];
</script>

<style scoped>
.group-member-container {
  padding: 1.5%;
  margin: 1%;
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
}

.custom-table {
  width: 100%;
}

.custom-header-style {
  text-align: center;
}
</style>
