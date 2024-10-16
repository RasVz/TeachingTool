<template>
    <div class="head">
        <a-button @click="back()">
            < 返回</a-button>
                <div style="margin-right: 25px;float: right;">
                    <a-button type="primary" @click="showBatchAchievementScoring()">批量打分</a-button>
                </div>
    </div>
    <div class="body">
        <AllAchievementScoring @updateSelected="updateSelected" :Tasktype="Tasktype" />
    </div>
    <BatchAchievementScoring :modelVisible="isBatchAchievementScoring" :selectedRowKeys="selectedRowKeys"
        @update:modelVisible="(val) => { isBatchAchievementScoring = val }" />
</template>
<script setup lang="ts">

import BatchAchievementScoring from './BatchAchievementScoring.vue';
import { ref } from 'vue';

import AllAchievementScoring from './AllAchievementScoring.vue';
import { useRouter, useRoute } from 'vue-router';

//获取顶部状态栏value值
const selectedRowKeys = ref([]);
const value = ref<string>('');
const isBatchAchievementScoring = ref(false);
const showBatchAchievementScoring = () => {
    isBatchAchievementScoring.value = true;
}
const updateSelected = (newSelectedRowKeys: string[]) => {
    selectedRowKeys.value = newSelectedRowKeys;
}

const router = useRouter()
const route = useRoute()
//获取到的值转为String
const Tasktype = String(route.query.type)

const back = () => {
    router.push({ name: '课程详情-任务管理-任务设置' })
}
</script>
<style scoped>
.head {
    display: flex;
    justify-content: space-between;
    padding: 1.5%;
    margin: 1%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: #fff;
}

.body {
    display: flex;
    flex-direction: column;
    padding: 1.5%;
    margin: 1%;
    height: 83%;
    min-height: 83%;
    max-height: 83%;
    background-color: #fff;
    overflow: auto;
    /* 使容器高度为视口高度 */
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;

}
</style>