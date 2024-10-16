<template>
    <div>
        <div  class="head">
        <a-radio-group v-model:value="value" button-style="solid">
            <!-- <a-space size="middle">
                <a-radio-button value="">全部</a-radio-button>
                <a-radio-button value="进行中">进行中的课程</a-radio-button>
                <a-radio-button value="未完成">未完成的课程</a-radio-button>
            </a-space> -->

            <div style="margin-right: 25px;float: right;">
                <a-button type="primary" @click="visible1 = true">创建小组</a-button>
            </div>
        </a-radio-group>
    </div>

    <div  class="body">
        <AllGroupTable />
    </div>

    </div>
   
    <CreateCourses :modelVisible="visible1" @update:modelVisible="(val) => { visible1 = val }" />

</template>

<script lang="ts" setup>
import { h, ref, reactive } from 'vue';



import AllGroupTable from './AllGroupTable.vue';

//创建任务窗口状态
const visible1 = ref<boolean>(false);


//顶部任务状态选取值
const value = ref<string>('');

</script>

<style scoped>
.head {
    display: flex;
    flex-direction: column;
    padding: 1.5%;
    margin: 1%;
    height: auto;
    /* 使容器高度为视口高度 */
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: #fff;
    overflow: auto;
}

.body {
    display: flex;
    flex-direction: column;
    padding: 1.5%;
    margin: 1%;
    height: 83%;
    min-height: 83%;
    max-height: 83%;
    /* 使容器高度为视口高度 */
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: #fff;
    overflow: auto;
}
</style>
