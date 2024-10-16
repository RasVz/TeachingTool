<template>

    <!-- 表格 -->
    <div>
        <a-table :columns="columns" :data-source="data" :bordered="true" :loading="loading" :pagination="false"
            :size="'small'">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'score'">
                    <a-input v-model:value="record.score" :size="'small'" style="width: 30%;" />
                </template>
            </template>
        </a-table>
    </div>
    <!-- <a-pagination v-model:current="current" :total="500" style="text-align: center;bottom: 0%;margin-top: 1% " /> -->
</template>
<script setup lang="ts">

import { reactive, ref } from 'vue';

const current = ref(6);
const columns = [
    {
        title: '所属班级',
        dataIndex: 'classId',
        align: 'center' as 'center',
        className: 'custom-header-style'
    },
    {
        title: '学号',
        dataIndex: 'studentId',
        align: 'center' as 'center',
        className: 'custom-header-style'
    },
    {
        title: '姓名',
        dataIndex: 'studentName',
        align: 'center' as 'center',
        className: 'custom-header-style',
        width: '15%'
    },
    {
        title: '角色',
        dataIndex: 'role',
        align: 'center' as 'center',
        className: 'custom-header-style',
        width: '15%'
    },
    {
        title: '提交时间',
        dataIndex: 'time',
        align: 'center' as 'center',
        className: 'custom-header-style',
        width: '15%'
    },
    {
        title: '个人成绩',
        dataIndex: 'score',
        align: 'center' as 'center',
        className: 'custom-header-style',
        width: '15%'
    }
]
const data = reactive([
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

    }
    ,
    {
        classId: '1班级',
        studentId: '2019003',
        studentName: '王五',
        role: '组员',
        time: '2024-9-2',
        score: '100'
    }
    ,
    {
        classId: '1班级',
        studentId: '2019003',
        studentName: '王五',
        role: '组员',
        time: '2024-9-2',
        score: '100'
    }

])
</script>