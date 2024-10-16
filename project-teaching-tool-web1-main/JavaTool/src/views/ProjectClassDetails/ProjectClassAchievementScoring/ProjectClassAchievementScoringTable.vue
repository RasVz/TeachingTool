<template>
    <a-table :columns="columns" :data-source="data" class="data-table">

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'fileName'">
                <span class="font-size">
                    {{ record.fileName }}
                </span>
            </template>
            <template v-else-if="column.key === 'creator'">
                <span class="font-size">
                    {{ record.creator }}
                </span>
            </template>
            <template v-else-if="column.key === 'updateTime'">
                <span class="font-size">
                    {{ record.updateTime }}
                </span>
            </template>
            <template v-else-if="column.key === 'size'">
                <span class="font-size">
                    {{ record.size }}
                </span>
            </template>
            <template v-else-if="column.key === 'action'">
                <span class="a-style">
                    <a @click="showAchievementScoring()">评分</a>
                </span>
                <a-divider type="vertical" />
                <span class="a-style">
                    <a>打回</a>
                </span>
            </template>
        </template>

    </a-table>
    <AchievementScoring :isAchievementScoring="isAchievementScoring" @update:isAchievementScoring="(val) => {
        isAchievementScoring = val;
    }
        " />
</template>

<script lang="ts" setup>

import { ref, computed } from 'vue';
import AchievementScoring from './AchievementScoring.vue';
const taskType = ref(false);
const isAchievementScoring = ref(false);

const showAchievementScoring = () => {
    console.log(isAchievementScoring.value);

    isAchievementScoring.value = true;
}
const columns = [
    {
        title: '编号',
        dataIndex: 'id'
    },
    {
        title: '名称',
        dataIndex: 'fileName',
        key: 'fileName',
    },
    {
        title: taskType.value == true ? '提交人' : '提交小组',
        dataIndex: 'creator',
        key: 'creator',
    },
    {
        title: '提交时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
    },

    {
        title: '操作',
        key: 'action',
    },
];

const data = [
    {

        key: '1',
        fileName: '《软件工程导论》',
        creator: '张三',
        updateTime: '2024年8月6日15:36:50',
    },
    {
        key: '2',
        fileName: '《计算机组成原理》',
        creator: '李四',
        updateTime: '2024年8月6日15:37:02',
    },
    {
        key: '3',
        fileName: '《c#》',
        creator: '王五',
        updateTime: '2024年8月6日15:37:16',

    },
];

const selectedCreator = ref('');
const keyword = ref('');

const filteredData = computed(() => {
    return data.filter(record => {
        const matchesCreator = selectedCreator.value ? record.creator.includes(selectedCreator.value) : true;
        const matchesKeyword = keyword.value ? record.fileName.includes(keyword.value) : true;
        return matchesCreator && matchesKeyword;
    });
});
</script>

<style scoped>
/* 表格样式 */
.data-table {
    flex: 1;
    /* 使表格占满剩余空间 */
    margin-top: 10px;
    font-size: 18px;
    border-radius: 8px;

}

.font-size {
    font-size: 18px;
}

.a-style {
    font-size: 18px;
}
</style>